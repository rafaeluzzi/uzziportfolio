import { useEffect, useState } from 'react';
import { Music } from 'lucide-react';
import GlassCard from './GlassCard';

interface SpotifyTrack {
  name: string;
  artist: string;
  url: string;
  embedUrl: string;
}

export function NowPlaying() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [lastTrackId, setLastTrackId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [playTitle, setPlayTitle] = useState<string>("I'm now playing");

  useEffect(() => {
    async function fetchNowPlaying() {
      try {
        const lastFmRes = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=rafincruz&api_key=d4308d50b878612068da3cccf7bd9a71&format=json&limit=1`
        );
        if (lastFmRes.status === 429) {
          console.warn('Last.fm rate limit hit, retrying in 1s');
          setTimeout(fetchNowPlaying, 1000);
          return;
        }
        const lastFmData = await lastFmRes.json();
        const recentTrack = lastFmData.recenttracks?.track?.[0];

        // Set playTitle based on nowplaying status
        setPlayTitle(
          recentTrack && recentTrack['@attr']?.nowplaying === 'true'
            ? "I'm now playing"
            : "Last played song"
        );

        // Exit if no valid track
        if (!recentTrack || !recentTrack.name || !recentTrack.artist?.['#text']) {
          setIsLoading(false);
          return;
        }

        // Create unique track ID for comparison
        const trackId = `${recentTrack.name}-${recentTrack.artist['#text']}`;
        if (trackId === lastTrackId) return; // Fixed typo: lastndashId -> lastTrackId

        // Track changed, start loading animation
        setIsLoading(true);

        // Fetch from Spotify
        const trackName = recentTrack.name;
        const artistName = recentTrack.artist['#text'];
        const query = `${trackName} ${artistName}`;

        const spotifyRes = await fetch(
          `/.netlify/functions/spotify?q=${encodeURIComponent(query)}`
        );

        if (spotifyRes.ok) {
          const data = await spotifyRes.json();
          // Ensure loading animation shows for at least 3 seconds
          setTimeout(() => {
            setTrack(data);
            setLastTrackId(trackId);
            setIsLoading(false);
          }, 3000);
        } else {
          console.error('Spotify API error:', spotifyRes.status);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching now playing:', error);
        setIsLoading(false);
      }
    }

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 15000); // Poll every 15s
    return () => clearInterval(interval);
  }, [lastTrackId]);

  return (
    <GlassCard
      icon={Music}
      className="col-span-8 row-span-2"
      label={playTitle}
    >
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '152px',
            background: 'radial-gradient(circle, #A855F7, #4F46E5)',
            borderRadius: '12px',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        >
          <style>
            {`
              @keyframes pulse {
                0% { transform: scale(0.8); opacity: 0.7; }
                50% { transform: scale(1); opacity: 1; }
                100% { transform: scale(0.8); opacity: 0.7; }
              }
            `}
          </style>
        </div>
      ) : track ? (
        <iframe
          style={{ borderRadius: '12px' }}
          src={`${track.embedUrl}?utm_source=generator&theme=0`}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      ) : (
        <div className="text-light-300 text-center">No track playing</div>
      )}
    </GlassCard>
  );
}