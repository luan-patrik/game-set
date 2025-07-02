'use server'

interface TwitchTokenResponse {
  access_token: string
  expires_in: number
  token_type: string
}

let accessToken: string | null = null
let tokenExpiresAt: number = 0
const TOKEN_BUFFER_TIME = 5 * 60 * 1000

const refreshToken = async (): Promise<string> => {
  try {
    const response = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: process.env.TWITCH_CLIENT_ID as string,
        client_secret: process.env.TWITCH_CLIENT_SECRET as string,
        grant_type: 'client_credentials',
      }),
    })

    if (!response.ok) {
      throw new Error(`Falha ao obter token: ${response.status}`)
    }

    const data = (await response.json()) as TwitchTokenResponse

    accessToken = data.access_token
    tokenExpiresAt = Date.now() + data.expires_in * 1000

    return accessToken
  } catch (error) {
    console.error('Erro ao obter token Twitch:', error)
    throw new Error('Falha na autenticação com Twitch')
  }
}

export const getAccessToken = async (): Promise<string> => {
  if (accessToken && Date.now() < tokenExpiresAt - TOKEN_BUFFER_TIME) {
    return accessToken
  }

  return refreshToken()
}
