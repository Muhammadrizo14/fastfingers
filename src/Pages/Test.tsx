import React, { useState, useRef } from 'react';

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef<any>();

    const startStop = () => {
        console.log(time);

        if (isRunning) {
            clearInterval(timerRef.current);
        } else {
            timerRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 10); // Update every 10 milliseconds
            }, 10);
        }
        setIsRunning(!isRunning);
    };

    const reset = () => {
        clearInterval(timerRef.current);
        setTime(0);
        setIsRunning(false);
    };

    const formatTime = (milliseconds: any) => {
        const hours = Math.floor(milliseconds / (60 * 60 * 1000));
        const minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);
        const ms = milliseconds % 1000;

        const pad = (value: any) => (value < 10 ? `0${value}` : value);

        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(ms)}`;
    };

    return (
        <div>
            <div>
                <strong>Elapsed Time:</strong> {formatTime(time)}
            </div>
            <button onClick={startStop}>{isRunning ? 'Pause' : 'Start'}</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
};

export default Stopwatch;