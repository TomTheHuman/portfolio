import React, { useState, useEffect, useRef } from 'react';

// External Imports
import { Divider } from '@mui/material';
import { useRouter } from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';

// Internal Imports
import { colors, site } from 'utils/Info';
import Link from 'next/link';
import { ILink } from 'utils/IInfo';
import sx from '../styles/components/Header.module.scss';
import Button from './Button';

interface IMobileMenuProps {
  open: boolean;
  close: () => void;
  links: ILink[];
}

function MobileMenu(props: IMobileMenuProps): JSX.Element {
  const { open, close, links } = props;
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuHeight, setMenuHeight] = useState<number>(0);

  const notLast = (index: number): boolean => {
    if (index < (links.length - 1)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (menuRef.current) {
      const height = Math.floor(menuRef.current.offsetHeight);
      setMenuHeight(height);
    }
  });

  const handleClick = (path: string): void => {
    router.push(path);
    close();
  };

  return (
    <div
      className={sx.menuWrap}
      style={{
        height: open ? menuHeight : '0',
      }}
    >
      <div
        ref={menuRef}
        className={sx.menu}
      >
        {links.map((link, i) => (
          <>
            <button
              key={link.key}
              type="button"
              className={sx.menuLink}
              onClick={() => handleClick(link.href)}
            >
              <p className={sx.body1}>
                {link.label}
              </p>
            </button>
            {notLast(i)
              && (
              <Divider style={
                { width: '100%', borderColor: colors.navy }
              }
              />
              )}
          </>
        ))}
      </div>
    </div>
  );
}

/**
 * Header bar including site logo, title, and navigation elements
 * @returns {JSX.Element} header bar
 */
export default function Header(): JSX.Element {
  const { primary, emphasized } = site.navigation;
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  const toggleMenu = (): void => {
    setMenuOpen((prev) => !prev);
  };

  const handleNavigate = (): void => {
    router.push('/contact');
  };

  return (
    <div className={sx.root}>
      <div
        className={sx.closeMenu}
        onClick={toggleMenu}
        onKeyDown={toggleMenu}
        style={{
          display: menuOpen ? 'block' : 'none',
        }}
      />
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
          render={emphasized.label}
          handleClick={handleNavigate}
          className={sx.contactButton}
        />
        <Button
          render={<MenuIcon fontSize="small" />}
          handleClick={toggleMenu}
          className={sx.menuButton}
        />
        <MobileMenu
          open={menuOpen}
          close={toggleMenu}
          links={[...primary, emphasized]}
        />
      </div>
      <Divider />
    </div>
  );
}
