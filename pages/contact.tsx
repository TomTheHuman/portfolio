import React from 'react';

import { useRecoilValue } from 'recoil';
import sx from '../styles/Contact.module.scss';
import { themePaletteState } from '../utils/State';
import { AnimatedText, cn } from '../utils/Helpers';
import AnimatedTitle from '../components/Animated/AnimatedTitle';

export default function Contact(): JSX.Element {
  const palette = useRecoilValue(themePaletteState);

  return (
    <div className={cn(sx.content, sx.root)}>
      <div className={sx.card}>
        <div
          className={sx.imageWrapper}
          style={{ borderColor: palette.secondary }}
        >
          <img
            className={sx.image}
            src="/headshot.jpg"
            aria-label="Thomas Shaw headshot"
          />
        </div>
        <div className={sx.body}>
          <AnimatedTitle title="GET IN TOUCH" />
          <div className={sx.contact}>
            <div className={sx.column}>
              <AnimatedText
                exit
                initial
                key="contactName"
                navKey="contactName"
                text="THOMAS SHAW"
                className={cn(sx.head3, sx.name)}
              />
              <div className={sx.indent}>
                <p className={cn(sx.body1, sx.larger)}>
                  Full Stack Web Developer
                </p>
                <p className={cn(sx.body1, sx.larger)}>
                  San Francisco, CA
                </p>
              </div>
            </div>
            <div className={sx.divider} />
            <div>
              <p className={sx.body1}>
                Thank you for stopping by. If you like what you see
                and want to check out more of my work, or want to contact me, links are below.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
