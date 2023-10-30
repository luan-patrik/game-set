import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetPostSettings = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const { data } = await axios.get('/api/settings/userGetSettings/')
      return data
    },
  })
}
