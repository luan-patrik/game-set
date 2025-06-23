import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useCallback } from 'react'

const useFormatDate = (locale = ptBR) => {
  const formatDate = useCallback(
    (date: string | number | Date, dateFormat = 'HH:mm dd/MM/yyyy') => {
      if (!date) return ''
      return format(date, dateFormat, { locale })
    },
    [locale],
  )

  return { formatDate }
}

export default useFormatDate
