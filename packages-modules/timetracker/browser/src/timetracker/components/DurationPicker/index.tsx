import React from 'react';
import { TimePicker, DatePicker } from 'antd';
const { RangePicker } = TimePicker;

interface IDurationPickerProps {}

export default function DurationPicker(props: IDurationPickerProps) {
  return (
    <>
      <RangePicker format="HH:mm" />
      <DatePicker />
    </>
  );
}
