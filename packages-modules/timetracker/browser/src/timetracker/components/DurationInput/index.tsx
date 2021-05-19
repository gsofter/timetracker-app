import React, { useEffect, useState } from 'react';
import { formatDuration, stringToDuration, getSecsFromString } from '../../services/timeRecordService';
import { Input } from 'antd';

/**
 * Convert input string to time formatted
 * @param dur
 * @returns string
 */
const formatDurationInput = (dur: string) => {
  const secs = getSecsFromString(dur);
  return formatDuration(secs);
};

interface IDurationInputProps {
  duration?: Number;
  disabled?: boolean;
  onChange?: Function;
}

export default function DurationInput(props: IDurationInputProps) {
  const { duration, onChange, disabled } = props;

  const [inputStr, setInputStr] = useState('');
  useEffect(() => {
    if (duration === undefined) setInputStr('');
    else setInputStr(formatDuration(duration as number));
  }, [duration]);

  const handleChangeDuration = (event) => {
    setInputStr(event.target.value);
  };

  const onPressEnter = (event) => {
    if (event.target.value === '') setInputStr('');
    else setInputStr(formatDurationInput(event.target.value));
    onChange(stringToDuration(formatDurationInput(event.target.value)));
  };

  const onBlur = (event) => {
    const newDur = formatDurationInput(event.target.value);
    const originDur = formatDuration(duration as number);
    if (event.target.value === '' && duration === undefined) setInputStr('');
    else if (event.target.value === '' && duration !== undefined) {
      // need to submit change
      setInputStr(formatDurationInput(event.target.value));
      onChange(stringToDuration(formatDurationInput(event.target.value)));
    } else {
      if (newDur === originDur) {
        // no need to submit change
        setInputStr(formatDurationInput(event.target.value));
      } else {
        // need to submit change
        setInputStr(formatDurationInput(event.target.value));
        onChange(stringToDuration(formatDurationInput(event.target.value)));
      }
    }
  };

  return (
    <Input
      onChange={handleChangeDuration}
      value={inputStr}
      onPressEnter={onPressEnter}
      onBlur={onBlur}
      disabled={disabled}
    />
  );
}
