import { MainLayout, BasicLayoutProps } from '../containers/MainLayout';
import DefaultHeader, { HeaderViewProps as HeaderProps } from './Header';
import TopNavHeader, { TopNavHeaderProps } from './TopNavHeader';
import SettingDrawer, { SettingDrawerProps, SettingDrawerState } from './SettingDrawer';

import DefaultFooter, { FooterProps } from './Footer';
import GridContent from '../components/GridContent';
import PageContainer from '../components/PageContainer';
import RouteContext, { RouteContextType } from './RouteContext';
import getMenuData from './utils/getMenuData';
import getPageTitle from './getPageTitle';
// import FooterToolbar from './FooterToolbar';

export type { ProSettings as Settings, ProSettings } from './defaultSettings';

export type { MenuDataItem } from './typings';

const PageHeaderWrapper = PageContainer;

export {
 MainLayout,
  RouteContext,
  // PageLoading,
  GridContent,
  DefaultHeader,
  TopNavHeader,
  DefaultFooter,
  SettingDrawer,
  getPageTitle,
  PageHeaderWrapper,
  getMenuData,
  PageContainer,
//   FooterToolbar,
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

export default MainLayout;