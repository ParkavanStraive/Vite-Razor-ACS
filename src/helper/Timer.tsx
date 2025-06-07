import React, { useEffect } from "react";
import { useTimer } from "@/hooks/useTimer";
import { cn } from "@/lib/utils";
import { AlarmClockPlus } from "lucide-react";

interface TimerProps {
  initialSeconds: number;
}

export const Timer: React.FC<TimerProps> = ({ initialSeconds }) => {
  const { secondsLeft, start } = useTimer(initialSeconds);

  const isLessThan10 = secondsLeft < 30;

  useEffect(() => {
    if (initialSeconds > 0) {
      start();
    }
  }, [initialSeconds, start]);

  const formatTime = (totalSeconds: number): string => {
    if (totalSeconds < 0) totalSeconds = 0;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num: number): string => num.toString().padStart(2, "0");

    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  const isFinished = secondsLeft === 0;

  return (
    <div className="text-center p-4">
      <div
        className={cn(
          `flex items-center justify-center gap-1 transition-all duration-300`,
          isLessThan10 ? "animate-caret-blink text-red-500" : ""
        )}
      >
        {/* <AlarmClockPlus /> */}
        {formatTime(secondsLeft)}
      </div>
    </div>
  );
};
