import { Tooltip, Tag } from 'antd';
// import { Settings as ProSettings } from '@admin-layout/components';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React, { useMemo } from 'react';
// import { connect, ConnectProps, SelectLang } from 'umi';
// import { ConnectState } from '@/models/connect';
// import Avatar from './AvatarDropdown';
// import HeaderSearch from '../HeaderSearch';
import { styleSheet } from './style';
import { useFela } from 'react-fela';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Connect, ConnectedProps } from 'react-redux';
import { ProSettings } from '@admin-layout/components';

export interface GlobalHeaderRightProps {
  theme?: string;
  layout?: any;
  upperMenus: any;
  orgName: string;
}

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const { theme, layout, upperMenus, orgName } = props;

  let className = 'right';
  if (theme === 'dark' && layout === 'top') {
    className = 'right dark';
  }
  const { css } = useFela();
  const menus = upperMenus.map(item => {
    const realPath = item.path.replace(':orgName', orgName);
    return { ...item, path: realPath };
  });
  return (
    <div className={css(styleSheet.right)}>
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
