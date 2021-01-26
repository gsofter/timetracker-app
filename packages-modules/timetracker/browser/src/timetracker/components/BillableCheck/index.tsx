import React from 'react';
import { useFela } from 'react-fela';
import CSS from 'csstype';

interface IBillableCheck {
  onChange: (any) => void;
  checked: boolean;
}

export default function BillableCheck(props: IBillableCheck) {
  const { onChange, checked } = props;
  const { css } = useFela({ checked });
  return (
    <div onClick={onChange} className={css(styles.billable)}>
      <span> $ </span>
    </div>
  );
}

const styles: { [key: string]: (obj) => CSS.Properties } = {
  billable: ({ theme, checked }) => ({
    fontSize: '1rem',
    fontWeight: checked ? 'bold' : 'normal',
    color: checked ? '#1890ff' : '#bbb',
    cursor: 'pointer',
  }),
};
