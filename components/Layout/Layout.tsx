import React from 'react';

import { useRouter } from 'next/router';

import Link from 'next/link';
import { useRecoilCallback, useSetRecoilState } from 'recoil';
import sx from './Layout.module.scss';
import { Conditional, cn } from '../../utils/Helpers';
import { themePaletteState } from '../../utils/State';
import colorPalette from '../../utils/Palette';

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
        <div className={sx.landing}>
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
            {getTitle()}
          </h1>
          <div className={sx.underline} />
        </div>
        <div className={sx.wrapper}>
          {router.pathname !== '/' && children}
        </div>
      </div>
    </div>
  );
}

const StyledLink = ({ href, label }: { href: string, label: string }) => {
  const setPalette = useSetRecoilState(themePaletteState);

  const handleNextPalette = useRecoilCallback(({ snapshot }) => async () => {
    const palette = await snapshot.getPromise(themePaletteState);
    const last = colorPalette.length - 1;
    const curr = colorPalette.findIndex((p) => p.primary === palette.primary);
    const next = curr === last ? 0 : curr + 1;
    setPalette(colorPalette[next]);
  }, []);

  return (
    <div className={sx.styledLinkContainer}>
      <Link
        className={sx.body1}
        onClick={handleNextPalette}
        href={href}
        prefetch
      >
        {label}
      </Link>
    </div>
  );
};

function Navigation(): JSX.Element {
  return (
    <div className={sx.navigation}>
      <StyledLink href="/" label="HOME" />
      <StyledLink href="/about" label="ABOUT" />
      <StyledLink href="/projects" label="PROJECTS" />
      <StyledLink href="/contact" label="CONTACT" />
    </div>
  );
}

export default function Layout(props: ILayoutProps): JSX.Element {
  const { children } = props;

  return (
    <div className={sx.root}>
      <Navigation />
      <ContentWrapper>
        { children }
      </ContentWrapper>
    </div>
  );
}
