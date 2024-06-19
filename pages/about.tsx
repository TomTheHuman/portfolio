import React, { useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';
import { about } from '../utils/Data';
import sx from '../styles/About.module.scss';
import { themePaletteState } from '../utils/State';
import { cn } from '../utils/Helpers';
import AnimatedTitle from '../components/Animated/AnimatedTitle';

interface IAnimatedBaseProps {
  index: number;
}

type IAnimatedFooterProps = IAnimatedBaseProps;

const AnimatedFooter = (props: IAnimatedFooterProps): React.ReactElement => {
  const { index } = props;

  const delayInit = 500;
  const delayMult = 100; // delay in ms
  const [visible, setVisible] = useState<boolean>(false);
  const palette = useRecoilValue(themePaletteState);

  useEffect(() => {
    const childDelay = delayMult * index;
    const delay = childDelay + delayInit;
    setTimeout(() => setVisible(true), delay);
  }, [index]);

  return (
    <div
      className={cn(sx.footer, (visible ? sx.visible : sx.hidden))}
      style={{ backgroundColor: palette.primary }}
    />
  );
};

export default function About(): JSX.Element {
  const delayBase = 200;
  const staggerDelay = 200;

  const getDelay = (index: number) => delayBase + (staggerDelay * index);

  return (
    <div className={cn(sx.content, sx.root)}>
      {about.map((section, i) => (
        <div
          key={section.title}
          className={sx.section}
        >
          <AnimatedTitle
            title={section.title}
            key={section.title.replace(/ /g, '')}
            navKey={section.title.replace(/ /g, '')}
            staggerDelayIndex={i}
            animateText
            exit
          />
          <div
            className={sx.bodyWrapper}
            style={{ animationDelay: `${getDelay(i)}ms` }}
          >
            <div className={sx.body}>
              <p className={sx.body1}>{section.body}</p>
            </div>
            <AnimatedFooter index={i} />
          </div>
        </div>
      ))}
    </div>
  );
}
