import React, { ReactElement } from 'react';

export const cn = (...classNames: string[]) => classNames.join(' ');

interface ConditionalProps {
  condition: boolean;
  fallback?: ReactElement;
  children: ReactElement | ReactElement[];
}

export const Conditional: React.FC<ConditionalProps> = (
  { condition, fallback, children },
) => (condition ? children : fallback || null);
