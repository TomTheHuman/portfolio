import React, { useState, useEffect, useRef } from 'react';

// External Imports
import Link from 'next/link';
import { CircularProgress, Divider } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';

// Internal Imports
import Image from 'next/image';
import { colors, work } from '../utils/Info';
import sx from '../styles/pages/Work.module.scss';
import Button from '../components/Button';
import { Shape } from '../components/Shape';

interface INextButtonProps {
  next: () => void;
  label: string;
}

function NextButton(props: INextButtonProps): JSX.Element {
  const { next, label } = props;
  const [prog, setProg] = useState<number>(0);
  const [hover, setHover] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const addProg = (): void => {
    setProg((prevProg) => {
      if (prevProg === 100) {
        return 0;
      }
      return prevProg + 1;
    });
  };

  const startTimer = (): void => {
    const timeout = 300; // 300ms per percent of progress: 30s
    intervalRef.current = setInterval(addProg, timeout);
  };

  const stopTimer = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const nextProgress = (): JSX.Element => (
    <div className={sx.nextProgress}>
      <CircularProgress
        value={prog}
        variant="determinate"
        className={sx.progCircle}
        style={{
          opacity: '0.6',
          color: hover ? colors.navy : colors.yellow,
        }}
        size={20}
      />
      <NavigateNext
        className={sx.nextIcon}
        fontSize="small"
        style={{
          color: hover ? colors.navy : colors.yellow,
        }}
      />
    </div>
  );

  const buttonContent = (): JSX.Element => (
    <div className={sx.buttonContent}>
      <p
        id={sx.label}
        className={sx.body1}
      >
        {`Next: ${label}`}
      </p>
      {nextProgress()}
    </div>
  );

  useEffect(() => {
    if (prog === 100) {
      next();
    }
  }, [prog]);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  const onHover = (): void => {
    setHover(true);
    stopTimer();
  };

  const onNoHover = (): void => {
    setHover(false);
    startTimer();
  };

  return (
    <Button
      size="medium"
      render={buttonContent()}
      handleClick={next}
      handleMouseEnter={onHover}
      handleMouseLeave={onNoHover}
      className={sx.nextProject}
    />
  );
}

/** Technology Chip Props */
interface IChipProps {
  label: string;
}

/**
 * Technology chip component
 * @param { IChipProps } props
 * @returns { JSX.Element }
 */
function Chip(props: IChipProps): JSX.Element {
  const { label } = props;
  return (
    <div className={sx.chip}>
      <p className={sx.body2}>{label}</p>
    </div>
  );
}

/**
 * Work page component, a showcase of note-worthy projects I've worked on
 * @returns {JSX.Element} work page component
 */
export default function Work(): JSX.Element {
  const { text, projects, shapes } = work;
  const [current, setCurrent] = useState<number>(0);

  const nextIndex = (): number => {
    const { length } = projects;
    const next = current + 1;

    if (next === length) {
      return 0;
    }
    return next;
  };

  const currentProject = projects[current];
  const nextProject = projects[nextIndex()];

  const onNext = (): void => {
    setCurrent(nextIndex());
  };

  return (
    <div className={sx.root}>
      <div className={sx.header}>
        <h2 className={sx.head2}>{text.title}</h2>
        <NextButton
          key={nextProject.key}
          next={onNext}
          label={nextProject.title}
        />
      </div>
      <div className={sx.body}>
        <div className={sx.details}>
          <h1 className={sx.head1}>
            {currentProject.title}
          </h1>
          <div id={sx.description}>
            {currentProject.description.split('<br>').map((p, i) => (
              <p
                key={`paragraph-${i}`}
                className={sx.body1}
              >
                {p}
              </p>
            ))}
          </div>
          {currentProject.link && (
            <Link href={currentProject.link}>
              {currentProject.link}
            </Link>
          )}
          <Divider />
          <h3
            id={sx.techHead}
            className={sx.head3}
          >
            Technologies
          </h3>
          <div id={sx.techChips}>
            {currentProject.technologies.map((name) => (
              <Chip key={name} label={name} />
            ))}
          </div>
        </div>
        <div className={sx.graphic}>
          <div className={sx.row}>
            <Shape
              id={sx.topLeft}
              shape={shapes.top.left}
              orientation="horizontal"
            />
            <Shape
              id={sx.topRight}
              shape={shapes.top.right}
              orientation="horizontal"
            />
          </div>
          <div id={sx.gallery}>
            <Image
              src={currentProject.image.path}
              alt={currentProject.image.label}
              width="240px"
              height="140px"
              layout="responsive"
              loading="eager"
              unoptimized
              priority
            />
          </div>
          <div className={sx.row}>
            <Shape
              id={sx.bottomLeft}
              shape={shapes.bottom.left}
              orientation="horizontal"
            />
            <Shape
              id={sx.bottomMiddle}
              shape={shapes.bottom.middle}
              orientation="horizontal"
            />
            <Shape
              id={sx.bottomRight}
              shape={shapes.bottom.right}
              orientation="horizontal"
            />
          </div>
        </div>
      </div>

    </div>
  );
}
