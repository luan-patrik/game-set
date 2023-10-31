import DetailSettings from '@/components/DetailSettings'
import { useGetDetailSettings } from '@/hooks/use-get-detail-post-settings'

export default function SettingsPage({
  params,
}: {
  params: { name: string; id: string }
}) {
  const { name, id } = params

  return <DetailSettings name={name} id={id} />
}
