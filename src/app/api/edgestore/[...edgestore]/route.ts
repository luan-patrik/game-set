import { auth } from '@/lib/auth'
import { initEdgeStore } from '@edgestore/server'
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app'
import { z } from 'zod'
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
    .beforeUpload(({ ctx }) => {
      if (ctx.userId) {
        return true
      }
      return false
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
