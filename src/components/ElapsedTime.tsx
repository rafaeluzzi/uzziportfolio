import React, { useEffect, useState } from 'react';
import { differenceInYears, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

const ElapsedTime: React.FC = () => {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const isSlimMobile = window.matchMedia('(max-width: 429px)').matches;
  const startDate = new Date('2009-01-05T09:00:00');
  const [elapsedTime, setElapsedTime] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateElapsedTime = () => {
      const now = new Date();
      const years = differenceInYears(now, startDate);
      const days = differenceInDays(now, startDate) % 365;
      const hours = differenceInHours(now, startDate) % 24;
      const minutes = differenceInMinutes(now, startDate) % 60;
      const seconds = differenceInSeconds(now, startDate) % 60;

      setElapsedTime({ years, days, hours, minutes, seconds });
    };

    updateElapsedTime(); // Initial calculation
    const interval = setInterval(updateElapsedTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <span className="text-4xl font-bold text-gradient">
        {elapsedTime.years}
      </span>
      <span className="text-sm text-light-300">Years</span>
      {!isMobile && <div className="text-center">
        <span className="text-sm text-light-300">
          {elapsedTime.days}d {elapsedTime.hours}h {elapsedTime.minutes}m {elapsedTime.seconds}s
        </span>
      </div>}
      <div className="text-center mt-2">
      <span className="text-sm text-light-300">{isSlimMobile?'Building Epic Apps':'Building Epic Internet Apps'}</span>
        </div>
    </div>
  );
};

export default ElapsedTime;