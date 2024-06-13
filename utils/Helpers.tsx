import React, { ReactNode } from 'react';

/** Concatenate class name variables */

export const cn = (...classNames: string[]) => classNames.join(' ');

/** More elegant conditional rendering component */

interface ConditionalProps {
  condition: boolean;
  fallback?: ReactNode;
  children: ReactNode;
}

export const Conditional: React.FC<ConditionalProps> = (
  { condition, fallback, children },
) => (
  <>
    {condition ? children : fallback || null}
  </>
);
