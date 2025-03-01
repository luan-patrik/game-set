import {DetailSettings} from '@/components/DetailSettings'

interface SettingsPageProps {
  params: {
    name: string
    id: string
  }
}

export default function SettingsPage({ params }: SettingsPageProps) {
  const { name, id } = params

  return <DetailSettings name={name} id={id} />
}
