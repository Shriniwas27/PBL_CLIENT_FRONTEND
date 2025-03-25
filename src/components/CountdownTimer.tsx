
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  duration: number; // in seconds
  onComplete: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  duration, 
  onComplete 
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) {
      setIsActive(false);
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isActive, onComplete]);

  // Format time as MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progressPercentage = (timeLeft / duration) * 100;

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 mb-2">
        <Clock className="h-5 w-5 text-primary" />
        <span className="font-semibold">Time Remaining</span>
      </div>
      
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${timeLeft < 30 ? 'bg-red-500' : 'bg-primary'} transition-all`}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className={`mt-3 text-2xl font-mono font-bold ${timeLeft < 30 ? 'text-red-500 animate-pulse' : 'text-primary'}`}>
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default CountdownTimer;
