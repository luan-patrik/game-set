import DetailSettings from '@/components/DetailSettings'

export default function SettingsPage({
  params,
}: {
  params: { name: string; id: string }
}) {
  const { name, id } = params

  return <DetailSettings name={name} id={id} />
}
