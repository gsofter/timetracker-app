import { Properties } from 'csstype';

export const styleSheet: { [key: string]: (obj) => Properties } = {
  container: () => ({
    width: '300px',
  }),
  headerTools: () => ({
    textAlign: 'right',
    lineHeight: '24px'
  }),
  timerHandles: () => ({
    display: 'flex',
    '& .timer-text': {
      fontSize: '18px',
      marginLeft: 'auto'
    }
  }),
  filters: () => ({
    borderTop: '1px solid #eff1f5',
    padding: '15px 0',
    '& .select-project': {
      width: '100%'
    },
    '& .select-to-do': {
      width: '100%',
      marginTop: '15px'
    },
  }),
  expandToggle: () => ({
    textAlign: 'center',
    lineHeight: '24px',
  }),
};
