import React from 'react';
import { useFela } from 'react-fela';

const styleSheet: any = {
  pageHeaderStyle: (props) => ({
    position: 'relative',
    '& .header-wrapper': {
      backgroundColor: '#333333',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '3.2rem',
      '& @media screen and (max-width: 768px)': {
        flexDirection: 'column',
        marginBottom: '2rem',
      },
      '& .header-wrapper__title': {
        fontSize: '26px',
        lineHeight: '3.5rem',
        margin: '0',
        color: '#ffffff',

        '& @media screen and (max-width: 414px)': {
          fontSize: '18px',
        },
      },
      '& .header-wrapper__child': {
        '& @media screen and (max-width: 500px)': {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        },
        '& .header-wrapper-button': {
          display: 'inline-block',
          padding: '10px 30px',
          fontFamily: '"Open Sans", sans-serif',
          fontStyle: 'normal',
          fontWeight: 'bold',
          lineHeight: 'normal',
          fontSize: '14px',
          color: '#ffffff',
          backgroundColor: '#27ae60',
          outline: 'none',
          cursor: 'pointer',
          borderRadius: '4px',
          textDecoration: 'none',
          '& @media screen and (max-width: 414px)': {
            padding: '10px',
            fontSize: '12px',
          },
        },
        '& .header-wrapper-button:nth-child(2)': {
          marginLeft: '10px',

          '& @media screen and (max-width: 500px)': {
            marginLeft: '0',
            marginTop: '10px',
          },
        },
      },
    },
  }),
};

const PageHeader = ({ title, children, disabledTitle }) => {
  const { css } = useFela();
  return (
    <div className={css(styleSheet.pageHeaderStyle)}>
      <div className="header-wrapper">
        {!disabledTitle && <h1 className="header-wrapper__title">{title}</h1>}
        <div className="header-wrapper__child">{children}</div>
      </div>
    </div>
  );
};

export default PageHeader;
