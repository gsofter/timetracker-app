import { Properties } from 'csstype';

export const styleSheet: { [key: string]: (obj) => Properties } = {
  button: () => ({
    margin: '10px 15px 0 0',
    display: 'flex',
  }),
  icon: () => ({
    marginTop: '2px',
    fontSize: '18px',
  }),
};
