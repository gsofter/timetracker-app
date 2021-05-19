import { Property, Properties } from 'csstype';

export const styleSheet: { [key: string]: (obj) => Properties } = {
  right: ({ theme, primaryColor, layout }) => ({
    display: 'flex',
    float: 'right',
    height: '48px !important',
    marginLeft: 'auto',
    overflow: 'visible',
    '& .lang-btn': {
      marginTop: '10px',
      marginRight: '10px',
    },
  }),
  container: () => ({
    display: 'flex',
    maxWidth: '100%',
    '& .ant-tabs-top': {
      flexDirection: 'unset',
    },
    '& .ant-tabs-nav': {
      ':before': {
        borderBottom: 'none',
      },
    },
    '& .ant-tabs-tab-btn': {
      color: 'rgba(0, 0, 0, 0.85) !important',
      textShadow: 'none !important',
    },
    '& .ant-tabs-tab': {
      ':hover': {
        color: 'rgba(0, 0, 0, 0.85) !important',
      },
    },
    '& .ant-tabs-ink-bar': {
      background: 'transparent',
    },
    '& .lang-btn': {
      marginTop: '10px',
      marginRight: '10px',
    },
  }),
};
