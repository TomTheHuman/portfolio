import React from 'react';

// Internal Imports
import sx from '../styles/components/Layout.module.scss';
import Header from './Header';

interface ILayoutProps {
  children: JSX.Element | JSX.Element[];
}

/**
 * Layout component where core UI is configured
 * @returns {JSX.Element}
 */
export default function Layout(props: ILayoutProps): JSX.Element {
  const { children } = props;

  return (
    <div className={sx.root}>
      <div className={sx.body}>
        <Header />
        <div className={sx.container}>
          {children}
        </div>
      </div>
    </div>
  );
}
