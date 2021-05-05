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
  }
  ),
};
