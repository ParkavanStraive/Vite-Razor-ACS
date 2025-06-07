import { useCallback, useEffect, useRef, useState } from "react";

export const useTimer = (initialSeconds: number) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);
  const [isActive, setIsActive] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    if (secondsLeft > 0) {
      setIsActive(true);
    }
  }, [secondsLeft]);

  const pause = useCallback(() => {
    setIsActive(false);
  }, []);

  const reset = useCallback(() => {
    setIsActive(false);
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            setIsActive(false);
            return 0;
          }
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
    setIsActive(false);
  }, [initialSeconds]);

  return { secondsLeft, isActive, start, pause, reset };
};
