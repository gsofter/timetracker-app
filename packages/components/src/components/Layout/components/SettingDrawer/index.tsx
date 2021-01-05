import {
  CopyOutlined,
  CloseOutlined,
  NotificationOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { isBrowser } from '../../../../utils';

import { Button, Divider, Drawer, List, Switch, message, Alert } from 'antd';
import { createBrowserHistory } from 'history';
import { stringify, parse } from 'qs';
import React, { useState, useEffect, useRef } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import omit from 'omit.js';
import defaultSettings, { ProSettings } from '../defaultSettings';

import BlockCheckbox from './BlockCheckbox';
import ThemeColor from './ThemeColor';
import getLocales, { getLanguage } from '../locales';
import { genStringToTheme } from '../utils/utils';
import LayoutSetting, { renderLayoutSettingItem } from './LayoutChange';
import RegionalSetting from './RegionalChange';
import { useFela } from 'react-fela';
import { styleSheet } from './styles';

interface BodyProps {
  title: string;
  prefixCls: string;
}

type MergerSettingsType<T> = Partial<T> & {
  primaryColor?: string;
  colorWeak?: boolean;
};

const Body: React.FC<BodyProps> = ({ children, prefixCls, title }) => (
  <div style={{ marginBottom: 24 }}>
    <h3 className={`${prefixCls}-drawer-title`}>{title}</h3>
    {children}
  </div>
);

export interface SettingItemProps {
  title: React.ReactNode;
  action: React.ReactElement;
  disabled?: boolean;
  disabledReason?: React.ReactNode;
}

export interface SettingDrawerProps {
  settings?: MergerSettingsType<ProSettings>;
  collapse?: boolean;
  getContainer?: any;
  publicPath?: string;
  hideLoading?: boolean;
  hideColors?: boolean;
  hideHintAlert?: boolean;
  prefixCls?: string;
  hideCopyButton?: boolean;
  onCollapseChange?: (collapse: boolean) => void;
  onSettingChange?: (settings: MergerSettingsType<ProSettings>) => void;
}

export interface SettingDrawerState extends MergerSettingsType<ProSettings> {
  collapse?: boolean;
  language?: string;
}

let oldSetting: MergerSettingsType<ProSettings> = {};

const getDifferentSetting = (state: Partial<ProSettings>) => {
  const stateObj: Partial<ProSettings> = {};
  Object.keys(state).forEach((key) => {
    if (state[key] !== oldSetting[key] && key !== 'collapse') {
      stateObj[key] = state[key];
    }

    if (key.includes('Render')) {
      stateObj[key] = state[key] === 'false' || state[key] === false ? false : undefined;
    }
  });

  delete stateObj.menu;
  return stateObj;
};

export const getFormatMessage = (): ((data: { id: string; defaultMessage?: string }) => string) => {
  const formatMessage = ({
    id,
    defaultMessage,
  }: {
    id: string;
    defaultMessage?: string;
  }): string => {
    const locales = getLocales();
    if (locales[id]) {
      return locales[id];
    }
    if (defaultMessage) {
      return defaultMessage as string;
    }
    return id;
  };
  return formatMessage;
};

const updateTheme = (
  dark: boolean,
  color?: string,
  hideMessageLoading = false,
  publicPath = '/theme',
) => {
  // ssr
  if (typeof window === 'undefined' || !(window as any).umi_plugin_ant_themeVar) {
    return;
  }
  const formatMessage = getFormatMessage();
  let hide: any = () => null;
  if (!hideMessageLoading) {
    hide = message.loading(
      formatMessage({
        id: 'app.setting.loading',
        defaultMessage: '正在加载主题',
      }),
    );
  }

  const href = dark ? `${publicPath}/dark` : `${publicPath}/`;
  // 如果是 dark，并且是 color=daybreak，无需进行拼接
  let colorFileName =
    dark && color ? `-${encodeURIComponent(color)}` : encodeURIComponent(color || '');
  if (color === 'daybreak' && dark) {
    colorFileName = '';
  }

  const dom = document.getElementById('theme-style') as HTMLLinkElement;

  // 如果这两个都是空
  if (!href && !colorFileName) {
    if (dom) {
      dom.remove();
      localStorage.removeItem('site-theme');
    }
    return;
  }

  const url = `${href}${colorFileName || ''}.css`;
  if (dom) {
    dom.onload = () => {
      window.setTimeout(() => {
        hide();
      });
    };
    dom.href = url;
  } else {
    const style = document.createElement('link');
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.id = 'theme-style';
    style.onload = () => {
      window.setTimeout(() => {
        hide();
      });
    };
    style.href = url;
    if (document.body.append) {
      document.body.append(style);
    } else {
      document.body.appendChild(style);
    }
  }

  localStorage.setItem('site-theme', dark ? 'dark' : 'light');
};

const getThemeList = (settings: Partial<ProSettings>) => {
  const formatMessage = getFormatMessage();
  const list: {
    key: string;
    fileName: string;
    modifyVars: {
      '@primary-color': string;
    };
    theme: 'dark' | 'light';
  }[] = (window as any).umi_plugin_ant_themeVar || [
    //@sri following are needed otherwise we need make above plugin to work
    {
      key: 'dust',
      fileName: 'dust.css',
      modifyVars: {
        '@primary-color': '#F5222D',
      },
    },
    {
      key: 'volcano',
      fileName: 'volcano.css',
      modifyVars: {
        '@primary-color': '#FA541C',
      },
    },
    {
      key: 'sunset',
      fileName: 'sunset.css',
      modifyVars: {
        '@primary-color': '#FAAD14',
      },
    },
    {
      key: 'cyan',
      fileName: 'cyan.css',
      modifyVars: {
        '@primary-color': '#13C2C2',
      },
    },
    {
      key: 'green',
      fileName: 'green.css',
      modifyVars: {
        '@primary-color': '#52C41A',
      },
    },
    {
      key: 'geekblue',
      fileName: 'geekblue.css',
      modifyVars: {
        '@primary-color': '#2F54EB',
      },
    },
    {
      key: 'purple',
      fileName: 'purple.css',
      modifyVars: {
        '@primary-color': '#722ED1',
      },
    },
  ];
  const themeList = [
    {
      key: 'light',
      title: formatMessage({ id: 'app.setting.pagestyle.light' }),
    },
  ];

  const darkColorList: {
    key: string;
    color: string;
    theme: 'dark' | 'light';
  }[] = [
      {
        key: 'daybreak',
        color: '#1890ff',
        theme: 'dark',
      },
    ];

  const lightColorList: {
    key: string;
    color: string;
    theme: 'dark' | 'light';
  }[] = [
      {
        key: 'daybreak',
        color: '#1890ff',
        theme: 'dark',
      },
    ];
  if (settings.layout !== 'mix') {
    themeList.push({
      key: 'dark',
      title: formatMessage({
        id: 'app.setting.pagestyle.dark',
        defaultMessage: '',
      }),
    });
  }

  if (list.find((item) => item.theme === 'dark')) {
    themeList.push({
      key: 'realDark',
      title: formatMessage({
        id: 'app.setting.pagestyle.dark',
        defaultMessage: '',
      }),
    });
  }

  // insert  theme color List
  list.forEach((item) => {
    const color = (item.modifyVars || {})['@primary-color'];
    if (item.theme === 'dark' && color) {
      darkColorList.push({
        color,
        ...item,
      });
    }
    if (!item.theme || item.theme === 'light') {
      lightColorList.push({
        color,
        ...item,
      });
    }
  });

  return {
    colorList: {
      dark: darkColorList,
      light: lightColorList,
    },
    themeList,
  };
};

/**
 * 初始化的时候需要做的工作
 * @param param0
 */
const initState = (
  settings: Partial<ProSettings>,
  onSettingChange: SettingDrawerProps['onSettingChange'],
  publicPath?: string,
) => {
  if (!isBrowser()) {
    return;
  }

  let loadedStyle = false;

  if (window.location.search) {
    const params = parse(window.location.search.replace('?', '')) as {
      primaryColor: string;
      navTheme: string;
    };

    const replaceSetting = {};
    Object.keys(params).forEach((key) => {
      if (defaultSettings[key] || defaultSettings[key] === undefined) {
        replaceSetting[key] = params[key];
        if (key.includes('Render')) {
          replaceSetting[key] = params[key] === 'false' ? false : undefined;
        }
      }
    });

    if (onSettingChange) {
      onSettingChange({
        ...settings,
        ...replaceSetting,
      });
    }

    // 如果 url 中设置主题，进行一次加载。
    if (oldSetting.navTheme !== params.navTheme && params.navTheme) {
      updateTheme(
        settings.navTheme === 'realDark',
        (params as { primaryColor: string }).primaryColor,
        true,
        publicPath,
      );
      loadedStyle = true;
    }
  }

  if (loadedStyle) {
    return;
  }

  // 如果 url 中没有设置主题，并且 url 中的没有加载，进行一次加载。
  if (defaultSettings.navTheme !== settings.navTheme && settings.navTheme) {
    updateTheme(settings.navTheme === 'realDark', settings.primaryColor, true, publicPath);
  }
};

const getParamsFromUrl = (settings?: MergerSettingsType<ProSettings>) => {
  if (!isBrowser()) {
    return defaultSettings;
  }
  // 第一次进入与 浏览器参数同步一下
  let params = {};
  if (window.location.search) {
    params = parse(window.location.search.replace('?', ''));
  }

  Object.keys(params).forEach((key) => {
    if (params[key] === 'true') {
      params[key] = true;
    }
  });

  return {
    ...defaultSettings,
    ...(settings || {}),
    ...params,
  };
};

const genCopySettingJson = (settingState: MergerSettingsType<ProSettings>) =>
  JSON.stringify(
    omit(
      {
        ...settingState,
        primaryColor: genStringToTheme(settingState.primaryColor),
      },
      ['colorWeak'],
    ),
    null,
    2,
  );

/**
 * 可视化配置组件
 * @param props
 */
const SettingDrawer: React.FC<SettingDrawerProps> = (props) => {
  const {
    settings: propsSettings = undefined,
    hideLoading = false,
    hideColors,
    hideHintAlert,
    hideCopyButton,
    getContainer,
    onSettingChange,
    prefixCls = 'ant-pro',
  } = props;
  const firstRender = useRef<boolean>(true);

  const [show, setShow] = useMergedState(false, {
    value: props.collapse,
    onChange: props.onCollapseChange,
  });
  const [language, setLanguage] = useState<string>(getLanguage());
  const [settingState, setSettingState] = useMergedState<Partial<ProSettings>>(
    () => getParamsFromUrl(propsSettings),
    {
      value: propsSettings,
      onChange: onSettingChange,
    },
  );
  const preStateRef = useRef(settingState);

  const { navTheme = 'dark', primaryColor = 'daybreak', layout = 'sidemenu', colorWeak } =
    settingState || {};

  //@sri custom additionÎ
  const { css } = useFela({ primaryColor: props.settings.primaryColor });

  useEffect(() => {
    // 语言修改，这个是和 locale 是配置起来的
    const onLanguageChange = (): void => {
      if (language !== getLanguage()) {
        setLanguage(getLanguage());
      }
    };

    // 记住默认的选择，方便做 diff，然后保存到 url 参数中
    oldSetting = {
      ...defaultSettings,
      ...propsSettings,
    };

    /**
     * 如果不是浏览器 都没有必要做了
     */
    if (!isBrowser()) {
      return () => null;
    }
    initState(settingState, setSettingState, props.publicPath);
    window.addEventListener('languagechange', onLanguageChange, {
      passive: true,
    });

    return () => window.removeEventListener('languagechange', onLanguageChange);
  }, []);

  /**
   * 修改设置
   * @param key
   * @param value
   * @param hideMessageLoading
   */
  const changeSetting = (key: string, value: string | boolean, hideMessageLoading?: boolean) => {
    const nextState = { ...preStateRef.current };
    nextState[key] = value;

    if (key === 'navTheme') {
      updateTheme(value === 'realDark', undefined, hideMessageLoading, props.publicPath);
      nextState.primaryColor = 'daybreak';
    }

    if (key === 'primaryColor') {
      updateTheme(
        nextState.navTheme === 'realDark',
        value === 'daybreak' ? '' : (value as string),
        hideMessageLoading,
        props.publicPath,
      );
    }

    if (key === 'layout') {
      nextState.contentWidth = value === 'top' ? 'Fixed' : 'Fluid';
    }
    if (key === 'layout' && value !== 'mix') {
      nextState.splitMenus = false;
    }
    if (key === 'layout' && value === 'mix') {
      nextState.navTheme = 'light';
    }
    if (key === 'colorWeak' && value === true) {
      const dom = document.querySelector('body');
      if (dom) {
        dom.dataset.prosettingdrawer = dom.style.filter;
        dom.style.filter = 'invert(80%)';
      }
    }
    if (key === 'colorWeak' && value === false) {
      const dom = document.querySelector('body');
      if (dom) {
        dom.style.filter = dom.dataset.prosettingdrawer || 'none';
        delete dom.dataset.prosettingdrawer;
      }
    }
    preStateRef.current = nextState;
    setSettingState(nextState);
  };

  const formatMessage = getFormatMessage();
  const themeList = getThemeList(settingState);

  useEffect(() => {
    /**
     * 如果不是浏览器 都没有必要做了
     */
    if (!isBrowser()) {
      return;
    }
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const browserHistory = createBrowserHistory();
    let params = {};
    if (window.location.search) {
      params = parse(window.location.search.replace('?', ''));
    }

    const diffParams = getDifferentSetting({ ...params, ...settingState });
    if (Object.keys(settingState).length < 1) {
      return;
    }

    browserHistory.replace({
      search: stringify(diffParams),
    });
  }, [JSON.stringify(settingState)]);
  const baseClassName = `${prefixCls}-setting`;

  return (
    <Drawer
      visible={show}
      width={300}
      onClose={() => setShow(false)}
      placement="right"
      getContainer={getContainer}
      handler={
        <div className={css(styleSheet.settingDrawerHandler)}>
          <div className={`${baseClassName}-drawer-handle`} onClick={() => setShow(!show)}>
            {show ? (
              <CloseOutlined
                style={{
                  color: '#fff',
                  fontSize: 20,
                }}
              />
            ) : (
                <SettingOutlined
                  style={{
                    color: '#fff',
                    fontSize: 20,
                  }}
                />
              )}
          </div>
        </div >
      }
      style={{
        zIndex: 999,
      }}
    >
      <div className={css(styleSheet.settingDrawer)}>
        <div className={`${baseClassName}-drawer-content`}>
          <Body
            title={formatMessage({
              id: 'app.setting.pagestyle',
              defaultMessage: 'Page style setting',
            })}
            prefixCls={baseClassName}
          >
            <BlockCheckbox
              prefixCls={baseClassName}
              list={themeList.themeList}
              value={navTheme}
              configType="theme"
              key="navTheme"
              onChange={(value) => changeSetting('navTheme', value, hideLoading)}
            />
          </Body>
          <Body
            title={formatMessage({
              id: 'app.setting.themecolor',
              defaultMessage: 'Theme color',
            })}
            prefixCls={baseClassName}
          >
            <ThemeColor
              value={primaryColor}
              colors={
                hideColors ? [] : themeList.colorList[navTheme === 'realDark' ? 'dark' : 'light']
              }
              formatMessage={formatMessage}
              onChange={(color) => changeSetting('primaryColor', color, hideLoading)}
            />
          </Body>

          <Divider />

          <Body prefixCls={baseClassName} title={formatMessage({ id: 'app.setting.navigationmode' })}>
            <BlockCheckbox
              prefixCls={baseClassName}
              value={layout}
              key="layout"
              configType="layout"
              list={[
                {
                  key: 'side',
                  title: formatMessage({ id: 'app.setting.sidemenu' }),
                },
                {
                  key: 'top',
                  title: formatMessage({ id: 'app.setting.topmenu' }),
                },
                {
                  key: 'mix',
                  title: formatMessage({ id: 'app.setting.mixmenu' }),
                },
              ]}
              onChange={(value) => changeSetting('layout', value, hideLoading)}
            />
          </Body>
          <LayoutSetting settings={settingState} changeSetting={changeSetting} />
          <Divider />

          <Body
            prefixCls={baseClassName}
            title={formatMessage({ id: 'app.setting.regionalsettings' })}
          >
            <RegionalSetting settings={settingState} changeSetting={changeSetting} />
          </Body>

          <Divider />

          <Body prefixCls={baseClassName} title={formatMessage({ id: 'app.setting.othersettings' })}>
            <List
              split={false}
              renderItem={renderLayoutSettingItem}
              dataSource={[
                {
                  title: formatMessage({ id: 'app.setting.weakmode' }),
                  action: (
                    <Switch
                      size="small"
                      className="color-weak"
                      checked={!!colorWeak}
                      onChange={(checked) => {
                        changeSetting('colorWeak', checked);
                      }}
                    />
                  ),
                },
              ]}
            />
          </Body>
          {hideHintAlert && hideCopyButton ? null : <Divider />}

          {hideHintAlert ? null : (
            <Alert
              type="warning"
              message={formatMessage({
                id: 'app.setting.production.hint',
              })}
              icon={<NotificationOutlined />}
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          {hideCopyButton ? null : (
            <CopyToClipboard
              text={genCopySettingJson(settingState)}
              onCopy={() => message.success(formatMessage({ id: 'app.setting.copyinfo' }))}
            >
              <Button block icon={<CopyOutlined />} style={{ marginBottom: 24 }}>
                {formatMessage({ id: 'app.setting.copy' })}
              </Button>
            </CopyToClipboard>
          )}
        </div>
      </div>
    </Drawer >
  );
};

export default SettingDrawer;

// const styleSheet: any = {
//   settingDrawerTitle: ({ primaryColor }) => ({
//     marginBottom: '12px',
//     color: primaryColor,
//     fontSize: '14px',
//     lineHeight: '22px',
//   }),
//   settingDrawerHandle: ({ primaryColor }) => ({
//     position: 'absolute',
//     top: '240px',
//     right: '300px',
//     zIndex: 0,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '48px',
//     height: '48px',
//     fontSize: '16px',
//     textAlign: 'center',
//     background: primaryColor,
//     borderRadius: '4px 0 0 4px',
//     cursor: 'pointer',
//     pointerEvents: 'auto',
//   }),
//   proSettingDrawerContent: ({ primaryColor }) => ({
//     position: 'relative',
//     minHeight: '100%',
//     '& .ant-pro-setting-drawer-content .ant-list-item span': {
//       flex: 1,
//     },
//     '& .ant-pro-setting-drawer-block-checkbox': {
//       display: 'flex',
//     },
//     '& .ant-pro-setting-drawer-block-checkbox-item': {
//       position: 'relative',
//       marginRight: '16px',
//       boxShadow: '0 1px 2.5px 0 rgba(0,0,0,0.18)',
//       borderRadius: '4px',
//       overflow: 'hidden',
//       cursor: 'pointer',
//       width: '44px',
//       height: '36px',
//       backgroundColor: '#f0f2f5',
//     },
//     '& .ant-pro-setting-drawer-block-checkbox-item::before': {
//       position: 'absolute',
//       top: '0',
//       left: '0',
//       width: '33%',
//       height: '100%',
//       backgroundColor: '#001529',
//       content: '""',
//     },
//     '& .ant-pro-setting-drawer-block-checkbox-item::after': {
//       position: 'absolute',
//       top: '0',
//       left: '0',
//       width: '100%',
//       height: '25%',
//       backgroundColor: '#fff',
//       content: '""',
//     },
//     '& .ant-pro-setting-drawer-block-checkbox-item-light::before': {
//       backgroundColor: '#fff',
//       content: '""',
//     },
//     '& .ant-pro-setting-drawer-block-checkbox-item-light::after': {
//       backgroundColor: '#fff',
//     },
//     '& .ant-pro-setting-drawer-block-checkbox-item-dark::before, .ant-pro-setting-drawer-block-checkbox-item-side::before': {
//       backgroundColor: '#011529',
//       content: '""',
//       zIndex: '1',
//     },
//     '& .ant-pro-setting-drawer-block-checkbox-item-dark::after, .ant-pro-setting-drawer-block-checkbox-item-side::after': {
//       backgroundColor: '#fff',
//     },
//     '& .ant-pro-setting-drawer-block-checkbox-item-top::before': {
//       backgroundColor: 'transparent',
//       content: '""',
//     },
//     '& .ant-pro-setting-drawer-block-checkbox-item-top::after': {
//       backgroundColor: '#011529',
//     },
//     '& .ant-pro-setting-drawer-block-checkbox-item-mix::before': {
//       backgroundColor: '#fff',
//       content: '""',
//     },
//     '& .ant-pro-setting-drawer-block-checkbox-item-mix::after': {
//       backgroundColor: '#011529',
//     },
//     '& .ant-pro-setting-drawer-block-checkbox-item-light:after': {
//       backgroundColor: '#fff',
//     },
//     '& .ant-pro-setting-drawer-block-checkbox-item:after': {
//       position: 'absolute',
//       top: '0',
//       left: '0',
//       width: '100%',
//       height: '25%',
//       content: '""',
//     },
//     '& .ant-pro-setting-drawer-block-checkbox-selectIcon': {
//       position: 'absolute',
//       bottom: '4px',
//       right: '6px',
//       color: primaryColor,
//       fontWeight: 'bold',
//       fontSize: '14px',
//       pointerEvents: 'none',
//     },
//     '& .ant-pro-setting-drawer-block-checkbox-selectIcon .action': {
//       color: primaryColor,
//     },
//     '& .ant-pro-setting-drawer-color_block': {
//       display: 'inline-block',
//       width: '38px',
//       height: '22px',
//       margin: '4px',
//       marginRight: '12px',
//       verticalAlign: 'middle',
//       borderRadius: '4px',
//       cursor: 'pointer',
//     },
//     '& .ant-pro-setting-drawer-title': {
//       marginBottom: '12px',
//       color: primaryColor,
//       fontSize: '14px',
//       lineHeight: '22px',
//     },
//     '& .ant-pro-setting-drawer-production-hint': {
//       marginTop: '16px',
//       fontSize: '12px',
//     },
//     '& .ant-pro-setting-drawer-block-checkbox-item img': {
//       width: '48px',
//     },
//     '& .theme-color-block': {
//       display: 'inline-block',
//       width: '22px',
//       height: '22px',
//       margin: '4px',
//       marginRight: '12px',
//       verticalAlign: 'middle',
//       borderRadius: '4px',
//       cursor: 'pointer',
//     },
//     '& .ant-pro-setting-drawer-content .theme-color .theme-color-block': {
//       float: 'left',
//       width: '20px',
//       height: '20px',
//       marginRight: '8px',
//       color: '#fff',
//       fontWeight: '700',
//       textAlign: 'center',
//       borderRadius: '2px',
//       cursor: 'pointer',
//     },
//   }),
// };
