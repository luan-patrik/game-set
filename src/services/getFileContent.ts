'use server'

export const getFileContent = async (
  url: string,
): Promise<string | object | null> => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      cache: 'force-cache',
      next: {
        tags: ['file-content', url],
      },
    })

    if (!res.ok) throw new Error('Erro ao carregar o conteúdo.')
    const text = await res.text()

    try {
      return JSON.parse(text)
    } catch {
      return text
    }
  } catch (err) {
    return `Erro: ${(err as Error).message}`
  }
}
