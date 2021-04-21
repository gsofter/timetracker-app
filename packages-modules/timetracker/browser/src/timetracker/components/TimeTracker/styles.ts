import { Properties } from 'csstype';

export const styleSheet: { [key: string]: (obj) => Properties } = {
  addTaskStyles: ({ theme }) => {
    const { primaryColor } = theme;
    return {
      position: 'relative',
      '& .add-task': {
        color: '#333',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: '0 0 2.6rem 0',
        padding: '0.7rem 1rem',
        background: '#f0f2f5',
      },
      '& .add-task__input': {
        flexGrow: '1',
        fontSize: '1.4rem',
        lineHeight: '1.9rem',
        color: '#333',
        background: '#f0f2f5',
        border: 'none',
      },
      '& .add-task__input::placeholder': {
        color: '#333',
        fontSize: '16px',
      },
      '& .add-task__sync': {
        cursor: 'pointer',
        width: '20px',
        height: '20px',
        marginRight: '18px',
      },

      '& .add-task__play-icon': {
        '& svg': {
          fontSize: '50px',
          color: primaryColor ? primaryColor : '#1b8efa',
        },
        '&--disabled': {
          '& .add-task__play-icon-circle': {
            fill: primaryColor ? primaryColor : '#1b8efa',
          },
        },
      },

      '& .add-task__duration': {
        fontSize: '1.6rem',
        margin: '0 0.5rem 0 0',
      },

      '& .add-task__stop-icon': {
        '& svg': {
          fontSize: '50px',
          color: 'red',
        },
        '&--disabled': {
          opacity: '0.6',
        },
      },
    };
  },
};
