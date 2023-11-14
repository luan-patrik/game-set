import { auth } from '@/lib/auth'
import { initEdgeStore } from '@edgestore/server'
import {
  CreateContextOptions,
  createEdgeStoreNextHandler,
} from '@edgestore/server/adapters/next/app'
import { redirect } from 'next/navigation'
import { z } from 'zod'

type Context = {
  userId: string
}

async function createContext({ req }: CreateContextOptions) {
  const session = await auth()

  if (!session) return redirect('/sign-in')

  return {
    userId: session.user.id,
  }
}

const es = initEdgeStore.context<Context>().create()
const edgeStoreRouter = es.router({
  publicFiles: es
    .fileBucket({
      maxSize: 1024 * 128, // 128KB,
    })
    .input(
      z.object({
        type: z.enum(['post']),
      }),
    )
    .path(({ ctx, input }) => [{ owner: ctx.userId, type: input.type }]),
})
const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  createContext,
})
export { handler as GET, handler as POST }
export type EdgeStoreRouter = typeof edgeStoreRouter
