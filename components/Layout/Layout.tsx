import React, { useEffect, useRef } from 'react';

import { useRouter } from 'next/router';

import {
  useRecoilCallback, useSetRecoilState,
} from 'recoil';
import sx from './Layout.module.scss';
import { AnimatedText, Conditional, cn } from '../../utils/Helpers';
import { themePaletteState } from '../../utils/State';
import colorPalette from '../../utils/Palette';
import { NavigateLink, NavigateSync } from './Navigate';

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

const StyledLink = ({ href, label }: { href: string, label: string }) => (
  <div className={sx.styledLinkContainer}>
    <NavigateLink
      className={sx.body1}
      href={href}
      prefetch
    >
      {label}
    </NavigateLink>
  </div>
);

function Navigation(): JSX.Element {
  return (
    <div className={sx.navigation}>
      <StyledLink href="/" label="HOME" />
      <StyledLink href="/about" label="ABOUT" />
      <StyledLink href="/projects" label="PROJECTS" />
      <StyledLink href="/contact" label="CONTACT" />
      <NavigateSync />
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
  }, [router.pathname]);

  return (
    <div className={sx.root}>
      <Navigation />
      <ContentWrapper>
        { children }
      </ContentWrapper>
    </div>
  );
}
