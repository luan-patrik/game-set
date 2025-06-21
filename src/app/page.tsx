import { CardGameSetting } from '@/components/CardGameSetting'
import { getSettingsList } from '@/services/getSettingsList'

export default async function Home() {
  const data = await getSettingsList()

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {data.map((setting) => (
        <CardGameSetting key={setting.id} {...setting} />
      ))}
    </div>
  )
}
