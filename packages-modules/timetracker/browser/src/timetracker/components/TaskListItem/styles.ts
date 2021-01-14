import { Property, Properties } from 'csstype';

export const styleSheet: { [key: string]: (obj) => Properties } = {
  TaskListItem: ({ theme }) => {
    const { primaryColor } = theme;
    return {
      position: 'relative',
      '& .site-calendar-card': {
        width: '300px',
        border: '1px solid #f0f0f0',
        borderRadius: '2px',
        position: 'absolute',
        top: '100%',
        display: 'block',
        right: '0',
        zIndex: 1,
        animation: 'slowVisibility 0.3s',
        backgroundColor: 'white',
        padding: '20px',

        '& .ant-picker': {
           width: '100%',
           marginTop: '10px'
        },
        '& .dataPicker--button': {
          display: 'flex',
        },
        '& Button': {
          marginTop: '10px',
          marginRight: '10px',
          backgroundColor: primaryColor ? primaryColor : '#231890ff',
          borderColor: primaryColor ? primaryColor : '#231890ff',
        }
      },
      '& .ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date': {
        height: '50px',
      },
      '& .edit-task-popup': {
        display: 'block',
        position: 'absolute',
        top: '130%',
        right: '0',
        backgroundColor: 'white',
        borderRadius: '0.4rem',
        color: 'black',
        zIndex: '1',
        animation: 'slowVisibility 0.3s',
        padding: '20px',
      },
      '& .task-item': {
        position: 'relative',
        minWidth: '100%',
        fontSize: '1.4rem',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: '0 0 1rem',
        padding: '1.5rem 2rem 1.5rem 1.5rem',
        borderRadius: '.4rem',
        color: '#333',
        lineHeight: '1.8rem',
      },
      '& .task-item:last-child': {
        margin: '0',
      },
      '& .task-item--selected': {
        backgroundColor: '#fff',
      },
      '& .task-item.task-item--selected .task-item__edit-wrapper': {
        display: 'flex',
      },
      '& .task-item.task-item--selected .task-item__duration-time': {
        margin: '0 1rem 0 0',
      },
      '& .task-item:not(.task-item--disabled):not(.task-item--selected):not(.task-item--mobile):hover': {
        backgroundColor: '#fff',
      },
      '& .task-item:not(.task-item--disabled):not(.task-item--selected):not(.task-item--mobile):hover .task-item__edit-wrapper': {
        display: 'flex',
      },
      '& .task-item:not(.task-item--disabled):not(.task-item--selected):not(.task-item--mobile):hover .task-item__duration-time': {
        margin: '0 1rem 0 0',
      },
      '& .task-item .task-item__issue': {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        margin: '0 1rem 0 0',
        outline: 'none',
      },
      '& .task-item .task-item__issue--editing': {
        textOverflow: 'unset',
      },
      '& .task-item ': {
        margin: '0 1rem 0 0',
        whiteSpace: 'nowrap',
      },
      '& .task-item__period-time': {
        margin: '0 1rem 0 0',
        whiteSpace: 'nowrap',
      },
      '& .task-item .task-item__duration-time': {
        margin: '0',
        whiteSpace: 'nowrap',
      },
      '& .task-item .task-item__edit-wrapper': {
        position: 'relative',
        display: 'none',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      },
      '& .task-item:not(.task-item--disabled):not(.task-item--selected)': {
        display: 'flex',
      },
      '& .task-item__edit-wrapper': {
        display: 'flex',
      },
      '& .task-item .task-item__play-icon': {
        margin: '0 1rem 0 0',
        cursor: 'pointer',
        '& svg': {
            color: primaryColor ? primaryColor : '#0a7b3e',
        }
    },
    '& .task-item .task-item__edit-icon': {
        cursor: 'pointer',
        margin: '0 1rem 0 0',
        fill: '#6fcf97',
        width: '1.5rem',
        height: '1.5rem',
        '& svg': {
            color: primaryColor ? primaryColor : '#0a7b3e',
        }
      },
      '& .task-item .task-item__delete-icon': {
        cursor: 'pointer',
      },
      '& .task-item-swipe--swiped .task-item--mobile': {
        left: '-50%',
      },
      '& .task-item--mobile': {
        padding: '1.2rem 1rem 1.2rem 1rem',
        backgroundColor: '#4f4f4f',
        borderRadius: '0',
        zIndex: '2',
        left: '0',
        transition: 'left 0.2s linear',
        margin: '0',
      },
      '& .task-item--mobile .task-item__period-time': {
        display: 'none',
      },
      '& .task-item--mobile .task-item__duration-time': {
        display: 'none',
      },
      '& .task-item--mobile .task-item__edit-wrapper': {
        position: 'static',
        display: 'flex',
        flexDirection: 'column',
      },
      '& .task-item--mobile .task-item__duration-time-mobile': {
        display: 'inline-block',
        margin: '0 0 0.5rem 0',
        fontSize: '1.2rem',
        color: '#b8b8b8',
        whiteSpace: 'nowrap',
      },
      '& .task-item--mobile .task-item__play-icon': {
        margin: 0,
      },
      '& .task-item--mobile .task-item__edit-icon': {
        display: 'none',
      },
      '& .task-item--mobile .task-item__delete-icon': {
        display: 'none',
      },
      '& .task-item-swipe': {
        position: 'relative',
        color: '#ffffff',
      },
      '& .task-item-swipe .task-item__bottom-layer': {
        position: 'absolute',
        display: 'flex',
        zIndex: '1',
        top: '0',
        right: '0',
        bottom: '0',
        width: '50%',
        fontFamily: '"Roboto", sans-serif',
        fontWeight: '500',
        fontSize: '1rem',
        lineHeight: '1.4rem',
      },
      '& .task-item-swipe .task-item__bottom-layer .task-item__bottom-layer-edit-button': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        minWidth: '50%',
        background: '#f2994a',
      },
      '& .task-item-swipe .task-item__bottom-layer .task-item__bottom-layer-edit-button-icon': {
        width: '1.9rem',
        height: '2rem',
        fill: '#ffffff',
        margin: '0 0 0.5rem 0',
      },
      '& .task-item-swipe .task-item__bottom-layer .task-item__bottom-layer-delete-button': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        minWidth: '50%',
        background: '#eb5757',
      },
      '& .task-item-swipe .task-item__bottom-layer .task-item__bottom-layer-delete-button-icon': {
        width: '1.8rem',
        height: '2rem',
        margin: '0 0 0.5rem 0',
      },
      '& .issue_width': {
        display: 'flex',
      },
    };
  },
};
