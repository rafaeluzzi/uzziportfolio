import type { Handler } from '@netlify/functions'

const clientId = process.env.VITE_SPOTIFY_CLIENT_ID
const clientSecret = process.env.VITE_SPOTIFY_CLIENT_SECRET

if (!clientId || !clientSecret) {
  throw new Error('Missing required Spotify credentials')
}

let accessToken: string | null = null
let tokenExpiry = 0

async function getAccessToken() {
  const now = Date.now()
  if (accessToken && now < tokenExpiry) return accessToken

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    })

    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.statusText}`)
    }

    const data = await response.json()
    accessToken = data.access_token
    tokenExpiry = now + (data.expires_in * 1000)
    return accessToken
  } catch (error) {
    console.error('Error getting Spotify access token:', error)
    throw new Error('Failed to authenticate with Spotify')
  }
}

export const handler: Handler = async (event) => {
  try {
    const { queryStringParameters } = event
    const q = queryStringParameters?.q?.trim()

    if (!q) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing search query' }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    }

    const token = await getAccessToken()

    const searchRes = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!searchRes.ok) {
      throw new Error(`Spotify API error: ${searchRes.statusText}`)
    }

    const searchData = await searchRes.json()
    const track = searchData.tracks?.items?.[0]

    if (!track) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Track not found' }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        name: track.name,
        artist: track.artists.map((a: { name: string }) => a.name).join(', '),
        url: track.external_urls.spotify,
        embedUrl: `https://open.spotify.com/embed/track/${track.id}`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  } catch (error) {
    console.error('Error in Spotify search function:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  }
}