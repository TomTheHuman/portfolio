import React from 'react';

// Internal Imports
import { contact } from '../utils/Info';
import sx from '../styles/pages/Contact.module.scss';

/**
 * Contact page component, provides resources and links to view my work,
 * connect with me on social platforms or get in touch
 * @returns {JSX.Element} contact page component
 */
export default function Contact(): JSX.Element {
  const { text, links, graphic } = contact;

  return (
    <div className={sx.root}>
      <h2 className={sx.head2}>{text.title}</h2>
    </div>
  );
}
