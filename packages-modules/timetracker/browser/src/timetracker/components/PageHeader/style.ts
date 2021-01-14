export const styleSheet = {
  pageHeaderStyle: ({ theme }) => {
    const {
      primaryColor,
    } = theme;
    return {
      position: 'relative',
      '& .theme-primary': {
        backgroundColor: primaryColor ? primaryColor : '#1b8efa',
        borderColor: primaryColor ? primaryColor : '#1b8efa',
      },
      '& .header-wrapper': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem',
      },
      '@media screen and (max-width: 768px)': {
        '& .header-wrapper': {
          flexDirection: 'column',
          marginBottom: '2rem',
        },
      },
      '& .header-wrapper__title': {
        fontSize: '26px',
        lineHeight: '3.5rem',
        margin: '0',
        color: '#ffffff',
      },
      '@media screen and (max-width: 500px)': {
        '& .header-wrapper__child': {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        },
        '& .header-wrapper__child-button:nth-child(2)': {
          marginLeft: '0',
          marginTop: '10px',
        },
      },
      '& .header-wrapper__child-button': {
        display: 'inline-block',
        padding: '10px 30px',
        fontStyle: 'normal',
        fontWeight: 'bold',
        lineHeight: 'normal',
        fontSize: '14px',
        color: '#ffffff',
        backgroundColor: primaryColor ? primaryColor : '#1b8efa',
        outline: 'none',
        cursor: 'pointer',
        borderRadius: '4px',
        textDecoration: 'none',
      },
      '@media screen and (max-width: 414px)': {
        '& .header-wrapper__child-button': {
          padding: '10px',
          fontSize: '12px',
        },
        '& .header-wrapper__title': {
          fontSize: '18px',
        },
      },
      '& .header-wrapper__child-button:nth-child(2)': {
        marginLeft: '10px',
      },
    };
  },
};
