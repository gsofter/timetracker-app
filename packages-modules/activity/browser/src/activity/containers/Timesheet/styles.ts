import { Property, Properties } from 'csstype';

export const styleSheet: { [key: string]: (obj) => Properties } = {
  timesheet: ({ theme }) => {
    const { primaryColor } = theme;
    return {
      position: 'relative',
      background: '#fff',
      padding: '24px',
      '& .ant-timeline-item-head-blue': {
        borderColor: primaryColor ? primaryColor : '#1b8efa',
      },
      '& .card-outer': {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      },
      '& .no-activity': {
        flexWrap: 'wrap',
        background: '#ddd',
        width: '170px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '100px 10px',
        borderRadius: '2px',
        '@media (max-width: 668px)': {
          width: '120px !important',
        },
        '@media (min-width: 992px)': {
          width: '140px !important',
        },
        '& p': {
          padding: '0px',
          margin: '0px',
          color: '#181818',
        },
      },
      '& .activity-card': {
        width: '170px',
        padding: '30px 0px',
        textAlign: 'center',
        margin: '0px 10px',
        '@media (max-width: 668px)': {
          width: '120px !important',
        },
        '@media (min-width: 992px)': {
          width: '140px !important',
        },
        '& h4': {
          padding: '5px 10px',
          boxSizing: 'border-box',
          borderRadius: '50px',
          background: '#ddd',
          margin: '0px',
        },
        '& p': {
          fontSize: '13px',
          padding: '10px 0px',
          margin: '0px',
        },
      },
      '& .ant-card-body': {
        padding: '0px',
      },
      '& .activity-details': {
        '& img': {
          width: '100%',
        },
        '& .activity-body': {
          padding: '15px 10px',
          borderLeft: '1px solid #ddd',
          borderRight: '1px solid #ddd',
          borderBottom: 'solid 1px #ddd',
          borderRadius: '0px 0px 3px 3px',
        },
        '& .time-horizontal': {
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '5px',
          fontSize: '11px',
          '& .icon-value': {
            display: 'inharit',
            fontSize: '11px',
            '& svg': {
              marginRight: '5px',
            },
          },
        },
        '& .progress-card': {
          textAlign: 'center',
        },
      },
      '& .ant-progress-bg': {
        height: '4px !important',
      },
      '@media (max-width: 768px)': {
        padding: '10px !important',
      },
    };
  },
};
