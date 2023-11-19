import { initEdgeStore } from '@edgestore/server'
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app'
import { z } from 'zod'
import prisma from '@/lib/db'
import { auth } from '@/lib/auth'
type Context = {
  userId: string | undefined
}

async function createContext(): Promise<Context> {
  const session = await auth()

  return {
    userId: session?.user.id,
  }
}

function createMetadata(ctx: Context, input: { type: string }) {
  return {
    userId: ctx.userId,
    type: input.type,
  }
}

const es = initEdgeStore.context<Context>().create()
const edgeStoreRouter = es.router({
  publicFiles: es
    .fileBucket({
      maxSize: 1024 * 128, // 128KB
    })
    .beforeUpload(async () => {
      const session = await auth()

      if (!session) throw new Error('Faça login para fazer upload')

      const fileCount = await prisma.fileSettings.count({
        where: {
          authorId: session.user.id,
        },
      })

      if (fileCount >= 12) throw new Error('Max uploads exceeded')

      return true
    })
    .beforeDelete(async () => {
      const session = await auth()

      if (!session) throw new Error('Faça login para deletar')

      return true
    })
    .input(
      z.object({
        type: z.enum(['post']),
      }),
    )
    .path(({ ctx, input }) => [{ owner: ctx.userId, type: input.type }])
    .metadata(({ ctx, input }) => createMetadata(ctx, input)),
})
const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  createContext,
})
export { handler as GET, handler as POST }
export type EdgeStoreRouter = typeof edgeStoreRouter
