import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { allPostSettings } from '@/types/settings/allPostSettings'

export const useGetAllPostSettings = () => {
  return useQuery({
    queryKey: ['all'],
    queryFn: async () => {
      const { data } = await axios.get('/api/settings/all')
      return data as allPostSettings[]
    },
  })
}
