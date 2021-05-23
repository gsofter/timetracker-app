import { Properties } from 'csstype';

export const styleSheet: { [key: string]: (obj) => Properties } = {
  weeklyRecord: () => ({
    padding: '10px 8px',
    display: 'flex',
    justifyContent: 'space-between',
    '& .date-text': {
      fontWeight: '600',
    },
    '& .title': {
      fontColor: 'grey'
    },
    '& .duration': {
      fontWeight: '600',
      marginLeft: '10px'
    }
  }),
};
