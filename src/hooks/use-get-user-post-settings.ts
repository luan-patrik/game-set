import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetUserPostSettings = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await axios.get('/api/settings/user/')
      return data
    },
  })
}
