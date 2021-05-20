import { Property, Properties } from 'csstype';

export const styleSheet: { [key: string]: (obj) => Properties } = {
  container: () => ({
    display: 'flex',
    height: '52px !important',
    marginLeft: '10px',
    '& .lang-btn': {
      marginTop: '10px',
    },
  }),
  item: () => ({
    margin: '0 15px',
    minWidth: '68px',
  }),
  tabsWrap: () => ({
    display: 'flex',
  }),
  orgName: () => ({
    minWidth: '120px',
    marginLeft: '16px',
  }),
};
