import React from 'react';

// Internal Imports
import { landing } from '../utils/Info';
import sx from '../styles/pages/Landing.module.scss';

/**
 * Landing page component, rendering content to be displayed when users
 * first visit the site
 * @returns {JSX.Element} landing page component
 */
export default function Landing(): JSX.Element {
  const { text, graphic } = landing;

  return (
    <div className={sx.root}>
      <div id={sx.text}>
        <h2 className={sx.head2}>{text.title}</h2>
        <h1
          id={sx.name}
          className={sx.head1}
        >
          {text.name}
        </h1>
        <p
          id={sx.subtitle}
          className={sx.body1}
        >
          {text.subtitle}
        </p>
      </div>
      <div id={sx.graphic} />
    </div>
  );
}
