import React from 'react';

// External Imports
import Image from 'next/image';

// Internal Imports
import { IShape } from 'utils/IInfo';
import { landing } from '../utils/Info';
import sx from '../styles/pages/Landing.module.scss';

interface ICircleProps {
  id: string;
  config: IShape;
}

function Circle(props: ICircleProps): JSX.Element {
  const { id, config } = props;
  const { size, color } = config;

  return (
    <div
      id={id}
      className={sx.circle}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
      }}
    />
  );
}

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
      <div id={sx.graphic}>
        <div id={sx.photo}>
          <Circle
            id={sx.top}
            config={shapes.top}
          />
          <Image
            width="100%"
            height="100%"
            src={graphic.image?.path}
            layout="responsive"
          />
          <Circle
            id={sx.bottom}
            config={shapes.bottom}
          />
        </div>
      </div>
    </div>
  );
}
