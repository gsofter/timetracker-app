import React from 'react';
import Swipe from 'react-easy-swipe';

export interface ISwipe {
  isMobile?: any;
  children?: any;
  className?: any;
  onSwipeMove?: any;
  rest?: any;
}

export const CustomSwipe: React.FC<ISwipe> = ({
  isMobile,
  children,
  className,
  onSwipeMove,
  rest,
}) =>
  isMobile ? (
    <Swipe className={className} onSwipeMove={onSwipeMove} {...rest}>
      {children}
    </Swipe>
  ) : (
    children
  );
