// Stopwatch.tsx

import React, { useState, useRef } from 'react';

const Stopwatch: React.FC = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const intervalRef = useRef<number | null | any>(null);

    const startStopwatch = () => {
        console.log(elapsedTime);

        if (!isRunning) {
            const startTime = Date.now() - elapsedTime;
            intervalRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 10);
        } else {
            clearInterval(intervalRef.current!);
        }
        setIsRunning(!isRunning);
    };

    const resetStopwatch = () => {
        clearInterval(intervalRef.current!);
        setIsRunning(false);
        setElapsedTime(0);
    };

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60000);
        const seconds = ((time % 60000) / 1000).toFixed(2);
        return `${minutes}:${(+seconds < 10 ? '0' : '')}${seconds}`;
    };

    return (
        <div>
            <div>{formatTime(elapsedTime)}</div>
            <button onClick={startStopwatch}>{isRunning ? 'Pause' : 'Start'}</button>
            <button onClick={resetStopwatch}>Reset</button>
        </div>
    );
};

export default Stopwatch;
