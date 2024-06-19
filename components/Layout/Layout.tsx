import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

// External Imports
import { useRouter } from 'next/router';
import {
  useRecoilCallback, useRecoilValue, useSetRecoilState,
} from 'recoil';
import debounce from 'lodash/debounce';

// Internal Imports
import sx from './Layout.module.scss';
import { Conditional, cn } from '../../utils/Helpers';
import { themePaletteState } from '../../utils/State';
import colorPalette from '../../utils/Palette';
import { NavigateLink, NavigateSync } from './Navigate';
import { AnimatedText } from '../Animated/AnimatedText';

interface ILayoutProps {
  children: JSX.Element | JSX.Element[];
}

function ContentWrapper({ children }: {
  children: JSX.Element | JSX.Element[]
}): React.ReactElement {
  const router = useRouter();
  const getTitle = () => {
    switch (router.pathname) {
      case '/about':
        return 'ABOUT';
      case '/projects':
        return 'PROJECTS';
      case '/contact':
        return 'CONTACT';
      default:
        return '';
    }
  };

  return (
    <div className={sx.page}>
      <Conditional condition={router.pathname === '/'}>
        <div key="landing" className={sx.landing}>
          {children}
        </div>
      </Conditional>
      <div
        className={cn(
          sx.overlay,
          (router.pathname === '/' ? sx.closed : sx.open),
        )}
      >
        <div className={sx.pageTitle}>
          <h1 className={sx.head1}>
            <AnimatedText
              key={getTitle()}
              navKey={getTitle()}
              text={getTitle()}
              initial
              exit
              className={sx.head1}
            />
          </h1>
          <div className={sx.underline} />
        </div>
        <div key="wrapper" className={sx.wrapper}>
          {router.pathname !== '/' && children}
        </div>
      </div>
    </div>
  );
}

const StyledLink = (
  {
    href, label, currPath, onClick, onMouseEnter, onMouseLeave, setCurrLinkId,
  }:
  {
    href: string,
    label: string,
    currPath: string,
    onClick: React.MouseEventHandler<HTMLDivElement>,
    onMouseEnter: React.MouseEventHandler<HTMLDivElement>,
    onMouseLeave: React.MouseEventHandler<HTMLDivElement>,
    setCurrLinkId: React.Dispatch<React.SetStateAction<string>>,
  },
) => {
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    if (currPath && currPath === href) {
      setCurrLinkId(label);
    }
  }, [href, label, currPath, setCurrLinkId]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setClicked(true);
    onClick(e);
    setTimeout(() => setClicked(false), 500);

    const anchorElement = e.currentTarget.querySelector('a');
    if (anchorElement) {
      anchorElement.click();
    }
  };

  return (
    <div
      id={label}
      onClick={handleClick}
      onKeyDown={() => null}
      onMouseEnter={onMouseEnter}
      onMouseLeave={!clicked ? onMouseLeave : () => null}
      className={sx.styledLinkContainer}
    >
      <NavigateLink prefetch href={href} className={sx.body1}>
        {label}
      </NavigateLink>
    </div>
  );
};

function Navigation(): JSX.Element {
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);
  const debounceSliderRef = useRef<ReturnType<typeof debounce>>();
  const [currLinkId, setCurrLinkId] = useState<string>('');

  const palette = useRecoilValue(themePaletteState);

  const handleSlider = useCallback((id: string, hover = false) => {
    const linkEl = document.getElementById(id);
    if (sliderRef.current && linkEl) {
      const labelRect = linkEl.firstElementChild?.getBoundingClientRect();
      const sliderContainerEl = sliderRef.current.parentElement;
      const sliderContainerRect = sliderRef.current.parentElement?.getBoundingClientRect();

      if (!labelRect || !sliderContainerRect || !sliderContainerEl) return;

      const trackPaddingLeft = labelRect.left - sliderContainerRect.left;
      const trackWidth = trackPaddingLeft + labelRect.width;
      const slideRight = trackWidth > sliderContainerRect.width;

      sliderContainerEl.classList.add(slideRight ? sx.slideRight : sx.slideLeft);
      sliderContainerEl.classList.remove(slideRight ? sx.slideLeft : sx.slideRight);

      sliderRef.current.style.backgroundColor = hover ? 'rgba(0,0,0,0.4)' : palette.secondary;
      sliderContainerEl.style.width = `${trackWidth}px`;
      sliderContainerEl.style.paddingLeft = `${trackPaddingLeft}px`;
    }
  }, [palette.secondary]);

  const handleSliderReset = useCallback(() => {
    if (sliderRef.current) {
      handleSlider(currLinkId);
    }
  }, [currLinkId, handleSlider]);

  const onMouseEnter = (id: string) => {
    handleSlider(id, true);
    if (debounceSliderRef.current) debounceSliderRef.current.cancel();
  };
  const onMouseLeave = () => {
    if (debounceSliderRef.current) debounceSliderRef.current();
  };
  const onClick = () => {
    if (debounceSliderRef.current) debounceSliderRef.current.cancel();
  };

  useEffect(() => {
    debounceSliderRef.current = debounce(handleSliderReset, 500);
    return () => {
      debounceSliderRef.current = undefined;
    };
  }, [handleSliderReset]);

  useEffect(() => {
    if (currLinkId) {
      handleSlider(currLinkId);
    }
  }, [currLinkId, handleSlider]);

  return (
    <div className={sx.navigation}>
      <div className={sx.links}>
        <StyledLink
          href="/"
          label="HOME"
          currPath={router.pathname}
          onClick={onClick}
          onMouseEnter={() => onMouseEnter('HOME')}
          onMouseLeave={onMouseLeave}
          setCurrLinkId={setCurrLinkId}
        />
        <StyledLink
          href="/about"
          label="ABOUT"
          currPath={router.pathname}
          onClick={onClick}
          onMouseEnter={() => onMouseEnter('ABOUT')}
          onMouseLeave={onMouseLeave}
          setCurrLinkId={setCurrLinkId}
        />
        <StyledLink
          href="/projects"
          label="PROJECTS"
          currPath={router.pathname}
          onClick={onClick}
          onMouseEnter={() => onMouseEnter('PROJECTS')}
          onMouseLeave={onMouseLeave}
          setCurrLinkId={setCurrLinkId}
        />
        <StyledLink
          href="/contact"
          label="CONTACT"
          currPath={router.pathname}
          onClick={onClick}
          onMouseEnter={() => onMouseEnter('CONTACT')}
          onMouseLeave={onMouseLeave}
          setCurrLinkId={setCurrLinkId}
        />
      </div>
      <NavigateSync />
      <div className={sx.sliderTrack}>
        <div
          ref={sliderRef}
          className={sx.slider}
          style={{

          }}
        />
      </div>
    </div>
  );
}

export default function Layout(props: ILayoutProps): JSX.Element {
  const { children } = props;
  const router = useRouter();
  const pathRef = useRef<string>(router.pathname);

  const setPalette = useSetRecoilState(themePaletteState);

  const useNextPalette = useRecoilCallback(({ snapshot }) => async () => {
    const palette = await snapshot.getPromise(themePaletteState);
    const last = colorPalette.length - 1;
    const curr = colorPalette.findIndex((p) => p.primary === palette.primary);
    const next = curr === last ? 0 : curr + 1;
    setPalette(colorPalette[next]);
  }, []);

  useEffect(() => {
    if (router.pathname !== pathRef.current) {
      useNextPalette();
    }
  }, [router.pathname, useNextPalette]);

  return (
    <div className={sx.root}>
      <Navigation />
      <ContentWrapper>
        { children }
      </ContentWrapper>
    </div>
  );
}
