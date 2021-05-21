import { Property, Properties } from 'csstype';

export const styleSheet: { [key: string]: (obj) => Properties } = {
  container: () => ({
    display: 'flex',
    minHeight: '52px',
    marginLeft: '10px',
    maxWidth: '100%',
    '& .lang-btn': {
      marginTop: '10px',
    },
  }),
  item: () => ({
    margin: '0 15px',
    minWidth: 'fit-content',
  }),
  tabsWrap: () => ({
    display: 'flex',
    width: 'fit-content',
    overflow: 'auto',
    overflowY: 'hidden',
    '::-webkit-scrollbar': {
      height: '3px',
      background: '#ffffff',
    },
    '::-webkit-scrollbar-thumb': {
      background: '#c1c1c1',
      borderRadius: '10px',
      width: '2px',
    },
    '::-webkit-scrollbar-track': {
      background: '#ffffff',
    },
  }),
  orgName: () => ({
    minWidth: '120px',
    marginLeft: '16px',
  }),
};
