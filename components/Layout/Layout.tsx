import React from 'react';

import { useRouter } from 'next/router';

import Link from 'next/link';
import sx from './Layout.module.scss';
import { Conditional, cn } from '../../utils/Helpers';

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

function Navigation(): JSX.Element {
  return (
    <div className={sx.navigation}>
      <Link className={sx.body1} href="/">HOME</Link>
      <Link className={sx.body1} href="/about">ABOUT</Link>
      <Link className={sx.body1} href="/projects">PROJECTS</Link>
      <Link className={sx.body1} href="/contact">CONTACT</Link>
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
