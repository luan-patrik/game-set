import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetDetailSettings = (name: string, id: string) => {
  return useQuery({
    queryKey: ['detail', name, id],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/settings/detail?name=${name}&id=${id}`,
      )
      return data
    },
  })
}
