import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import {useFela} from 'react-fela';

import { SiderMenuProps, defaultRenderLogoAndTitle } from '../SubMenu3/SiderMenu';

import BaseMenu from '../SubMenu3/BaseMenu';
import { HeaderViewProps } from '../Header';

export type TopNavHeaderProps = SiderMenuProps & {
  logo?: React.ReactNode;
  onCollapse?: (collapse: boolean) => void;
  rightContentRender?: HeaderViewProps['rightContentRender'];
};

/**
 * 抽离出来是为了防止 rightSize 经常改变导致菜单 render
 * @param param0
 */
const RightContent: React.FC<TopNavHeaderProps> = ({ rightContentRender, ...props }) => {
  const [rightSize, setRightSize] = useState<number | string>('auto');
  const {css} = useFela(props);

  return (
    <div
      className={css(styleSheet.widthRightSize)}
    >
      <div
        className={css(styleSheet.displayFlex)}
      >
        <ResizeObserver
          onResize={({ width }: { width: number }) => {
            if (!width) {
              return;
            }
            setRightSize(width);
          }}
        >
          {rightContentRender && (
            <div>
              {rightContentRender({
                ...props,
              })}
            </div>
          )}
        </ResizeObserver>
      </div>
    </div>
  );
};

const TopNavHeader: React.FC<TopNavHeaderProps> = (props) => {
  const ref = useRef(null);
  const {
    theme,
    onMenuHeaderClick,
    contentWidth,
    rightContentRender,
    className: propsClassName,
    // style,
    layout,
  } = props;

  const baseClassName = 'ant-pro-top-nav-header';
  const headerDom = defaultRenderLogoAndTitle(
    { ...props, collapsed: false },
    layout === 'mix' ? 'headerTitleRender' : undefined,
  );

  const className = classNames(baseClassName, propsClassName, {
    light: theme === 'light',
  });

  return (
    <div className={className}>
      <div ref={ref} className={`${baseClassName}-main ${contentWidth === 'Fixed' ? 'wide' : ''}`}>
        {headerDom && (
          <div className={`${baseClassName}-main-left`} onClick={onMenuHeaderClick}>
            <div className={`${baseClassName}-logo`} key="logo" id="logo">
              {headerDom}
            </div>
          </div>
        )}
        <div className={`css(styleSheet.displayFlex) ${baseClassName}-menu`}>
          <BaseMenu {...props} {...props.menuProps} />
        </div>
        {rightContentRender && <RightContent rightContentRender={rightContentRender} {...props} />}
      </div>
    </div>
  );
};

export default TopNavHeader;

const styleSheet:any = {
  widthRightSize: props => (
    {
      minWidth: 'rightSize'
    }
  ),

  displayFlex: props => (
    {
      flex: '1' 
    }
  ),
  paddingRight: props => (
    {
      paddingRight: 8,
    }
  )
}