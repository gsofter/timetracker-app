import React from 'react';
import { useFela } from 'react-fela';
import { Properties } from 'csstype';

const styleSheet: { [key: string]: (obj) => Properties } = {
  pageHeaderStyle: ({ theme, primaryColor, layout }) => ({
    position: 'relative',
    '& .header-wrapper': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '3.2rem',
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
      fontFamily: '"Open Sans", sans-serif',
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
    '& button': {
      cursor: 'pointer',
      border: 'none',
      outline: 'none',
    },
  }),
};

export interface IPageHeader {
  title?: any;
  disabledTitle?: any;
}

const PageHeader: React.FC<IPageHeader> = ({
  title,
  children,
  disabledTitle,
}) => {
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
