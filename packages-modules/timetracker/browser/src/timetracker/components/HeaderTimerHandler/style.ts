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
  handleBody: () => ({
    backgroundColor: '#FFF',
    padding: '10px',
    boxShadow: '0 4px 12px 0 rgba(0,0,0,0.2)',
    borderRadius: '6px',
  }),
};
