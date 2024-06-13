import React, {
  useCallback,
  useEffect, useRef, useState,
} from 'react';
import { useRecoilState } from 'recoil';
import { siteNavigationState } from '../../utils/State';

export interface AnimatedTextProps {
  text: string;
  initial?: boolean;
  exit?: boolean;
  navKey?: string;
  indefinite?: boolean;
  indefiniteSlice?: boolean;
  startIndex?: number;
  endIndex?: number;
  className?: string;
  preserveWidth?: boolean;
  initialInterval?: number;
  exitInterval?: number;
  initialDuration?: number;
  exitDuration?: number;
  initialDelay?: number;
  exitDelay?: number;
  initialStaggerDelay?: number;
  exitStaggerDelay?: number;
  staggerDelayIndex?: number;
}

const AnimatedTextComponent: React.FC<AnimatedTextProps> = ({
  text,
  initial = false,
  exit = false,
  navKey,
  indefinite = false,
  indefiniteSlice = false,
  startIndex = 0,
  endIndex,
  className,
  preserveWidth = false,
  initialInterval,
  exitInterval,
  initialDuration,
  exitDuration,
  initialDelay,
  exitDelay,
  initialStaggerDelay,
  exitStaggerDelay,
  staggerDelayIndex,
}) => {
  const idxRef = useRef<number>(0);
  const mountedRef = useRef<boolean>(false);
  const forwardInt = useRef<NodeJS.Timeout>();
  const backwardInt = useRef<NodeJS.Timeout>();
  const sliceInt = useRef<NodeJS.Timeout>();
  const [shouldExit, setShouldExit] = useState<boolean>(false);
  const [visibleChars, setVisibleChars] = useState<boolean[]>(new Array(text.length).fill(false));
  const [initialComplete, setInitialComplete] = useState<boolean>(false);
  const visibleCharsRef = useRef<boolean[]>(visibleChars);

  const [siteNav, setSiteNav] = useRecoilState(siteNavigationState);

  const endIdx = endIndex ?? text.length;
  const validText = text.slice(startIndex, endIdx);

  const getIntervalFromDuration = useCallback(
    (duration: number): number => duration / text.length,
    [text.length],
  );

  const getInterval = useCallback((
    interval: number | undefined,
    duration: number | undefined,
    fallback: number,
  ): number => {
    if (interval) return interval;
    if (duration) return getIntervalFromDuration(duration);
    return fallback;
  }, [getIntervalFromDuration]);

  /** Set initial and exit properties */
  const initialDel = initialDelay || 0;
  const exitDel = exitDelay || 0;
  const initialStaggerDel = initialStaggerDelay || 100;
  const exitStaggerDel = exitStaggerDelay || (initialStaggerDel / 2);
  const initialIntFallback = getIntervalFromDuration(800);
  const initialInt = getInterval(initialInterval, initialDuration, initialIntFallback);
  const exitInt = getInterval(exitInterval, exitDuration, (initialInt / 2));

  /* Timing helpers */

  const getInitialDelay = useCallback((): number => {
    if (staggerDelayIndex !== null && staggerDelayIndex !== undefined) {
      return initialDel + (initialStaggerDel * staggerDelayIndex);
    }
    return initialDel;
  }, [initialDel, initialStaggerDel, staggerDelayIndex]);

  const getExitDelay = useCallback((): number => {
    if (staggerDelayIndex !== null && staggerDelayIndex !== undefined) {
      return exitDel + (exitStaggerDel * staggerDelayIndex);
    }
    return exitDel;
  }, [exitDel, exitStaggerDel, staggerDelayIndex]);

  const findFirstFalseIndex = useCallback(
    (array: boolean[]) => array.findIndex((vis) => vis === false),
    [],
  );

  const findLastTrueIndex = useCallback(
    (array: boolean[]) => array.findLastIndex((vis) => vis === true),
    [],
  );

  useEffect(() => {
    let idx = 0;
    let timeoutId: NodeJS.Timeout;
    mountedRef.current = true;

    if (initial || indefinite || indefiniteSlice) {
      const startIndefiniteSliceAnimation = () => {
        let sliceIdx = startIndex;

        const animateSlice = () => {
          setVisibleChars((prevVisibleChars) => {
            const newVisibleChars = [...prevVisibleChars];
            newVisibleChars.fill(false, startIndex, endIdx);
            newVisibleChars.fill(true, startIndex, sliceIdx);
            visibleCharsRef.current = newVisibleChars;
            return newVisibleChars;
          });

          if (sliceIdx > endIdx) {
            sliceIdx = startIndex;
          } else {
            sliceIdx += 1;
          }
        };
        sliceInt.current = setInterval(animateSlice, initialInt);
      };

      const animateForward = () => {
        idxRef.current = idx;
        setVisibleChars((prevVisibleChars) => {
          if (idxRef.current < text.length) {
            const newVisibleChars = [...prevVisibleChars];
            newVisibleChars[idxRef.current] = true;
            visibleCharsRef.current = newVisibleChars;
            return newVisibleChars;
          }
          return prevVisibleChars;
        });

        if (idx < text.length) {
          idx += 1;
        } else {
          setInitialComplete(true);
          if (indefinite) {
            setVisibleChars(new Array(text.length).fill(false));
            visibleCharsRef.current = new Array(text.length).fill(false);
            idx = 0;
          } else if (indefiniteSlice) {
            clearInterval(forwardInt.current);
            forwardInt.current = undefined;
            startIndefiniteSliceAnimation();
          } else {
            clearInterval(forwardInt.current);
            forwardInt.current = undefined;
          }
        }
      };

      if (
        !initialComplete && (
          forwardInt.current === null || forwardInt.current === undefined)
      ) {
        // Always start new intervals at first hidden character to mitigate
        // new interval on rerender from interrupting animation
        idx = findFirstFalseIndex(visibleCharsRef.current);
        const delay = getInitialDelay();
        timeoutId = setTimeout(() => {
          if (!mountedRef.current) return;
          forwardInt.current = setInterval(animateForward, initialInt);
        }, delay);
      }
    }

    return () => {
      if (forwardInt.current !== undefined) {
        clearInterval(forwardInt.current);
        forwardInt.current = undefined;
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      mountedRef.current = false;
    };
  }, [
    text,
    initial,
    navKey,
    indefinite,
    indefiniteSlice,
    initialDuration,
    initialInterval,
    initialInt,
    initialComplete,
    endIdx,
    startIndex,
    getInterval,
    setVisibleChars,
    getInitialDelay,
    findFirstFalseIndex,
    setInitialComplete,
  ]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (
      exit
      && shouldExit
      && (
        (initial && initialComplete)
        || (!initial && !initialComplete)
      )) {
      let idx = text.length;
      const animateBackward = () => {
        idxRef.current = idx;
        setVisibleChars((prevVisibleChars) => {
          if (idxRef.current >= 0) {
            const newVisibleChars = [...prevVisibleChars];
            newVisibleChars[idxRef.current] = false;
            visibleCharsRef.current = newVisibleChars;
            return newVisibleChars;
          }
          return prevVisibleChars;
        });

        if (idx > 0) {
          idx -= 1;
        } else {
          clearInterval(backwardInt.current);
          backwardInt.current = undefined;
          // Update site nav state with exit status
          if (exit && navKey) {
            setSiteNav((prev) => ({
              ...prev,
              exitAnimationsCompleted: {
                ...prev.exitAnimationsCompleted,
                [navKey]: true,
              },
            }));
          }
        }
      };
      if (backwardInt.current === null || backwardInt.current === undefined) {
        // Always start new intervals at last visible character to mitigate
        // new interval on rerender from interrupting animation
        idx = findLastTrueIndex(visibleCharsRef.current);
        const delay = getExitDelay();
        timeoutId = setTimeout(() => {
          if (!mountedRef.current) return;
          backwardInt.current = setInterval(animateBackward, exitInt);
        }, delay);
      }
    }
    return () => {
      if (backwardInt.current !== undefined) {
        clearInterval(backwardInt.current);
        backwardInt.current = undefined;
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [
    exit,
    initial,
    navKey,
    text.length,
    validText,
    initialComplete,
    shouldExit,
    exitInt,
    exitDuration,
    exitInterval,
    initialDuration,
    initialInterval,
    setSiteNav,
    getInterval,
    getExitDelay,
    findLastTrueIndex,
  ]);

  useEffect(() => {
    // Register navigation key
    if (exit && navKey) {
      setSiteNav((prev) => {
        if (!(navKey in prev.exitAnimationsCompleted)) {
          return {
            ...prev,
            exitAnimationsCompleted: {
              ...prev.exitAnimationsCompleted,
              [navKey]: false,
            },
          };
        }
        return prev;
      });
    }
  }, [exit, navKey, setSiteNav]);

  useEffect(() => {
    if (siteNav.navigating) {
      setShouldExit(true);
    }
  }, [siteNav.navigating]);

  const containerStyle = preserveWidth
    ? { display: 'inline-block', width: `${text.length}ch` }
    : {};

  return (
    <div style={containerStyle} className={className}>
      {text.split('').map((char, index) => (
        <span key={index} style={{ opacity: visibleChars[index] ? 1 : 0 }}>
          {char}
        </span>
      ))}
    </div>
  );
};

export const AnimatedText = React.memo(AnimatedTextComponent);
