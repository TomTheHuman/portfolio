import React, { useRef } from 'react';

// External Imports
import { Box, Button } from '@mui/material';
import Image from 'next/image';

// Internal Imports
import sx from '../styles/components/Header.module.scss';

/**
 * Navigation button data
 */
interface IButton {
  label: string;
  ref: React.RefObject<HTMLDivElement>;
}

/**
 * Header bar including site logo, title, and navigation elements
 * @returns {JSX.Element} header bar
 */
export default function Header(): JSX.Element {
  // Placeholder for scroll-to navigation
  const fakeRef = useRef<HTMLDivElement>(null);

  /**
   * Configures navigation buttons data to be mapped
   */
  const navButtons = [
    {
      label: 'Link',
      ref: fakeRef,
    },
    {
      label: 'Emphasize',
      ref: fakeRef,
    },
  ];

  /**
   * Action callback to scroll to div associated with nav button
   * @param ref div ref to scroll to
   */
  const executeScroll = (ref: React.RefObject<HTMLDivElement>): void => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'start',
      });
    }
  };

  return (
    <Box className={sx.root}>
      <Box id={sx.title}>
        <Image
          src="/favicon.ico"
          id={sx.siteLogo}
          alt="Site Logo"
          width={36}
          height={36}
          onClick={() => executeScroll(fakeRef)}
        />
      </Box>
      <Box id={sx.nav}>
        {navButtons.map((button: IButton, i: number) => (
          <Button
            key={button.label.toLowerCase()}
            id={button.label.toLowerCase()}
            className={sx.button}
            size="small"
            variant={i === navButtons.length - 1 ? 'contained' : 'text'}
            onClick={() => executeScroll(button.ref)}
          >
            {button.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
