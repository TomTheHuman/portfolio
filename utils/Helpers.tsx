import React, { ReactNode } from 'react';

export const cn = (...classNames: string[]) => classNames.join(' ');

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
