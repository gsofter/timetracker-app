import { CheckOutlined } from '@ant-design/icons';

import { Tooltip } from 'antd';

import React from 'react';
import { genThemeToString } from '../utils/utils';
import {useFela} from 'react-fela';

export interface TagProps {
  color: string;
  check: boolean;
  className?: string;
  onClick?: () => void;
}

const Tag: React.FC<TagProps> = React.forwardRef(({ color, check, ...rest }, ref) => (
  <div {...rest} style={{ backgroundColor: color }} ref={ref as any}>
    {check ? <CheckOutlined /> : ''}
  </div>
));

export interface ThemeColorProps {
  colors?: {
    key: string;
    color: string;
  }[];
  value: string;
  onChange: (color: string) => void;
  formatMessage: (data: { id: any; defaultMessage?: string }) => string;
}

const ThemeColor: React.ForwardRefRenderFunction<HTMLDivElement, ThemeColorProps> = (
  { colors, value, onChange, formatMessage },
  ref,
  ) => {
    const colorList = colors || [];
    if (colorList.length < 1) {
      return null;
    }
  return (
    <div 
    className={styleSheet.themeColor} 
    ref={ref}>
      <div className="theme-color-content">
        {colorList.map(({ key, color }) => {
          const themeKey = genThemeToString(key);
          return (
            <Tooltip
              key={color}
              title={
                themeKey
                  ? formatMessage({
                      id: `app.setting.themecolor.${themeKey}`,
                    })
                  : key
              }
            >
              <Tag
                className="theme-color-block"
                color={color}
                check={value === key || genThemeToString(value) === key}
                onClick={() => onChange && onChange(key)}
              />
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default React.forwardRef(ThemeColor);

const styleSheet:any = {
  themeColor: (props) => ( 
    {
      marginTop: '24px',
      overflow: 'hidden',
      '> .themeColorTitle': 
      {
        marginBottom: '12px',
        fontSize: '14px',
        lineHeight: '22px',
      },
      '> .theme-color-block': {
        float: 'left',
        width: '20px',
        height: '20px',
        marginRight: '8px',
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: '2px',
        cursor: 'pointer',
      }
    }
  ),
}