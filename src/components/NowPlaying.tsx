import { useEffect, useState, useRef } from 'react';
import { Music } from 'lucide-react';
import { motion } from 'framer-motion';
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
  const [progress, setProgress] = useState(0);
  const [playTitle, setPlayTitle] = useState<string>("I'm Now Playing");
  const [iframeWidth, setIframeWidth] = useState(200);
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parentRef.current) return;
    const handleResize = () => {
      if (parentRef.current) {
        setIframeWidth(Math.max(224, parentRef.current.offsetWidth));
      }
    };
    handleResize(); // set initial width

    const resizeObserver = new window.ResizeObserver(handleResize);
    resizeObserver.observe(parentRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

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

        setPlayTitle(
          recentTrack && recentTrack['@attr']?.nowplaying === 'true'
            ? "I'm Now Playing"
            : "Last Played Track"
        );

        if (!recentTrack || !recentTrack.name || !recentTrack.artist?.['#text']) {
          setIsLoading(false);
          return;
        }

        const trackId = `${recentTrack.name}-${recentTrack.artist['#text']}`;
        if (trackId === lastTrackId) return;

        setIsLoading(true);
        setProgress(0);

        const trackName = recentTrack.name;
        const artistName = recentTrack.artist['#text'];
        const query = `${trackName} ${artistName}`;

        const spotifyRes = await fetch(
          `/.netlify/functions/spotify?q=${encodeURIComponent(query)}`
        );

        if (spotifyRes.ok) {
          const data = await spotifyRes.json();
          const interval = setInterval(() => {
            setProgress((prev) => {
              const newProgress = prev + Math.random() * 15;
              if (newProgress >= 100) {
                clearInterval(interval);
                setTrack(data);
                setLastTrackId(trackId);
                setIsLoading(false);
              }
              return newProgress > 100 ? 100 : newProgress;
            });
          }, 200);
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
    const interval = setInterval(fetchNowPlaying, 15000);
    return () => clearInterval(interval);
  }, [lastTrackId]);

  return (
    <GlassCard
      icon={Music}
      className="col-span-8 row-span-2"
      label={playTitle}
    >
      <div ref={parentRef} style={{ width: '100%' }}>
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '152px',
            }}
          >
            <motion.div
              className="w-64 h-1 bg-dark-100 rounded-full overflow-hidden mb-4"
              initial={{ width: 0 }}
              animate={{ width: 256 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>
            <div className="text-sm text-light-300 font-mono">
              {progress < 100 ? 'Track updating...' : 'Track updated!'}
            </div>
          </div>
        ) : track ? (
          <iframe
            style={{ borderRadius: '12px' }}
            src={`${track.embedUrl}?utm_source=generator&theme=0`}
            width={iframeWidth}
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        ) : (
          <div className="text-light-300 text-center">No track playing</div>
        )}
      </div>
    </GlassCard>
  );
}