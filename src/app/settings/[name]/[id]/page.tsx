import { DetailSettings } from '@/components/DetailSettings'

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ name: string; id: string }>
}) {
  const { name, id } = await params

  return <DetailSettings name={name} id={id} />
}
