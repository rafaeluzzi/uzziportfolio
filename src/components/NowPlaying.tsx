import { useEffect, useState } from 'react';

interface SpotifyTrack {
  name: string;
  artist: string;
  url: string;
  embedUrl: string;
}

export function NowPlaying() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [lastTrackId, setLastTrackId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNowPlaying() {
      try {
        const lastFmRes = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=rafincruz&api_key=d4308d50b878612068da3cccf7bd9a71&format=json&limit=1`
        );
        if (lastFmRes.status === 429) {
          console.warn('Last.fm rate limit hit, retrying in 1s');
          setTimeout(fetchNowPlaying, 1000); // Backoff for Last.fm
          return;
        }
        const lastFmData = await lastFmRes.json();
        const recentTrack = lastFmData.recenttracks?.track?.[0];
        if (!recentTrack || recentTrack['@attr']?.nowplaying !== 'true') return;

        // Create unique track ID for comparison
        const trackId = `${recentTrack.name}-${recentTrack.artist['#text']}`;
        if (trackId === lastTrackId) return; // Skip if track hasn't changed

        // Track changed, fetch from Spotify
        const trackName = recentTrack.name;
        const artistName = recentTrack.artist['#text'];
        const query = `${trackName} ${artistName}`;

        const spotifyRes = await fetch(
          `/.netlify/functions/spotify?q=${encodeURIComponent(query)}`
        );

        if (spotifyRes.ok) {
          const data = await spotifyRes.json();
          setTrack(data);
          setLastTrackId(trackId); // Update cached track ID
        } else {
          console.error('Spotify API error:', spotifyRes.status);
        }
      } catch (error) {
        console.error('Error fetching now playing:', error);
      }
    }

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 15000); // Poll every 15s
    return () => clearInterval(interval);
  }, [lastTrackId]);

  if (!track) return null;

  return (
    <div className="w-full" style={{ backgroundColor: '#800080', padding: '10px', borderRadius: '12px' }}>
      <iframe
        style={{ borderRadius: '12px' }}
        src={`${track.embedUrl}?utm_source=generator&theme=0`}
        width="100%"
        height="152"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
}