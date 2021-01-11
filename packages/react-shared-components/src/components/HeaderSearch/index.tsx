import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';
import useMergeValue from 'use-merge-value';
import { AutoCompleteProps } from 'antd/es/auto-complete';
import React, { useRef } from 'react';
import classNames from 'classnames';
import { useFela } from "react-fela";

export interface HeaderSearchProps {
  onSearch?: (value?: string) => void;
  onChange?: (value?: string) => void;
  onVisibleChange?: (b: boolean) => void;
  className?: string;
  placeholder?: string;
  options: AutoCompleteProps['options'];
  defaultOpen?: boolean;
  open?: boolean;
  defaultValue?: string;
  value?: string;
}

const HeaderSearch: React.FC<HeaderSearchProps> = (props) => {
  const {
    className,
    defaultValue,
    onVisibleChange,
    placeholder,
    open,
    defaultOpen,
    ...restProps
  } = props;

  const inputRef = useRef<Input | null>(null);
  const { css, theme } = useFela();
  const [value, setValue] = useMergeValue<string | undefined>(defaultValue, {
    value: props.value,
    onChange: props.onChange,
  });

  const [searchMode, setSearchMode] = useMergeValue(defaultOpen || false, {
    value: props.open,
    onChange: onVisibleChange,
  });

  const inputClass = classNames('input', {
    ['show']: searchMode,
  });

  return (
    <div
      className={css(styleSheet.heaaderStyles)}
      onClick={() => {
        setSearchMode(true);
        if (searchMode && inputRef.current) {
          inputRef.current.focus();
        }
      }}
      onTransitionEnd={({ propertyName }) => {
        if (propertyName === 'width' && !searchMode) {
          if (onVisibleChange) {
            onVisibleChange(searchMode);
          }
        }
      }}
    >
      <SearchOutlined
        key="Icon"
        style={{
          cursor: 'pointer',
        }}
      />
      <AutoComplete
        key="AutoComplete"
        className={inputClass}
        value={value}
        style={{
          height: 28,
          marginTop: -6,
        }}
        options={restProps.options}
        onChange={setValue}
      >
        <Input
          ref={inputRef}
          defaultValue={defaultValue}
          aria-label={placeholder}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (restProps.onSearch) {
                restProps.onSearch(value);
              }
            }
          }}
          onBlur={() => {
            setSearchMode(false);
          }}
        />
      </AutoComplete>
    </div>
  );
};

export default HeaderSearch;
const styleSheet: any = {
  heaaderStyles: ({theme, layout}) => ({
    "& .headerSearch": {
      '& .input': {
        'width': 0,
        'min-width': 0,
        'overflow': 'hidden',
        'background': 'transparent',
        'border-radius': 0,
        '& :global(.ant-select-selection)': {
          'background': 'transparent'
        }
      }
    },
    '& input': {
      'padding-right': 0,
     'padding-left': 0,
      'border': 0,
      'box-shadow': 'none !important'
    },
    '&, &:hover, &:focus': {
      'border-bottom': '1px solid @border-color-base'
    },
    '&.show': {
      'width': '210px',
      'margin-left': '8px'
    }
  })
};
