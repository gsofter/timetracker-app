import { CheckOutlined } from "@ant-design/icons";

import { Tooltip } from "antd";

import React from "react";
import { genThemeToString } from "../utils/utils";
import { useFela } from "react-fela";
import { Properties } from 'csstype'
export interface TagProps {
  color: string;
  check: boolean;
  className?: string;
  style?: any;
  onClick?: () => void;
}

const Tag: React.FC<TagProps> = React.forwardRef(
  ({ color, check, ...rest }, ref) => (
    <div {...rest} style={{ backgroundColor: color }} ref={ref as any}>
      {check ? <CheckOutlined /> : ""}
    </div>
  )
);

export interface ThemeColorProps {
  colors?: {
    key: string;
    color: string;
  }[];
  value: string;
  onChange: (color: string) => void;
  formatMessage: (data: { id: any; defaultMessage?: string }) => string;
}

const ThemeColor: React.ForwardRefRenderFunction<
  HTMLDivElement,
  ThemeColorProps
> = ({ colors, value, onChange, formatMessage }, ref) => {
  const colorList = colors || [];
  if (colorList.length < 1) {
    return null;
  }
  const { css } = useFela();
  return (
    <div className={css(styleSheet.themecolor)}>
      <div ref={ref} className="theme-color">
        <div className="theme-color-content">
          {colorList.map(({ key, color }) => {
            const themeKey = genThemeToString(color) || key;
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
                  check={value === color || genThemeToString(value) === color}
                  onClick={() => onChange && onChange(color)}
                />
              </Tooltip>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const styleSheet: { [key: string]: (obj) => Properties } = {

  themecolor: ({ theme, primaryColor, layout }) => ({
    display: 'inherit',
    '& .ant-pro-setting-drawer-content .theme-color': {
      marginTop: '16px',
      overflow: 'hidden',
    },
    '& .ant-pro-setting-drawer-content .theme-color .theme-color-title': {
      marginBottom: '12px',
      fontSize: '14px',
      lineHeight: '22px',
    },
    '& .ant-pro-setting-drawer-content .theme-color .theme-color-block': {
      float: 'left',
      width: '20px',
      height: '20px',
      marginRight: '8px',
      marginTop: '8px',
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
      borderRadius: '2px',
      cursor: 'pointer'
    }
  })
}
export default React.forwardRef(ThemeColor);