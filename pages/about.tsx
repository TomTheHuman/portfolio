import React from 'react';

import { about } from '../utils/Data';
import sx from '../styles/About.module.scss';

export default function About(): JSX.Element {
  return (
    <div className={sx.content}>
      {about.map((section) => (
        <div className={sx.section}>
          <h3 className={sx.head3}>{section.title}</h3>
          <p className={sx.body1}>{section.body}</p>
        </div>
      ))}
    </div>
  );
}
