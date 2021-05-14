import { Properties } from 'csstype';

export const styleSheet: { [key: string]: (obj) => Properties } = {
  TimerWidget: () => ({
    backgroundColor: '#FFF',
    padding: '10px 25px',
    boxShadow: '0 4px 12px 0 rgba(0,0,0,0.2)',
    borderRadius: '6px',
  }),
};
