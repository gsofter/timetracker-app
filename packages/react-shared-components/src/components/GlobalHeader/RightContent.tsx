import { Tooltip, Tag } from 'antd';
// import { Settings as ProSettings } from '@admin-layout/components';
import React, { useMemo } from 'react';
// import { connect, ConnectProps, SelectLang } from 'umi';
// import { ConnectState } from '@/models/connect';
// import Avatar from './AvatarDropdown';
// import HeaderSearch from '../HeaderSearch';
import { styleSheet } from './style';
import { useFela } from 'react-fela';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ProSettings } from '@admin-layout/components';
import { Menu, Dropdown, Button, Space } from 'antd';
import { LOCALES } from './../../locales';
import { CHANGE_LANGUAGE } from '../../constants/constants';

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
  const { theme, layout, upperMenus, orgName, formatMessage} = props;
  const dispatch = useDispatch();
  const [language, setLanguage] = React.useState('ENG');
  const [locale, setLocale] = React.useState(LOCALES.EN_US);
  let className = 'right';
  if (theme === 'dark' && layout === 'top') {
    className = 'right dark';
  }
  const { css } = useFela();
  const menus = upperMenus.map(item => {
    const realPath = item.path.replace(':orgName', orgName);
    return { ...item, path: realPath };
  });

  React.useEffect(() => {
    dispatch({
      type: CHANGE_LANGUAGE,
      payload: locale,
    });
  }, [locale]);

  const handleLanguage = (e: any) => {
    const lang = e.currentTarget && e.currentTarget.innerText;
    if (
      lang === 'ENG' ||
      lang === 'ZHCN' ||
      lang === 'ZHTW' ||
      lang === 'PTBR' ||
      lang === 'IDID'
    ) {
      setLanguage(lang);
      lang === 'ENG' && setLocale(LOCALES.EN_US);
      setLocale(LOCALES.EN_US);
      lang === 'ZHCN' && setLocale(LOCALES.ZH_CN);
      lang === 'ZHTW' && setLocale(LOCALES.ZH_TW);
      lang === 'PTBR' && setLocale(LOCALES.PT_BR);
      lang === 'IDID' && setLocale(LOCALES.ID_ID);
    }
  };

  const LanguageMenu = (
    <Menu>
      <Menu.Item>
        <a rel="noopener noreferrer" onClick={e => handleLanguage(e)}>
          ENG
        </a>
      </Menu.Item>
      <Menu.Item>
        <a rel="noopener noreferrer" onClick={e => handleLanguage(e)}>
          ZHCN
        </a>
      </Menu.Item>
      <Menu.Item>
        <a rel="noopener noreferrer" onClick={e => handleLanguage(e)}>
          ZHTW
        </a>
      </Menu.Item>
      <Menu.Item>
        <a rel="noopener noreferrer" onClick={e => handleLanguage(e)}>
          PTBR
        </a>
      </Menu.Item>
      <Menu.Item>
        <a rel="noopener noreferrer" onClick={e => handleLanguage(e)}>
          IDID
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={css(styleSheet.right)}>
      <div>
        {formatMessage({
          id: 'app.settings.menuMap.basic',
          defaultMessage: 'Hello',
        })}
        </div>
      <Dropdown overlay={LanguageMenu} placement="bottomRight">
        <Button className="lang-btn">{language}</Button>
      </Dropdown>
      {menus.map(item => (
        <Link key={item.name} to={item.path}>
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default connect(state => ({
  theme: 'light',
  layout: 'top',
}))(GlobalHeaderRight);
