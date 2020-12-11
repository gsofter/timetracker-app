import React, { useState, useEffect, useRef } from 'react';
import { useFela } from 'react-fela';

export interface ICalenderPopup {
  timeFormat?: any;
  vocabulary?: any;
  firstDayOfWeek?: any;
  createRefCallback: any;
}

export const CalendarPopup: React.FC<ICalenderPopup> = (props) => {
  const { css } = useFela(props);
  const editTaskPopupRef = useRef(null);

  useEffect(() => {
    const { createRefCallback } = props;
    createRefCallback(editTaskPopupRef);
  }, []);

  return (
    // tslint:disable-next-line: no-use-before-declare
    <div className={css(styleSheet.CalenderPopup)}>
      <div ref={editTaskPopupRef} className="edit-task-popup">
        <h2>Edit modal data</h2>
      </div>
    </div>
  );
};

const styleSheet: any = {
  CalenderPopup: (props) => ({
    position: 'relative',
    '& .edit-task-popup': {
      display: 'block',
      position: 'absolute',
      top: '130%',
      right: '0',
      backgroundColor: 'white',
      borderRadius: '0.4rem',
      color: 'black',
      zIndex: '1',
      animation: 'slowVisibility 0.3s',
      padding: '20px',
    },
  }),
};
