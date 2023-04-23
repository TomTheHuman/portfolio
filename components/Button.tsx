import React, { useEffect, useRef, useState } from 'react';

// Internal Imports
import { colors } from 'utils/Info';
import sx from '../styles/components/Button.module.scss';

interface IButtonProps {
  /** Text to display in button */
  label: string;
  /** Sets the button size. Default 'medium' */
  size?: 'small' | 'medium' | 'large';
  /** Action to perform when button is clicked */
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * Reusable custom button element styled with slide-on-hover animation
 * @param { IButtonProps } props
 * @returns { JSX.Element } styled button
 */
export default function Button(props: IButtonProps): JSX.Element {
  const { label, size, handleClick } = props;
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
  const buttonStyle = (
    hover ? {
      color: colors.navy,
      boxShadow: `inset ${width}px 0 0 0 ${colors.yellow}`,
    } : { color: colors.white }
  );

  return (
    <button
      type="button"
      ref={ref}
      id={buttonId()}
      className={sx.root}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={buttonStyle}
    >
      {label}
    </button>
  );
}
