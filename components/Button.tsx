import React, { useEffect, useRef, useState } from 'react';

// Internal Imports
import { colors } from 'utils/Info';
import cn from '../utils/Styling';
import sx from '../styles/components/Button.module.scss';

interface IButtonProps {
  /** Text to display in button */
  render: string | JSX.Element;
  /** Custom class name override */
  className?: string;
  /** Sets the button size. Default 'medium' */
  size?: 'small' | 'medium' | 'large';
  /** Sets width to fill parent container */
  fill?: boolean;
  /** Action to perform when button is clicked */
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  /** Action to perform on mouse enter */
  handleMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  /** Action to perform on mouse leave */
  handleMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * Reusable custom button element styled with slide-on-hover animation
 * @param { IButtonProps } props
 * @returns { JSX.Element } styled button
 */
export default function Button(props: IButtonProps): JSX.Element {
  const {
    render, size, fill, className, handleClick, handleMouseEnter, handleMouseLeave,
  } = props;
  const ref = useRef<HTMLButtonElement>(null);
  const [hover, setHover] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);

  /** Sets button width in state to use for inset animation */
  useEffect(() => {
    if (ref.current) {
      const { offsetWidth } = ref.current;
      setWidth(offsetWidth);
    }
  }, [ref]);

  /** Applies dynamic styles based on size */
  const buttonId = () => {
    switch (size) {
      case 'small':
        return sx.small;
      case 'medium':
        return sx.medium;
      case 'large':
        return sx.large;
      default:
        return sx.medium;
    }
  };

  /** Enables box shadow animation on hover */
  const buttonStyle = {
    width: fill ? '100%' : '',
    color: hover ? colors.navy : colors.white,
    boxShadow: hover ? `inset ${width}px 0 0 0 ${colors.yellow}` : 'unset',
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setHover(true);
    if (handleMouseEnter) {
      handleMouseEnter(e);
    }
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setHover(false);
    if (handleMouseLeave) {
      handleMouseLeave(e);
    }
  };

  const classNameStr = (): string => {
    if (className) {
      return cn([className, sx.root]);
    }
    return sx.root;
  };

  return (
    <button
      type="button"
      ref={ref}
      id={buttonId()}
      className={classNameStr()}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={buttonStyle}
    >
      {render}
    </button>
  );
}
