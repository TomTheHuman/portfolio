import React, { useState, useEffect } from 'react';

// External Imports
import { useRouter } from 'next/router';
import { NavigateNext, NavigateBefore } from '@mui/icons-material';

// Internal Imports
import sx from '../styles/components/Footer.module.scss';
import Button from './Button';
import { site } from '../utils/Info';
import { ILink } from '../utils/IInfo';

/** Home Path */
const home: ILink = {
  key: 'home',
  label: 'Home',
  href: '/',
};

export default function Footer(): JSX.Element {
  const { navigation } = site;
  const { primary, emphasized } = navigation;
  const paths = [home, ...primary, emphasized];
  const router = useRouter();

  // Index within paths list aligned with current URL path
  const [current, setCurrent] = useState<number>(0);
  console.log(current);

  useEffect(() => {
    const { pathname } = router;
    const index = paths.findIndex((path) => (
      path.href === pathname
    ));
    setCurrent(index);
  }, [router]);

  const prevIndex = (): number | null => {
    if (current > 0) {
      return current - 1;
    }
    return null;
  };

  const nextIndex = (): number | null => {
    const lastIndex = paths.length - 1;
    if (current < lastIndex) {
      return current + 1;
    }
    return null;
  };

  const prevButton = (): JSX.Element => {
    const prev = prevIndex();
    if (prev !== null) {
      const { href, label } = paths[prev];
      return (
        <Button
          key={label}
          size="small"
          render={(
            <>
              <NavigateBefore fontSize="small" />
              <p className={sx.body1}>{label}</p>
            </>
          )}
          handleClick={() => router.push(href)}
          className={sx.navButton}
        />
      );
    }
    return <div />;
  };

  const nextButton = (): JSX.Element => {
    const next = nextIndex();
    if (next !== null) {
      const { href, label } = paths[next];
      return (
        <Button
          key={label}
          size="small"
          render={(
            <>
              <p className={sx.body1}>{label}</p>
              <NavigateNext fontSize="small" />
            </>
          )}
          handleClick={() => router.push(href)}
          className={sx.navButton}
        />
      );
    }
    return <div />;
  };

  return (
    <div className={sx.root}>
      {prevButton()}
      {nextButton()}
    </div>
  );
}
