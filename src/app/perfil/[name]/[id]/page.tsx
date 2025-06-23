import NotFound from '@/app/not-found'
import { CardGameSetting } from '@/components/CardGameSetting'
import { auth } from '@/lib/auth'
import { getUserSettingsList } from '@/services/getUserSettingsList'
import { redirect } from 'next/navigation'

export default async function UserPage({
  params,
}: {
  params: Promise<{ name: string; id: string }>
}) {
  const session = await auth()
  const { name, id } = await params
  const decodedName = decodeURIComponent(name)

  if (session?.user.id === id && session.user.name === decodedName) {
    redirect('/minhas-configuracoes')
  }

  const userSettings = await getUserSettingsList(decodedName, id)

  if (!userSettings || userSettings.filesettings.length < 1) return NotFound()

  return (
    <div className='mt-4 space-y-4'>
      <h1 className='text-3xl font-semibold'>{userSettings?.name}</h1>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {userSettings.filesettings.map((setting) => (
          <CardGameSetting
            key={setting.id}
            {...setting}
            author={userSettings}
            isOwnerPage
          />
        ))}
      </div>
    </div>
  )
}
