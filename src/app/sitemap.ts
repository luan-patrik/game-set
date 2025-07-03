import prisma from '@/lib/db'
import { getAllFileSetting } from '@/lib/getAllFileSetting'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const users = await prisma.user.findMany({
    select: { id: true, name: true },
    where: { name: { not: null } },
  })

  const settings = await getAllFileSetting()

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string

  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_BASE_URL is not defined')
  }

  const staticUrls = [{ url: baseUrl, lastModified: new Date(), priority: 1 }]

  const uploadUrl = settings.map(() => ({
    url: `${baseUrl}/adicionar`,
    lastModified: new Date(),
    priority: 0.8,
  }))

  const userUrls = users.map((user) => ({
    url: `${baseUrl}/perfil/${encodeURIComponent(user.name as string)}/${user.id}`,
    lastModified: new Date(),
    priority: 0.8,
  }))

  return [...staticUrls, ...uploadUrl, ...userUrls]
}
