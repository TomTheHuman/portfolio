import React from 'react';

// External Imports
import Image from 'next/image';

// Internal Imports
import { Shape } from 'components/Shape';
import { landing } from '../utils/Info';
import sx from '../styles/pages/Landing.module.scss';

/**
 * Landing page component, rendering content to be displayed when users
 * first visit the site
 * @returns {JSX.Element} landing page component
 */
export default function Landing(): JSX.Element {
  const { text, graphic } = landing;
  const { shapes } = graphic;

  return (
    <div className={sx.root}>
      <div id={sx.text}>
        <h2
          id={sx.title}
          className={sx.head2}
        >
          {text.title}

        </h2>
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
      <div id={sx.graphic}>
        <div id={sx.photo}>
          <Shape
            id={sx.top}
            className={sx.circle}
            shape={shapes.top}
          />
          <Image
            width="100%"
            height="100%"
            src={graphic.image?.path}
            layout="responsive"
            loading="eager"
            priority
          />
          <Shape
            id={sx.bottom}
            className={sx.circle}
            shape={shapes.bottom}
          />
        </div>
      </div>
    </div>
  );
}
