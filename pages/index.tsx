import React from 'react';

import sx from '../styles/index.module.scss';
import { cn } from '../utils/Helpers';
import { AnimatedText } from '../components/Animated/AnimatedText';

export default function Landing(): JSX.Element {
  return (
    <div className={sx.root}>
      <div className={sx.wrapper}>
        <p className={sx.subtitle1}>
          Hello. My name is
        </p>
        <AnimatedText
          key="landingFullName"
          navKey="landingFullName"
          text="THOMAS SHAW"
          initial
          exit
          className={cn(sx.head1, sx.text)}
        />
        <br />
        <p className={(sx.subtitle1)}>
          Welcome to my development portfolio.
        </p>
      </div>
    </div>
  );
}
