import React, { CSSProperties } from 'react';

// Internal Imports
import { IShape } from 'utils/IInfo';
import cn from 'utils/Styling';
import sx from '../styles/components/Shapes.module.scss';

/** Circle Shape Props */
interface ICircleProps {
  id: string;
  shape: IShape;
  className?: string;
}

/**
 * Standardized circle shaped div intended for site decoration
 * @param { ICircleProps } props
 * @returns { JSX.Element } circle div
 */
function Circle(props: ICircleProps): JSX.Element {
  const { id, shape, className } = props;
  const { size, color } = shape;

  return (
    <div
      id={id}
      className={className ? cn([sx.circle, className]) : sx.circle}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
      }}
    />
  );
}

/** Rectangle Shape Props */
interface IRectangleProps {
  id: string;
  shape: IShape;
  round?: boolean;
  className?: string;
  orientation?: 'vertical' | 'horizontal';
}

/**
 * Standardized rectangle shaped div intended for site decoration
 * @param { ICircleProps } props
 * @returns { JSX.Element } rectangle div
 */
export function Rectangle(props: IRectangleProps): JSX.Element {
  const {
    id, shape, round, className, orientation,
  } = props;
  const { size, color } = shape;
  const shapeStyles: CSSProperties = { backgroundColor: color };

  /** Sets shape width/height based on orientation */
  if (orientation === 'horizontal') {
    shapeStyles.height = size;
  } else {
    shapeStyles.width = size;
  }

  /** Adds fully round border radius when 'round' prop true */
  if (round) { shapeStyles.borderRadius = size; }

  return (
    <div
      id={id}
      className={className ? cn([sx.rectangle, className]) : sx.rectangle}
      style={shapeStyles}
    />
  );
}

interface IShapeProps {
  id: string;
  shape: IShape;
  className?: string;
  orientation?: 'vertical' | 'horizontal';
}

export function Shape(props: IShapeProps): JSX.Element {
  const { shape } = props;

  switch (shape.style) {
    case 'circle':
      return <Circle {...props} />;
    case 'rectangle-round':
      return (
        <Rectangle {...props} round />
      );
    default:
      return (
        <Rectangle {...props} />
      );
  }
}
