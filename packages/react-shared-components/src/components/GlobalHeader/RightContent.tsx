import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useFela } from 'react-fela';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { Settings as ProSettings } from '@admin-layout/components';
// import { connect, ConnectProps, SelectLang } from 'umi';
// import { ConnectState } from '@/models/connect';
// import Avatar from './AvatarDropdown';
// import HeaderSearch from '../HeaderSearch';
import { styleSheet } from './style';
import { useExtensionController } from '@adminide-stack/extension-module-browser';
import { generateContributionId, CONTRIBUTION_ACTION_TYPES } from '@adminide-stack/extension-api';
import { ProSettings } from '@admin-layout/components';
import { LanguageMenu } from './LanguageMenu';

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

export const useHorizontalScroll = () => {
  const elRef = useRef();

  useEffect(() => {
    const el = elRef.current || null;
    if (el) {
      const onWheel = e => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: 'smooth',
        });
      };
      el.addEventListener('wheel', onWheel);
      return () => {
        return el.removeEventListener('wheel', onWheel);
      };
    }
  }, []);

  return elRef;
}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const { theme, layout, upperMenus, orgName, formatMessage } = props;
  const [navBarItems, setNavBarItems] = useState([]);
  const controller = useExtensionController();
  const scrollRef = useHorizontalScroll();
  const dispatch = useDispatch();
  const { css } = useFela();

  useEffect(() => {
    const id = generateContributionId();
    const contributions = {
      [id]: {
        pageNavBar: [
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

  useEffect(() => {
    const ele = document.getElementById('item-wrapper');
    if (ele) {
      if (check(ele)) {
        ele.style.boxShadow = 'inset 0 0 5px #e2e2e2';
      } else {
        ele.style.boxShadow = 'none';
      }
    }
  });

  const check = (el) => {
    const curOverflow = el.style.overflow;
    if ( !curOverflow || curOverflow === 'visible' ) {
      el.style.overflow = 'hidden';
    }
    const isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;
    el.style.overflow = curOverflow;
    return isOverflowing;
  }

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
      <div id={'item-wrapper'} ref={scrollRef} className={css(styleSheet.tabsWrap)}>
        {navBarItems.map((item, index) => {
          if (item.position === 'right' && item.component) {
            return (
                <div key={index} className={css(styleSheet.item)}>
                  {item.component(props)}
                </div>
            );
          }
          return null;
        })
        }
      </div>
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
