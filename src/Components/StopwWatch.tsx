import React, { useState, useEffect, useRef } from 'react';

interface IProp {
  start: boolean;
  setPlayedTime: (time: number) => void; // Updated the return type to void
}

const Time: React.FC<IProp> = ({ start, setPlayedTime }) => {
  const [time, setTime] = useState(0);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!start) {
      if (timeout.current) {
        clearInterval(timeout.current); // Cleanup interval
        timeout.current = null;
        setPlayedTime(time); // Update played time
        setTime(0);
      }
      return;
    }

    timeout.current = setInterval(() => {
      setTime(prevTime => {
        setPlayedTime(prevTime + 1); // Pass previous state to updater function
        return prevTime + 1; // Update local state
      });
    }, 1000);

    return () => {
      if (timeout.current) clearInterval(timeout.current); // Cleanup interval on unmount
    };
  }, [start, setPlayedTime]);
  return (
    <div>
      {time ? <p style={{color: `var(--text-color)`}}>{time}</p> : null}
    </div>
  )
}

export default Time
