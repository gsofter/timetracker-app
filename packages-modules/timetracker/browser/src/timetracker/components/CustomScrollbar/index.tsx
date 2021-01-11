import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export interface ICustomScrollbar {
  current?: any;
}

export const CustomScrollbar: React.FC<ICustomScrollbar> = (props: any) => {
  const { children } = props;
  const handleScrollFrame = (values) => {
    const {
      incPaginationAction,
      isFetchingTimeEntriesList,
      getTimeEntriesListPaginationAction,
      pagination,
    } = props;
    const { top } = values;
    if (top > 0.7) {
      if (!isFetchingTimeEntriesList && !pagination.disabled) {
        incPaginationAction();
        getTimeEntriesListPaginationAction();
      }
    }
  };
  const animateScroll = () => {
    const { scrollTo, scrollToAction } = props;

    const top = Scrollbars.current.getScrollTop();

    let startTime = performance.now();
    const animate = (timestamp) => {
      const runtime = timestamp - startTime;
      const progress = runtime / 300;
      const procent = progress >= 0 ? Math.min(progress, 1) : 0;
      Scrollbars.current.scrollTop(procent * (scrollTo + 10) + top);
      if (procent < 1) {
        requestAnimationFrame(animate);
      } else {
        scrollToAction(null);
      }
    };
    requestAnimationFrame(animate);
  };

  return (
    <Scrollbars
      ref={scrollbars}
      children={children}
      onScrollFrame={handleScrollFrame}
    />
  );
};
