import { Properties } from 'csstype';

export const styleSheet: { [key: string]: (obj) => Properties } = {
  dailyRecord: () => ({
    margin: '0px 8px 10px 8px',
    borderRadius: '5px',
    border: '1px solid #c1bebe',
    backgroundColor: 'white',
    '& .header': {
      width: '100%',
      backgroundColor: 'rgb(243 244 245)',
      borderBottom: '1px solid #c1bebe',
      borderTopRightRadius: '5px',
      borderTopLeftRadius: '5px',
      display: 'flex',
      justifyContent: 'space-between',
      color: 'grey',
      padding: '8px 5px',
    },
    '& .body': {
      padding: '10px 5px',
      '& .price': {
        color: 'green',
        display: 'flex',
        justifyContent: 'space-between',
      },
      '& .description': {
        fontSize: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        '& .span': {
          fontWeight: '600',
        }
      }
    },
  }),
};
