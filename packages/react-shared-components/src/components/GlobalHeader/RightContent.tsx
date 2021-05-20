import * as React from 'react';
import { useEffect, useState } from 'react';
import { useFela } from 'react-fela';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tabs } from 'antd';
// import { Settings as ProSettings } from '@admin-layout/components';
// import { connect, ConnectProps, SelectLang } from 'umi';
// import { ConnectState } from '@/models/connect';
// import Avatar from './AvatarDropdown';
// import HeaderSearch from '../HeaderSearch';
import { styleSheet } from './style';
import { useExtensionController } from '@adminide-stack/extension-module-browser';
import { generateContributionId, CONTRIBUTION_ACTION_TYPES } from '@adminide-stack/extension-api';
import { ProSettings } from '@admin-layout/components';
import HeaderTimerHandler from './HeaderTimerHandler';
import { LanguageMenu } from './LanguageMenu';

const { TabPane } = Tabs;

export interface GlobalHeaderRightProps {
  theme?: string;
  layout?: any;
  upperMenus: any;
  orgName: string;
  formatMessage?: any;
}

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const { theme, layout, upperMenus, orgName, formatMessage } = props;
  const [navBarItems, setNavBarItems] = useState([]);
  const controller = useExtensionController();
  const dispatch = useDispatch();
  const { css } = useFela();

  useEffect(() => {
    const id = generateContributionId();
    const contributions = {
      [id]: {
        pageNavBar: [
          { name: 'header-timer', position: 'right', priority: 1, component: () => <HeaderTimerHandler/> },
          { name: 'language-menu', position: 'right', priority: 2, component: () => <LanguageMenu/> },
        ],
      },
    };
    dispatch({
      type: CONTRIBUTION_ACTION_TYPES.REGISTER_CONTRIBUTIONS,
      payload: contributions,
    });

    return () => {
      dispatch({
        type: CONTRIBUTION_ACTION_TYPES.DEREGISTER_CONTRIBUTIONS,
        payload: contributions,
      });
    }
  }, []);

  useEffect(() => {
    controller?.services.contribution
        .getContributions()
        .subscribe(({ pageNavBar }) => {
          setNavBarItems(pageNavBar || []);
        });
  }, [controller]);

  let className = 'right';
  if (theme === 'dark' && layout === 'top') {
    className = 'right dark';
  }
  const menus = upperMenus.map(item => {
    const realPath = item.path.replace(':orgName', orgName);
    return { ...item, path: realPath };
  });

  return (
    <div className={css(styleSheet.container)}>
      {(
        <Tabs className={css(styleSheet.tabsWrap)}>
          {navBarItems.map((item, index) => {
            if (item.position === 'right' && item.component) {
              return (
                  <TabPane
                      key={index}
                      tab={item.component(props)}
                  />
              );
            }
            return null;
          })}
        </Tabs>
      )}
      <div className={css(styleSheet.orgName)}>
        {menus.map(item => (
            <Link key={item.name} to={item.path}>
              {item.name}
            </Link>
        ))}
      </div>
    </div>
  );
};

export default connect(state => ({
  theme: 'light',
  layout: 'top',
}))(GlobalHeaderRight);
