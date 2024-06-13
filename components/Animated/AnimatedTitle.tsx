import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

// External Imports
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';

// Internal Imports
import { Conditional, cn } from '../../utils/Helpers';
import sx from './AnimatedTitle.module.scss';
import { siteNavigationState, themePaletteState } from '../../utils/State';
import { AnimatedText, AnimatedTextProps } from './AnimatedText';

interface IAnimatedTitleProps {
  title: string;
  navKey: string;
  exit?: boolean;
  initialDuration?: number;
  exitDuration?: number;
  initialDelay?: number;
  exitDelay?: number;
  initialStaggerDelay?: number;
  exitStaggerDelay?: number;
  staggerDelayIndex?: number;
  animateText?: boolean;
  animatedTextProps?: AnimatedTextProps;
}

const AnimatedTitleComponent: React.FC<IAnimatedTitleProps> = (props) => {
  const {
    title,
    navKey,
    exit,
    initialDuration,
    exitDuration,
    initialDelay,
    exitDelay,
    initialStaggerDelay,
    exitStaggerDelay,
    staggerDelayIndex,
    animateText,
    animatedTextProps,
  } = props;

  const titleNavKey = `AnimatedTitle-${navKey}`;
  const textNavKey = `AnimatedText-${navKey}`;
  const backgroundRef = useRef<HTMLDivElement>(null);

  /** Set initial and exit properties */
  const initialDel = initialDelay || 200;
  const exitDel = exitDelay || (animateText ? 400 : 0);
  const initialStaggerDel = initialStaggerDelay || 200;
  const exitStaggerDel = exitStaggerDelay || (initialStaggerDel / 2);
  const initialDur = initialDuration || 600;
  const exitDur = exitDuration || (initialDur / 2);

  const [visible, setVisible] = useState<boolean>(false);
  const [shouldExit, setShouldExit] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(initialDur);

  const [siteNav, setSiteNav] = useRecoilState(siteNavigationState);
  const palette = useRecoilValue(themePaletteState);

  const defaultAnimatedTextProps: AnimatedTextProps = {
    text: title,
    initial: true,
    exit: true,
    navKey: textNavKey,
    initialDuration: initialDur,
    exitDuration: exitDur,
    initialDelay: initialDel + 150,
    exitDelay: 0,
    initialStaggerDelay: initialStaggerDel,
    staggerDelayIndex,
    className: sx.head3,
  };

  const getAnimatedTextProps = (): AnimatedTextProps => {
    const textProps = { ...defaultAnimatedTextProps };
    Object.assign(textProps, animatedTextProps);
    // remove nav key if inital and exit are unused
    if (animatedTextProps?.initial === false && !animatedTextProps?.exit === false) {
      textProps.navKey = undefined;
    }
    // handle interval priority over duration
    if (animatedTextProps?.initialInterval) {
      textProps.initialDuration = undefined;
      textProps.exitDuration = undefined;
    }
    return defaultAnimatedTextProps;
  };

  const mergedAnimatedTextProps = getAnimatedTextProps();

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

  useEffect(() => {
    const delay = getInitialDelay();
    setTimeout(() => setVisible(true), delay);
  }, [initialDelay, staggerDelayIndex, getInitialDelay]);

  useEffect(() => {
    if (exit && shouldExit) {
      const delay = getExitDelay();
      setTimeout(() => setVisible(false), delay);
    }
  }, [exit, shouldExit, getExitDelay]);

  useEffect(() => {
    // Register navigation key
    if (exit && titleNavKey) {
      setSiteNav((prev) => {
        if (!(titleNavKey in prev.exitAnimationsCompleted)) {
          return {
            ...prev,
            exitAnimationsCompleted: {
              ...prev.exitAnimationsCompleted,
              [titleNavKey]: false,
            },
          };
        }
        return prev;
      });
    }
  }, [exit, titleNavKey, setSiteNav]);

  const handleResizeOnExit = useRecoilCallback(({ snapshot }) => async (
    entries: ResizeObserverEntry[],
  ) => {
    const { navigating } = await snapshot.getPromise(siteNavigationState);
    if (navigating) {
      const { width } = entries[0].contentRect;
      if (width === 0) {
        setSiteNav((prev) => ({
          ...prev,
          exitAnimationsCompleted: {
            ...prev.exitAnimationsCompleted,
            [titleNavKey]: true,
          },
        }));
      }
    }
  }, [setSiteNav, titleNavKey]);

  useEffect(() => {
    if (siteNav.navigating) {
      setDuration(exitDur);
      setShouldExit(true);
    }
  }, [
    exitDur,
    siteNav.navigating,
    titleNavKey,
    setSiteNav,
    setDuration,
    setShouldExit,
  ]);

  useEffect(() => {
    const observer = new ResizeObserver(handleResizeOnExit);
    if (backgroundRef.current) {
      observer.observe(backgroundRef.current);
    }
    const backgroundDiv = backgroundRef.current;

    return () => {
      if (backgroundDiv) {
        observer.unobserve(backgroundDiv);
      }
    };
  }, [handleResizeOnExit]);

  return (
    <div className={sx.title}>
      <Conditional
        condition={!!animateText}
        fallback={<h3 className={sx.head3}>{title}</h3>}
      >
        <AnimatedText
          key={textNavKey}
          {...mergedAnimatedTextProps}
        />
      </Conditional>
      <div
        ref={backgroundRef}
        className={cn(sx.background, (visible ? sx.visible : sx.hidden))}
        style={{
          backgroundColor: palette.secondary,
          transition: `width ease-out ${duration}ms`,
        }}
      />
    </div>
  );
};

export default React.memo(AnimatedTitleComponent);
