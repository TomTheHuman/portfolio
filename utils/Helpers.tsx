import React, {
  ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { useRecoilState } from 'recoil';
import { SiteNavigation, siteNavigationState } from './State';

/** Concatenate class name variables */

export const cn = (...classNames: string[]) => classNames.join(' ');

/** More elegant conditional rendering component */

interface ConditionalProps {
  condition: boolean;
  fallback?: ReactNode;
  children: ReactNode;
}

export const Conditional: React.FC<ConditionalProps> = (
  { condition, fallback, children },
) => (
  <>
    {condition ? children : fallback || null}
  </>
);

/** Type-like text animation */

interface AnimatedTextProps {
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
  interval?: number;
}

export const AnimatedTextComponent: React.FC<AnimatedTextProps> = ({
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
  interval = 110,
}) => {
  const idxRef = useRef<number>(0);
  const forwardInt = useRef<NodeJS.Timeout>();
  const backwardInt = useRef<NodeJS.Timeout>();
  const sliceInt = useRef<NodeJS.Timeout>();
  const [shouldExit, setShouldExit] = useState<boolean>(false);
  const [visibleChars, setVisibleChars] = useState<boolean[]>(new Array(text.length).fill(false));
  const [initialComplete, setInitialComplete] = useState<boolean>(false);

  const [siteNav, setSiteNav] = useRecoilState(siteNavigationState);

  const endIdx = endIndex ?? text.length;
  const validText = text.slice(startIndex, endIdx);
  const exitInterval = 50;

  const startIndefiniteSliceAnimation = () => {
    let sliceIdx = startIndex;

    const animateSlice = () => {
      setVisibleChars((prevVisibleChars) => {
        const newVisibleChars = [...prevVisibleChars];
        newVisibleChars.fill(false, startIndex, endIdx);
        newVisibleChars.fill(true, startIndex, sliceIdx);
        return newVisibleChars;
      });

      if (sliceIdx > endIdx) {
        sliceIdx = startIndex;
      } else {
        sliceIdx += 1;
      }
    };
    sliceInt.current = setInterval(animateSlice, interval);
  };

  useEffect(() => {
    let idx = 0;

    if (initial || indefinite || indefiniteSlice) {
      const animateForward = () => {
        idxRef.current = idx;
        setVisibleChars((prevVisibleChars) => {
          const newVisibleChars = [...prevVisibleChars];
          if (idxRef.current <= text.length) {
            newVisibleChars[idxRef.current] = true;
          }
          return newVisibleChars;
        });

        if (idx < text.length) {
          idx += 1;
        } else {
          setInitialComplete(true);
          if (indefinite) {
            setVisibleChars(new Array(text.length).fill(false));
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

      if (!forwardInt.current) {
        // Always start new intervals at first hidden character to mitigate
        // new interval on rerender from interrupting animation
        idx = visibleChars.findIndex((vis) => vis === false);
        console.log('play initial animation for key', navKey);
        forwardInt.current = setInterval(animateForward, interval);
      }
    }

    return () => {
      clearInterval(forwardInt.current);
      forwardInt.current = undefined;
    };
  }, [text, initial, indefinite, indefiniteSlice, interval, setVisibleChars]);

  useEffect(() => {
    if (
      exit
      && shouldExit
      && (
        (initial && initialComplete)
        || (!initial && !initialComplete)
      )) {
      let idx = text.length;
      const animateBackward = () => {
        setVisibleChars((prevVisibleChars) => {
          const newVisibleChars = [...prevVisibleChars];
          if (idx >= 0) {
            newVisibleChars[idx] = false;
          }
          return newVisibleChars;
        });

        if (idx >= 0) {
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
      console.log('play exit animation for key', navKey);
      backwardInt.current = setInterval(animateBackward, exitInterval);
    }
    return () => {
      clearInterval(backwardInt.current);
      backwardInt.current = undefined;
    };
  }, [validText, exit, initialComplete, interval, shouldExit, initial]);

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
  }, [setSiteNav]);

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
