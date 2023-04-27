import React from 'react';

// Internal Imports
import { about } from '../utils/Info';
import sx from '../styles/pages/About.module.scss';
import { Shape } from '../components/Shape';

/**
 * About page component, displaying a brief self-introduction and
 * any relevant personal information
 * @returns {JSX.Element} about page component
 */
export default function About(): JSX.Element {
  const { text, shapes } = about;
  const {
    first, second, third, fourth,
  } = shapes;
  const paragraphs = text.body?.split('<br>');

  return (
    <div className={sx.root}>
      <h2 className={sx.head2}>{text.title}</h2>
      <div className={sx.body}>
        {paragraphs?.map((paragraph, i) => (
          <p key={`paragraph${i}`} className={sx.body1}>{paragraph}</p>
        ))}
      </div>
      <div id={sx.graphic}>
        <Shape
          id={sx.first}
          shape={first}
          orientation="horizontal"
        />
        <Shape
          id={sx.second}
          shape={second}
        />
        <Shape
          id={sx.third}
          shape={third}
        />
        <Shape
          id={sx.fourth}
          shape={fourth}
          orientation="horizontal"
        />
      </div>
    </div>
  );
}
