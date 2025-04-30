// components/NowPlaying.tsx
import { useEffect, useState } from 'react'

interface SpotifyTrack {
  name: string
  artist: string
  url: string
  embedUrl: string
}

export function NowPlaying() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null)

  useEffect(() => {
    async function fetchNowPlaying() {
      const lastFmRes = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=rafincruz&api_key=d4308d50b878612068da3cccf7bd9a71&format=json&limit=1`
      )
      const lastFmData = await lastFmRes.json()
      const recentTrack = lastFmData.recenttracks.track?.[0]
      if (!recentTrack) return

      const trackName = recentTrack.name
      const artistName = recentTrack.artist['#text']
      const query = `${trackName} ${artistName}`

      const spotifyRes = await fetch(
        `/.netlify/functions/spotify?q=${encodeURIComponent(query)}`
      )

      if (spotifyRes.ok) {
        const data = await spotifyRes.json()
        setTrack(data)
      }
    }

    fetchNowPlaying()
  }, [])

  if (!track) return null

  return (
    <div className="w-full">
      <iframe
        style={{ borderRadius: '12px' }}
        src={track.embedUrl}
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  )
}

