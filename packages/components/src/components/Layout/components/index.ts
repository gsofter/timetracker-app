import BasicLayout, { BasicLayoutProps } from './BasicLayout';
import DefaultHeader, { HeaderViewProps as HeaderProps } from './Header';
import TopNavHeader, { TopNavHeaderProps } from './TopNavHeader';

import DefaultFooter, { FooterProps } from './Footer';
import GridContent from './GridContent';
import SettingDrawer, { SettingDrawerProps, SettingDrawerState } from './SettingDrawer';
import PageContainer from './PageContainer';
import RouteContext, { RouteContextType } from './RouteContext';
import getMenuData from './utils/getMenuData';
import getPageTitle from './getPageTitle';
import PageLoading from './PageLoading';
import FooterToolbar from './FooterToolbar';
import BaseMenu from './SiderMenu/BaseMenu'; //@sri added

export type { ProSettings as Settings, ProSettings } from './defaultSettings';

export type { MenuDataItem } from './typings';

const PageHeaderWrapper = PageContainer;

export {
  BasicLayout,
  RouteContext,
  PageLoading,
  GridContent,
  DefaultHeader,
  TopNavHeader,
  DefaultFooter,
  SettingDrawer,
  getPageTitle,
  PageHeaderWrapper,
  getMenuData,
  PageContainer,
  FooterToolbar,
  BaseMenu, //@sri added
  getMenuSeparation, //@sri added
};

export type {
  FooterProps,
  TopNavHeaderProps,
  BasicLayoutProps,
  RouteContextType,
  HeaderProps,
  SettingDrawerProps,
  SettingDrawerState,
};

export default BasicLayout;