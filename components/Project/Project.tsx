import React, { useState } from 'react';

// External Imports

// Internal Imports
import { ImageShadowRegular, OpenRegular } from '@fluentui/react-icons';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { Spinner } from '@fluentui/react-components';
import sx from './Project.module.scss';
import { AnimatedText, Conditional, cn } from '../../utils/Helpers';
import { themePaletteState } from '../../utils/State';

interface IProjectProps {
  name: string;
  description: string;
  thumbnail: string;
  gallery?: string[];
  projectCreated: Date;
  url?: string;
  urlLabel?: string;
}

interface IThumbnailProps {
  thumbnail: string;
}

const ThumbnailLoading = (): React.ReactElement => {
  const palette = useRecoilValue(themePaletteState);

  return (
    <div className={cn(sx.imageContainer, sx.loading)}>
      <div className={sx.imageWrapper}>
        <Spinner className={sx.spinner} />
      </div>
    </div>
  );
};

const Thumbnail = (props: IThumbnailProps): React.ReactElement => {
  const { thumbnail } = props;
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
          src={thumbnail}
          aria-label={thumbnail}
        />
        <div className={sx.hoverOverlay}>
          <ImageShadowRegular className={sx.icon} />
        </div>
      </div>
    </div>
  );
};

export const ProjectLoading = (): React.ReactElement => (
  <div className={cn(sx.root, sx.loading)}>
    <ThumbnailLoading />
    <div className={sx.textContainer}>
      <div className={sx.name}>
        <AnimatedText
          text="Loading..."
          initial
          indefiniteSlice
          startIndex={7}
          preserveWidth
          className={sx.head3}
        />
      </div>
      <div className={sx.detailsContainer}>
        <div className={sx.description}>
          <span className={sx.placeholder} />
          <span className={sx.placeholder} />
          <span className={sx.placeholder} />
          <span className={sx.placeholder} />
        </div>
        <div className={sx.footer}>
          <div className={sx.alignLeft}>
            <span className={sx.created} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export function Project(props: IProjectProps): React.ReactElement {
  const {
    name, description, thumbnail, gallery, projectCreated, url, urlLabel,
  } = props;

  const palette = useRecoilValue(themePaletteState);

  const formatDateToMonthYear = (date: Date): string => date.toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
    },
  );

  const formattedDate = formatDateToMonthYear(projectCreated);

  return (
    <div className={sx.root}>
      <Thumbnail thumbnail={thumbnail} />
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
                className={cn(sx.body1, sx.created)}
                style={{ backgroundColor: palette.primary }}
              >
                {formattedDate}
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
