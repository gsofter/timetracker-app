import React, { useEffect, useState } from 'react';
import { formatDuration, stringToDuration } from '../../services/timeRecordService';
import { Input } from 'antd';
import { useRifm } from 'rifm';

const parseDigits = string => (string.match(/\d+/g) || []).join('');

const formatTimeString = (str: string) => {
  let len = str.length;
  if (len === 0) return '00';
  if (len === 1) return '0' + str;
  return parseInt(str) >= 60 ? '00' : str;
};

const formatDurationInput = (dur: string) => {
  const digits = parseDigits(dur) as string;
  const len = digits.length;
  let sec = digits.slice(len - 2, len);
  let second = formatTimeString(sec);

  let min = len > 2 ? digits.slice(len - 4, len - 2) : '00';
  let minute = formatTimeString(min);

  let hr = len > 4 ? digits.slice(len - 6, len - 4) : '00';
  let hour = hr.length === 0 ? '00' : hr.length === 1 ? '0' + hr : hr;

  return hour + ':' + minute + ':' + second;
};

interface IDurationInputProps {
  duration?: Number;
  onChange?: Function;
}

export default function DurationInput(props: IDurationInputProps) {
  const { duration, onChange } = props;

  const [inputStr, setInputStr] = useState('');
  useEffect(() => {
    if (duration === undefined) setInputStr('');
    else setInputStr(formatDurationInput(Number(duration).toString()));
  }, [duration]);

  const handleChangeDuration = event => {
    setInputStr(event.target.value);
  };

  const onPressEnter = event => {
    console.log('onEnter', event.target.value);
    if (event.target.value === '') setInputStr('');
    else setInputStr(formatDurationInput(event.target.value));
    console.log(
      'stringToDuration(formatDurationInput(event.target.value)',
      stringToDuration(formatDurationInput(event.target.value)),
    );
    onChange(stringToDuration(formatDurationInput(event.target.value)));
  };

  const onBlur = event => {
    console.log('onEnter', event.target.value);
    if (event.target.value === '') setInputStr('');
    else {
      const newDur = formatDurationInput(event.target.value);
      const originDur = formatDurationInput(duration.toString());
      if (newDur === originDur) {
        // no need to change
      } else {
        setInputStr(formatDurationInput(event.target.value));
        onChange(stringToDuration(formatDurationInput(event.target.value)));
      }
    }
  };

  const rifm = useRifm({
    value: inputStr,
    onChange: handleChangeDuration,
    format: formatDurationInput,
    accept: /\d+/g,
    mask: formatDuration(duration as number).length < 9,
  });

  return (
    <Input
      onChange={handleChangeDuration}
      value={inputStr}
      onPressEnter={onPressEnter}
      onBlur={onBlur}
    />
  );
}