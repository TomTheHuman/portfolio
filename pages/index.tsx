import React from 'react';

import Link from 'next/link';

import sx from '../styles/index.module.scss';

export default function Landing(): JSX.Element {
  return (
    <div className={sx.root}>
      <div className={sx.wrapper}>
        <p className={sx.subtitle1}>
          Hi. My name is
        </p>
        <h1 className={sx.head1}>THOMAS SHAW</h1>
        <br />
        <p className={sx.subtitle1}>
          Welcome to my development portfolio.
        </p>
      </div>
    </div>
  );
}
