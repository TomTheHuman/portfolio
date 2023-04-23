import React from 'react';

// Internal Imports
import { work } from '../utils/Info';
import sx from '../styles/pages/Work.module.scss';

/**
 * Work page component, a showcase of note-worthy projects I've worked on
 * @returns {JSX.Element} work page component
 */
export default function Work(): JSX.Element {
  const { text, projects, shapes } = work;

  return (
    <div className={sx.root}>
      <h2 className={sx.head2}>{text.title}</h2>
    </div>
  );
}
