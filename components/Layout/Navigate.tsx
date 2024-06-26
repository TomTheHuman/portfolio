import React, { useEffect } from 'react';

// External Imports
import {
  useRecoilCallback, useRecoilState, useRecoilValue, useSetRecoilState,
} from 'recoil';
import Link, { LinkProps } from 'next/link';

// Internal Imports
import { useRouter } from 'next/router';
import { canNavigateSelector, siteNavigationState } from '../../utils/State';

interface INavigateLinkProps extends LinkProps {
  children: React.ReactNode | string;
  className: string;
}

export function NavigateLink(props: INavigateLinkProps): React.ReactElement {
  const { children } = props;
  const router = useRouter();

  const setSiteNav = useSetRecoilState(siteNavigationState);

  const handleClick = useRecoilCallback(({ snapshot }) => async (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const navState = await snapshot.getPromise(siteNavigationState);
    if (navState.currentPath === href) return;

    const isEmpty = Object.keys(navState.exitAnimationsCompleted).length === 0;
    if (isEmpty) {
      router.push(href);
    } else {
      setSiteNav((prev) => ({
        ...prev,
        navigating: true,
        nextPath: href,
      }));
    }
  }, [setSiteNav]);

  return (
    <Link
      prefetch
      {...props}
      onClick={(e) => handleClick(e, props.href as string)}
    >
      {children}
    </Link>
  );
}

export function NavigateSync(): React.ReactElement | null {
  const router = useRouter();

  const [siteNav, setSiteNav] = useRecoilState(siteNavigationState);
  const canNavigate = useRecoilValue(canNavigateSelector);

  const navigateNextPath = useRecoilCallback(({ snapshot }) => async () => {
    const { nextPath } = await snapshot.getPromise(siteNavigationState);
    router.push(nextPath);
  }, []);

  useEffect(() => {
    setSiteNav((prev) => {
      if (router.pathname !== siteNav.currentPath) {
        return {
          navigating: false,
          exitAnimationsCompleted: {},
          currentPath: router.pathname,
          nextPath: '',
        };
      }
      return { ...prev, currentPath: router.pathname };
    });
  }, [router.pathname, siteNav.currentPath, setSiteNav]);

  useEffect(() => {
    if (canNavigate) {
      setSiteNav((prev) => ({
        navigating: false,
        exitAnimationsCompleted: {},
        currentPath: router.pathname,
        nextPath: prev.nextPath,
      }));
      navigateNextPath();
    }
  }, [canNavigate, router.pathname, navigateNextPath, setSiteNav]);

  return null;
}
