import React, { useCallback, useState } from 'react';

import { useRecoilValue } from 'recoil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faArrowUpRightFromSquare, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';

// Internal Imports
import { CheckRegular, CheckmarkCircleRegular, ClipboardRegular } from '@fluentui/react-icons';
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

  const [hover, setHover] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const palette = useRecoilValue(themePaletteState);

  const navKey = `ActionButton-${label.toUpperCase()}`;

  const handleLink = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    if (method === 'newtab') {
      window.open(href, '_blank');
    } else if (method === 'email') {
      window.open(href);
    }
  };

  const handleCopy = useCallback((e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    if (!navigator.clipboard) {
      console.error('Clipboard API not supported');
      return;
    }
    setCopied(true);
    const copyValue = method === 'newtab' ? href : value;
    navigator.clipboard.writeText(copyValue).catch((err) => console.error(err));
    setTimeout(() => setCopied(false), 2000);
  }, [href, value, method]);

  return (
    <div
      className={sx.action}
      onFocus={() => {}}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={sx.iconRow}
        style={{
          width: hover ? '48px' : 'calc(100%)',
        }}
      >
        <button
          type="button"
          aria-label={`open-link-${label}`}
          className={sx.iconContainer}
          style={{
            scale: hover ? '0.75' : '1',
            backgroundColor: hover ? 'white' : palette.secondary,
          }}
          onClick={handleLink}
        >
          <div className={cn(sx.iconWrapper, !hover ? sx.hidden : sx.visible)}>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={sx.icon} />
          </div>
          <div className={cn(sx.iconWrapper, hover ? sx.hidden : sx.visible)}>
            <FontAwesomeIcon icon={icon} className={sx.icon} />
          </div>
        </button>
      </div>
      <div className={sx.labelRow}>
        <button
          type="button"
          aria-label={`open-link-${label}`}
          className={cn(
            sx.labelContainer,
            hover ? sx.hover : sx.nohover,
          )}
          style={{ transform: hover ? 'translateX(0)' : 'translateX(20px)' }}
          onClick={handleLink}
        >
          <div
            style={{ zIndex: 0 }}
            className={cn(
              sx.labelWrapper,
              !hover ? sx.hidden : sx.visible,
              hover ? sx.hover : sx.nohover,
            )}
          >
            <h3 className={cn(
              sx.head3,
              sx.smaller,
              sx.label,
              !hover ? sx.hidden : sx.visible,
            )}
            >
              OPEN LINK
            </h3>
          </div>
          <div
            style={{ zIndex: 10 }}
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
        </button>
      </div>
      <div
        className={cn(
          sx.drawer,
          hover ? sx.hover : sx.nohover,
        )}
      >
        <button
          type="button"
          aria-label={`copy-clipboard-${label}`}
          className={cn(
            sx.labelContainer,
            hover ? sx.hover : sx.nohover,
          )}
          style={{ transform: hover ? 'translateX(0)' : 'translateX(20px)' }}
          onClick={handleCopy}
        >
          <div
            style={{ zIndex: 0 }}
            className={cn(
              sx.labelWrapper,
              sx.value,
              copied ? sx.showCopied : '',
              hover ? sx.hover : sx.nohover,
            )}
          >
            <p className={sx.body1}>{value}</p>
          </div>
          <div
            style={{ zIndex: 10 }}
            className={cn(
              sx.labelWrapper,
              sx.copyOverlay,
              copied ? sx.showCopied : '',
            )}
          >
            <ClipboardRegular fontSize={18} />
            <p className={sx.body1}>Copy to Clipboard</p>
          </div>
          <div
            style={{ zIndex: 15 }}
            className={cn(
              sx.labelWrapper,
              sx.copiedOverlay,
              copied ? sx.showCopied : '',
            )}
          >
            <CheckmarkCircleRegular fontSize={18} />
            <p className={sx.body1}>Copied!</p>
          </div>
        </button>
      </div>
    </div>
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
