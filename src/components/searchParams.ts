import { useSearchParams } from "next/navigation"

export const searchParams = () => {
  const searchParams = useSearchParams()

  const search = searchParams.get("search") 
  const category = searchParams.get("category") 
}
