import { CheckOutlined } from "@ant-design/icons";

import { Tooltip } from "antd";

import React from "react";
import { genThemeToString } from "../utils/utils";
import { useFela } from "react-fela";
import { styleSheet } from './ThemeColorStyles';
export interface TagProps {
  color: string;
  check: boolean;
  className?: string;
  style?: any;
  onClick?: () => void;
}

const Tag: React.FC<TagProps> = React.forwardRef(({ color, check, ...rest }, ref) => (
  <div {...rest} style={{ backgroundColor: color }} ref={ref as any}>
    {check ? <CheckOutlined /> : ''}
  </div>
));

export type ThemeColorProps = {
  colors?: {
    key: string;
    color: string;
  }[];
  value: string;
  onChange: (color: string) => void;
  formatMessage: (data: { id: any; defaultMessage?: string }) => string;
};

const ThemeColor: React.ForwardRefRenderFunction<HTMLDivElement, ThemeColorProps> = (
  { colors, value, onChange, formatMessage },
  ref,
) => {
  const colorList = colors || [];
  if (colorList.length < 1) {
    return null;
  }
  const { css } = useFela();
  return (
    <div className={css(styleSheet.settingDrawerContent as any)}>
      <div className="theme-color" ref={ref}>
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
                  check={value === key || genThemeToString(value) === key}
                  onClick={() => onChange && onChange(key)}
                />
              </Tooltip>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(ThemeColor);