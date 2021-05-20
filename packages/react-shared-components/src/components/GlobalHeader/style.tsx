import { Property, Properties } from 'csstype';

export const styleSheet: { [key: string]: (obj) => Properties } = {
  container: () => ({
    display: 'flex',
    height: '52px !important',
    maxWidth: '100%',
    marginLeft: '10px',
    '& .ant-tabs-nav': {
      margin: '0 0 10px 0',
      ':before': {
        borderBottom: 'none',
      },
    },
    '& .ant-tabs-tab-btn': {
      color: 'rgba(0, 0, 0, 0.85) !important',
      textShadow: 'none !important',
    },
    '& .ant-tabs-tab': {
      padding: '0',
      ':hover': {
        color: 'rgba(0, 0, 0, 0.85)',
      },
    },
    '& .ant-tabs-ink-bar': {
      background: 'transparent',
    },
    '& .ant-tabs-nav-more': {
      padding: '8px',
    },
    '& .lang-btn': {
      marginTop: '10px',
    },
  }),
  tabsWrap: () => ({
    marginLeft: '16px',
    marginRight: '32px',
  }),
  orgName: () => ({
    minWidth: '120px',
  }),
};
