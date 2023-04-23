import React from 'react';

// Internal Imports
import { skills } from '../utils/Info';
import sx from '../styles/pages/Skills.module.scss';

/**
 * Skills page component, emphasizing my most used technical skills
 * and listing all technologies I have experience with
 * @returns {JSX.Element} skills page component
 */
export default function Skills(): JSX.Element {
  const { text, emphasized, other } = skills;

  return (
    <div className={sx.root}>
      <h2 className={sx.head2}>{text.title}</h2>
      <div className={sx.body}>
        <p className={sx.body1}>{text.body}</p>
      </div>
    </div>
  );
}
