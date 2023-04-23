import React from 'react';

// External Imports
import { Divider } from '@mui/material';
import { useRouter } from 'next/router';

// Internal Imports
import { site } from 'utils/Info';
import Link from 'next/link';
import { ILink } from 'utils/IInfo';
import sx from '../styles/components/Header.module.scss';
import Button from './Button';

/**
 * Header bar including site logo, title, and navigation elements
 * @returns {JSX.Element} header bar
 */
export default function Header(): JSX.Element {
  const { primary, emphasized } = site.navigation;
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/contact');
  };

  return (
    <div className={sx.root}>
      <div className={sx.header}>
        <h1 className={sx.head1}>
          <Link href="/">Thomas</Link>
        </h1>
        <div id={sx.primary}>
          {primary.map((link: ILink) => (
            <p
              key={link.key}
              className={sx.body1}
            >
              <Link href={link.href}>{link.label}</Link>
            </p>
          ))}
        </div>
        <Button
          label={emphasized.label}
          handleClick={handleNavigate}
        />
      </div>
      <Divider />
    </div>
  );
}
