import React, { useEffect, useState } from 'react';

// External Imports
import { useRecoilValue } from 'recoil';

// Internal Imports
import { cn } from '../../utils/Helpers';
import sx from './AnimatedTitle.module.scss';
import { themePaletteState } from '../../utils/State';

interface IAnimatedTitleProps {
  delay?: number;
  delayIndex?: number;
  title: string;
}

const AnimatedTitle = (props: IAnimatedTitleProps): React.ReactElement => {
  const { title, delay, delayIndex } = props;

  const baseDelay = 500;
  const delayMult = 100; // delay in ms
  const [visible, setVisible] = useState<boolean>(false);
  const palette = useRecoilValue(themePaletteState);

  useEffect(() => {
    let animateDelay = delay || baseDelay;
    if (delayIndex) {
      animateDelay += (delayMult * delayIndex);
    }
    setTimeout(() => setVisible(true), animateDelay);
  }, []);

  return (
    <div className={sx.title}>
      <h3 className={sx.head3}>
        {title}
      </h3>
      <div
        className={cn(sx.background, (visible ? sx.visible : sx.hidden))}
        style={{ backgroundColor: palette.secondary }}
      />
    </div>
  );
};

export default AnimatedTitle;
