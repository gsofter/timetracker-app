import React from 'react';
import { useFela } from 'react-fela';
import CSS from 'csstype';

interface IBillableCheck {
  onChange: () => void;
  disabled?: boolean;
  checked: boolean;
}

export default function BillableCheck(props: IBillableCheck) {
  const { onChange, checked, disabled } = props;
  const { css } = useFela({ checked });
  const handleChange = (e?: any) => {
    if (!disabled) onChange();
  };
  return (
    <div onClick={handleChange} className={css(styles.billable)}>
      <span> $ </span>
    </div>
  );
}

const styles: { [key: string]: (obj) => CSS.Properties } = {
  billable: ({ theme, checked }) => ({
    fontSize: '20px',
    fontWeight: checked ? 'bold' : 'normal',
    color: checked ? '#1890ff' : '#bbb',
    cursor: 'pointer',
  }),
};
