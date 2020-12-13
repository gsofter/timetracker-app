import { PageHeader, Tabs, Affix, ConfigProvider } from 'antd';
import React, { useContext, ReactNode } from 'react';
import classNames from 'classnames';
import { TabsProps, TabPaneProps } from 'antd/lib/tabs';
import { PageHeaderProps } from 'antd/lib/page-header';
import { AffixProps } from 'antd/lib/affix';

import RouteContext, { RouteContextType } from '../RouteContext';
import GridContent from '../GridContent';
import FooterToolbar from '../FooterToolbar';
import PageLoading from '../PageLoading';
import { WithFalse } from '../typings';
import { Properties } from 'csstype';
import { useFela } from 'react-fela';

export interface PageHeaderTabConfig {
  /**
   * @name tabs 的列表
   */
  tabList?: (TabPaneProps & { key?: React.ReactText })[];

  /**
   * @name 当前选中 tab 的 key
   */
  tabActiveKey?: TabsProps['activeKey'];

  /**
   * @name tab 修改时触发
   */
  onTabChange?: TabsProps['onChange'];

  /**
   * @name tab 上多余的区域
   */
  tabBarExtraContent?: TabsProps['tabBarExtraContent'];

  /**
   * @name tabs 的其他配置
   */
  tabProps?: TabsProps;

  /**
   * @name 固定 PageHeader 到页面顶部
   * @deprecated 请使用 fixedHeader
   */
  fixHeader?: boolean;

  /**
   * @name 固定 PageHeader 到页面顶部
   */
  fixedHeader?: boolean;
}

export interface PageContainerProps extends PageHeaderTabConfig, Omit<PageHeaderProps, 'title'> {
  title?: React.ReactNode | false;
  content?: React.ReactNode;
  extraContent?: React.ReactNode;
  prefixCls?: string;
  footer?: ReactNode[];

  /**
   * @name 是否显示背景色
   */
  ghost?: boolean;

  /**
   * @name PageHeader 的配置
   * @description 与 antd 完全相同
   */
  header?: PageHeaderProps & {
    children?: React.ReactNode;
  };

  /**
   * @name 自定义 pageHeader
   */
  pageHeaderRender?: WithFalse<(props: PageContainerProps) => React.ReactNode>;

  /**
   * @name 固钉的配置
   * @description 与 antd 完全相同
   */
  affixProps?: AffixProps;

  /**
   * @name 是否加载
   * @description 只加载内容区域
   */
  loading?: boolean;
}

/**
 * render Footer tabList
 * In order to be compatible with the old version of the PageHeader
 * basically all the functions are implemented.
 */
const renderFooter: React.SFC<Omit<
  PageContainerProps & {
    prefixedClassName: string;
  },
  'title'
>> = ({ tabList, tabActiveKey, onTabChange, tabBarExtraContent, tabProps, prefixedClassName }) => {
  if (tabList && tabList.length) {
    return (
      <Tabs
        className={`${prefixedClassName}-tabs`}
        activeKey={tabActiveKey}
        onChange={key => {
          if (onTabChange) {
            onTabChange(key);
          }
        }}
        tabBarExtraContent={tabBarExtraContent}
        {...tabProps}
      >
        {tabList.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Tabs.TabPane {...item} tab={item.tab} key={item.key || index} />
        ))}
      </Tabs>
    );
  }
  return null;
};

const renderPageHeader = (
  content: React.ReactNode,
  extraContent: React.ReactNode,
  prefixedClassName: string,
): React.ReactNode => {
  if (!content && !extraContent) {
    return null;
  }
  return (
    <div className={`${prefixedClassName}-detail`}>
      <div className={`${prefixedClassName}-main`}>
        <div className={`${prefixedClassName}-row`}>
          {content && <div className={`${prefixedClassName}-content`}>{content}</div>}
          {extraContent && (
            <div className={`${prefixedClassName}-extraContent`}>{extraContent}</div>
          )}
        </div>
      </div>
    </div>
  );
};

const defaultPageHeaderRender = (
  props: PageContainerProps,
  value: RouteContextType & { prefixedClassName: string },
): React.ReactNode => {
  const {
    title,
    content,
    pageHeaderRender,
    header,
    extraContent,
    style,
    prefixCls,
    ...restProps
  } = props;

  if (pageHeaderRender === false) {
    return null;
  }
  if (pageHeaderRender) {
    return pageHeaderRender({ ...props, ...value });
  }
  let pageHeaderTitle = title;
  if (!title && title !== false) {
    pageHeaderTitle = value.title;
  }
  return (
    <PageHeader
      {...value}
      title={pageHeaderTitle}
      {...restProps}
      footer={renderFooter({
        ...restProps,
        prefixedClassName: value.prefixedClassName,
      })}
      {...header}
      prefixCls={prefixCls}
    >
      {header?.children || renderPageHeader(content, extraContent, value.prefixedClassName)}
    </PageHeader>
  );
};

const PageContainer: React.FC<PageContainerProps> = props => {
  const { children, loading, style, footer, affixProps, ghost, fixedHeader } = props;
  const value = useContext(RouteContext);

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = props.prefixCls || getPrefixCls('pro');

  const prefixedClassName = `${prefixCls}-page-container`;

  const className = classNames(prefixedClassName, props.className, {
    [`${prefixCls}-page-container-ghost`]: ghost,
  });

  const content = children ? (
    <div>
      <div className={`${prefixedClassName}-children-content`}>{children}</div>
      {value.hasFooterToolbar && (
        <div
          style={{
            height: 48,
            marginTop: 24,
          }}
        />
      )}
    </div>
  ) : null;

  const pageHeaderDom = defaultPageHeaderRender(props, {
    ...value,
    prefixCls: undefined,
    prefixedClassName,
  });

  const headerDom = pageHeaderDom ? (
    <div className={`${prefixedClassName}-warp`}>{pageHeaderDom}</div>
  ) : null;

  const { css } = useFela(props);
  return (
    <div className={css(styleSheet.containerStyle)}>
      <div style={style} className={className}>
        {fixedHeader && headerDom ? (
          // 在 hasHeader 且 fixedHeader 的情况下，才需要设置高度
          <Affix
            offsetTop={value.hasHeader && value.fixedHeader ? value.headerHeight : 0}
            {...affixProps}
          >
            {headerDom}
          </Affix>
        ) : (
          headerDom
        )}
        <GridContent>{loading ? <PageLoading /> : content}</GridContent>
        {footer && <FooterToolbar prefixCls={prefixCls}>{footer}</FooterToolbar>}
      </div>
    </div>
  );
};

const styleSheet: { [key: string]: (obj) => Properties } = {
  containerStyle: ({ theme, primaryColor, layout, backgroundColor }) => ({
    display: 'inherit',
    '& .ant-pro-page-container-children-content': {
      margin: '24px 24px 0',
    },
    '& .ant-pro-page-container-warp': {
      backgroundColor: `${backgroundColor}`,
    },
    '& .ant-pro-page-container-warp .ant-prefix-tabs-nav': {
      margin: 0,
    },
    '& .ant-pro-page-container-ghost .ant-pro-page-container-warp': {
      backgroundColor: 'transparent',
    },
    '& .ant-pro-page-container-ghost .ant-pro-page-container-children-content': {
      marginTop: 0,
    },
    '& .ant-pro-page-container-main .ant-pro-page-container-detail': {
      display: 'flex',
    },
    '& .ant-pro-page-container-main .ant-pro-page-container-row': {
      display: 'flex',
      width: '100%',
    },
    '& .ant-pro-page-container-main .ant-pro-page-container-title-content': {
      marginBottom: '16px',
    },
    '& .ant-pro-page-container-main .ant-pro-page-container-title, .ant-pro-page-container-main .ant-pro-page-container-content': {
      flex: 'auto',
    },
    '& .ant-pro-page-container-main .ant-pro-page-container-extraContent, .ant-pro-page-container-main .ant-pro-page-container-main': {
      flex: '0 1 auto',
    },
    '& .ant-pro-page-container-main .ant-pro-page-container-main': {
      width: '100%',
    },
    '& .ant-pro-page-container-main .ant-pro-page-container-title': {
      marginBottom: '16px',
    },
    '& .ant-pro-page-container-main .ant-pro-page-container-logo': {
      marginBottom: '16px',
    },
    '& .ant-pro-page-container-main .ant-pro-page-container-extraContent': {
      minWidth: '242px',
      marginLeft: '88px',
      textAlign: 'right',
    },
    '@media screen and (max-width: 1200px)': {
      '& .ant-pro-page-container-main .ant-pro-page-container-extraContent': {
        marginLeft: '44px',
      },
    },
    '& @media screen and (max-width: 992px)': {
      '& .ant-pro-page-container-main .ant-pro-page-container-extraContent': {
        marginLeft: '20px',
      },
    },
    '& @media screen and (max-width: 768px)': {
      '& .ant-pro-page-container-main .ant-pro-page-container-row': {
        display: 'block',
      },
      '& .ant-pro-page-container-main .ant-pro-page-container-action, .ant-pro-page-container-main .ant-pro-page-container-extraContent': {
        marginLeft: 0,
        textAlign: 'left',
      },
    },
    '& @media screen and (max-width: 576px)': {
      '& .ant-pro-page-container-detail': {
        display: 'block',
      },
      '& .ant-pro-page-container-extraContent': {
        marginLeft: 0,
      },
    },
  }),
};
export default PageContainer;
