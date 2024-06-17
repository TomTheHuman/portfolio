import React, { useState } from 'react';

import { useRecoilValue } from 'recoil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faArrowUpRightFromSquare, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';

// Internal Imports
import sx from '../styles/Contact.module.scss';
import { themePaletteState } from '../utils/State';
import { cn } from '../utils/Helpers';
import AnimatedTitle from '../components/Animated/AnimatedTitle';
import { AnimatedText } from '../components/Animated/AnimatedText';

interface IActionButtonProps {
  label: string;
  index: number;
  icon: IconDefinition;
  value: string;
  method: 'newtab' | 'email';
  href: string;
}

const ActionButton = (props: IActionButtonProps): React.ReactElement => {
  const {
    label, value, href, method, index, icon,
  } = props;

  const [hover, setHover] = useState<boolean>(label === 'github');
  const palette = useRecoilValue(themePaletteState);

  const navKey = `ActionButton-${label.toUpperCase()}`;

  const handleLink = (): void => {
    if (method === 'newtab') {
      window.open(href, '_blank');
    } else if (method === 'email') {
      window.open(href);
    }
  };

  return (
    <button
      type="button"
      className={sx.action}
      onFocus={() => {}}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label="action-link"
    >
      <div
        className={sx.iconRow}
        style={{
          width: hover ? 'calc(100%)' : '48px',
        }}
      >
        <div
          className={sx.iconContainer}
          style={{
            scale: hover ? '0.75' : '1',
            backgroundColor: hover ? 'white' : palette.secondary,
          }}
        >
          <div className={cn(sx.iconWrapper, !hover ? sx.hidden : sx.visible)}>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={sx.icon} />
          </div>
          <div className={cn(sx.iconWrapper, hover ? sx.hidden : sx.visible)}>
            <FontAwesomeIcon icon={icon} className={sx.icon} />
          </div>
        </div>
      </div>
      <div className={sx.labelRow}>
        <div
          className={cn(
            sx.labelContainer,
            hover ? sx.hover : sx.nohover,
          )}
          style={{ transform: hover ? 'translateX(0)' : 'translateX(20px)' }}
        >
          <div
            style={{ zIndex: 0 }}
            className={cn(
              sx.labelWrapper,
              !hover ? sx.hidden : sx.visible,
              hover ? sx.hover : sx.nohover,
            )}
          >
            <AnimatedText
              initial
              initialDelay={50}
              className={cn(
                sx.head3,
                sx.smaller,
                sx.label,
                !hover ? sx.hidden : sx.visible,
              )}
              text="OPEN"
            />
          </div>
          <div
            style={{ zIndex: 10, filter: hover ? 'brightness(120%)' : 'unset' }}
            className={cn(
              sx.labelWrapper,
              hover ? sx.hidden : sx.visible,
              hover ? sx.hover : sx.nohover,
            )}
          >
            <AnimatedText
              initial
              initialDelay={200}
              initialDuration={200}
              exit
              exitDelay={0}
              className={cn(
                sx.head3,
                sx.smaller,
                sx.label,
                hover ? sx.hidden : sx.visible,
              )}
              navKey={navKey}
              text={label}
              initialStaggerDelay={200}
              exitStaggerDelay={100}
              staggerDelayIndex={index}
            />
          </div>
        </div>
      </div>
      <div
        className={cn(
          sx.labelRow,
          sx.drawer,
          hover ? sx.hover : sx.nohover,
        )}
      >
        <div
          className={cn(
            sx.labelContainer,
            hover ? sx.hover : sx.nohover,
          )}
          style={{ transform: hover ? 'translateX(0)' : 'translateX(20px)' }}
        >
          <div
            style={{ zIndex: 0 }}
            className={cn(
              sx.labelWrapper,
              !hover ? sx.hidden : sx.visible,
              hover ? sx.hover : sx.nohover,
            )}
          >
            <p className={sx.body1}>{value}</p>
          </div>
        </div>
      </div>
    </button>
  );
};

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
          <AnimatedTitle
            title="GET IN TOUCH"
            key="getInTouch"
            navKey="getInTouch"
            animateText
            exit
          />
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
            <div className={sx.divider} style={{ backgroundColor: palette.primary }} />
            <div>
              <p className={sx.body1}>
                Thank you for stopping by. If you like what you see
                and want to check out more of my work, or want to contact me, links are below.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={sx.links}>
        <ActionButton
          label="linkedin"
          value="linkedin.com/in/thomaslshaw"
          href="https://www.linkedin.com/in/thomaslshaw"
          method="newtab"
          index={0}
          icon={faLinkedin}
        />
        <ActionButton
          label="github"
          value="github.com/tomthehuman"
          href="https://www.github.com/tomthehuman"
          method="newtab"
          index={1}
          icon={faGithubSquare}
        />
        <ActionButton
          label="email"
          value="thomas@tomthehuman.com"
          href="mailto:thomas@tomthehuman.com"
          method="email"
          index={2}
          icon={faEnvelope}
        />
      </div>
    </div>
  );
}
