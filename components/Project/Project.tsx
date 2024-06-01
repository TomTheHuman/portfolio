import React, { useState } from 'react';

// External Imports

// Internal Imports
import { ImageShadowRegular, OpenRegular } from '@fluentui/react-icons';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import sx from './Project.module.scss';
import { Conditional, cn } from '../../utils/Helpers';
import { themePaletteState } from '../../utils/State';

interface IProjectProps {
  name: string;
  description: string;
  thumbnails: string[];
  year: string;
  url?: string;
  urlLabel?: string;
}

const Thumbnail = ({ thumbnails }: { thumbnails: string[] }): React.ReactElement => {
  const [thumbIndex, setThumbIndex] = useState<number>(0);
  if (thumbnails === null) {
    setThumbIndex(0);
  }

  const palette = useRecoilValue(themePaletteState);

  return (
    <div
      className={sx.imageContainer}
      style={{
        borderColor: palette.secondary,
      }}
    >
      <div
        className={sx.imageWrapper}
        style={{
          borderColor: palette.secondary,
        }}
      >
        <img
          className={sx.thumbnail}
          src={thumbnails[thumbIndex]}
          aria-label={thumbnails[thumbIndex]}
        />
        <div className={sx.hoverOverlay}>
          <ImageShadowRegular className={sx.icon} />
        </div>
      </div>
    </div>
  );
};

function Project(props: IProjectProps): React.ReactElement {
  const {
    name, description, thumbnails, year, url, urlLabel,
  } = props;

  const palette = useRecoilValue(themePaletteState);

  return (
    <div className={sx.root}>
      <Thumbnail thumbnails={thumbnails} />
      <div className={sx.textContainer}>
        <div
          className={sx.name}
          style={{ backgroundColor: palette.secondary }}
        >
          <h3 className={sx.head3}>{name}</h3>
        </div>
        <div className={sx.detailsContainer}>
          <div className={sx.description}>
            <p className={sx.body1}>{description}</p>
          </div>
          <div className={sx.footer}>
            <div className={sx.alignLeft}>
              <p
                className={cn(sx.body1, sx.year)}
                style={{ backgroundColor: palette.primary }}
              >
                {year}
              </p>
            </div>
            <div className={sx.alignRight}>
              <Conditional condition={!!url}>
                <Link
                  href={url || ''}
                  className={sx.link}
                >
                  <OpenRegular className={sx.icon} />
                  <p className={sx.body1}>{urlLabel}</p>
                </Link>
              </Conditional>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
