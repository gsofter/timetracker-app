import React from 'react';
import { useFela } from 'react-fela';

const animation_cat =
  'https://time.wobbly.me/static/media/animation_cat.c029217e.gif';

const styleSheet: any = {
  BlankListComponent: (props) => ({
    position: 'relative',
    '& .cat-wrapper': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    '& .animation-cat': {
      width: '230px',
      height: '250px',
      position: 'relative',
      right: '-30px',
    },
    '& .animation-cat-comment': {
      color: '#ffffff',
      textAlign: 'center',
      fontFamily: 'Open Sans',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '18px',
      lineHeight: '22px',
      position: 'relative',
      marginTop: '-50px',
    },
    '& @media screen and (max-width: 1024px)': {
      '& .animation-cat': {
        right: '-40px',
      },
    },
    '& @media screen and (max-width: 414px)': {
      '& .animation-cat': {
        width: '50%',
        height: '70%',
        right: '-20px',
      },
      '& .animation-cat-comment': {
        top: '40px',
        fontSize: '16px',
        marginTop: '-70px',
      },
    },
  }),
};

export const BlankListComponent = (text, subtext, position) => {
  const { css } = useFela();
  return (
    <div className={css(styleSheet.BlankListComponent)}>
      <div className="cat-wrapper" style={position}>
        <img
          alt="animation-cat"
          src={animation_cat}
          className={'animation-cat'}
        />
        <p className={'animation-cat-comment'}>
          {text}
          <br />
          {subtext}
        </p>
      </div>
    </div>
  );
};
