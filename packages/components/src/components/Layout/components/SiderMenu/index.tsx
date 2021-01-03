import React, { useEffect } from 'react';
import { Drawer } from 'antd';
import classNames from 'classnames';
import Omit from 'omit.js';
import { getFlatMenus } from '@umijs/route-utils';

import SiderMenu, { PrivateSiderMenuProps, SiderMenuProps } from './SiderMenu';
import MenuCounter from './Counter';
import { styleSheet } from './styles';
import { useFela } from 'react-fela';

const SiderMenuWrapper: React.FC<SiderMenuProps & PrivateSiderMenuProps> = props => {
  const {
    isMobile,
    menuData,
    siderWidth,
    collapsed,
    onCollapse,
    style,
    className,
    hide,
    getContainer,
    prefixCls,
    matchMenuKeys,
  } = props;

  const { setFlatMenuKeys } = MenuCounter.useContainer();

  useEffect(() => {
    if (!menuData || menuData.length < 1) {
      return () => null;
    }
    // 当 menu data 改变的时候重新计算这两个参数
    const newFlatMenus = getFlatMenus(menuData);
    const animationFrameId = requestAnimationFrame(() => {
      setFlatMenuKeys(Object.keys(newFlatMenus));
    });
    return () => window.cancelAnimationFrame && window.cancelAnimationFrame(animationFrameId);
  }, [matchMenuKeys.join('-')]);

  useEffect(() => {
    if (isMobile === true) {
      if (onCollapse) {
        onCollapse(true);
      }
    }
  }, [isMobile]);

  const omitProps = Omit(props, ['className', 'style']);
  const { css } = useFela({ prefixCls });
  if (hide) {
    return null;
  }

  const felaSylts = css(styleSheet.siderMenuStyles as any);

  return isMobile ? (
    <Drawer
      visible={!collapsed}
      placement="left"
      className={classNames(`${prefixCls}-drawer-sider`, className)}
      onClose={() => onCollapse && onCollapse(true)}
      style={{
        padding: 0,
        height: '100vh',
        ...style,
      }}
      getContainer={getContainer}
      width={siderWidth}
      bodyStyle={{ height: '100vh', padding: 0, display: 'flex', flexDirection: 'row' }}
    >
      {/* SideMenu-Wrapper: For inspecting element to adjust css, it will be removed for at version */}
      <div className={classNames('SideMenu-Wrapper-Mobile', css(styleSheet.siderMenuStyles as any))}>
        <SiderMenu
          {...omitProps}
          className={classNames(`${prefixCls}-sider`, className)}
          collapsed={isMobile ? false : collapsed}
          splitMenus={false}
        />
      </div>
    </Drawer>
  ) : (
      <div className={classNames('SideMenu-Wrapper', css(styleSheet.siderMenuStyles as any))}>
        <SiderMenu
          className={classNames(`${prefixCls}-sider`, className)}
          {...omitProps}
          style={style}
        />
      </div>
    );
};

SiderMenuWrapper.defaultProps = {
  onCollapse: () => undefined,
};

export default SiderMenuWrapper;
