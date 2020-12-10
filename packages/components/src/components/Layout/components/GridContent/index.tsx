import React, { useContext, CSSProperties } from 'react';
import classNames from 'classnames';
import { ConfigProvider } from 'antd';

import RouteContext from '../RouteContext';
import { PureSettings } from '../defaultSettings';
import { Properties } from 'csstype'
import { useFela } from 'react-fela'
interface GridContentProps {
  contentWidth?: PureSettings['contentWidth'];
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  prefixCls?: string;
}

/**
 * This component can support contentWidth so you don't need to calculate the width
 * contentWidth=Fixed, width will is 1200
 * @param props
 */
const GridContent: React.FC<GridContentProps> = (props) => {
  const value = useContext(RouteContext);
  const { children, contentWidth: propsContentWidth, className: propsClassName, style } = props;

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = props.prefixCls || getPrefixCls('pro');
  const contentWidth = propsContentWidth || value.contentWidth;
  let className = `${prefixCls}-grid-content`;
  const { css, theme } = useFela();
  return (
    <div className={css(styleSheet.gridContentStyle)}>
      <div
        className={classNames(className, propsClassName, {
          wide: contentWidth === 'Fixed',
        })}
        style={style}
      >
        <div className={`${prefixCls}-grid-content-children`}>{children}</div>
      </div>
    </div>
  );
};

const styleSheet: { [key: string]: (obj) => Properties } = {
  gridContentStyle: ({ theme, primaryColor, layout }) => ({
    display: 'inherit',
    '& .ant-prefix-pro-grid-content': {
      width: '100%',
      '&.wide': {
        maxWidth: '1200px',
        margin: '0 auto',
      }
    }
  })
}
export default GridContent;