import { useRef, useCallback } from "react";

const useDebounce = (cb: () => void, ms: number): (() => void) => {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const dispatchDebounce = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(cb, ms);
  }, [cb, ms]);

  return dispatchDebounce;
};

export default useDebounce;
