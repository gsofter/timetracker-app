import { Property, Properties } from 'csstype';

export const styleSheet: { [key: string]: (obj) => Properties } = {
  right: ({ theme, primaryColor, layout }) => ({
    display: 'flex',
    float: 'right',
    height: '48px',
    marginLeft: 'auto',
    overflow: 'hidden',
    '& .lang-btn': {
      marginTop: '10px',
      marginRight: '10px',
    },
  }
  ),
};
