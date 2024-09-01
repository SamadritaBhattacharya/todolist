import { Clock, Pause, Play, RotateCcw } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

const StopWatch = ({ startTime, elapsedTime, onUpdate }) => {
  const [time, setTime] = useState(elapsedTime || 0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [running]);

  useEffect(() => {
    setTime(elapsedTime || 0);
  }, [elapsedTime]);

  const handleStartPause = () => {
    setRunning(!running);
    if (!running) {
      // Save the start time when the stopwatch starts
      onUpdate({ startTime: new Date().toISOString() });
    } else {
      // Save the elapsed time when the stopwatch is paused
      onUpdate({ elapsedTime: time });
    }
  };

  const handleReset = () => {
    setRunning(false);
    setTime(0);
    // Save the state when the stopwatch is reset
    onUpdate({ elapsedTime: 0, startTime: null, pausedTime: null });
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className='text-black  w-[92%]  mx-auto flex text-wrap '>
      {/* <p className=' flex gap-2'><Clock /> {formatTime(time)}</p> */}
      <div className=' flex'>
      <button onClick={handleStartPause} className=" bg-green-700 p-2 opacity-80 rounded-full text-white ">
        {running ? <Pause className=' h-5 w-5' /> : <Play className=' h-5 w-5' />}
      </button>
      <button onClick={handleReset} className="ml-2 px-[8px] py-[1px] text-red-500 rounded">
        <RotateCcw className=' h-8 w-8' />
      </button>
      </div>
      <div className=' px-2'>
      <p className=' flex gap-1 text-lg items-center text-wrap mx-auto'><Clock className=' h-6 w-6 text-orange-700' /> {formatTime(time)}</p></div>
    </div>
  );
};

export default StopWatch;
