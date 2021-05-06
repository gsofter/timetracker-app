import React, { useState, useRef } from 'react';
import Swipe from 'react-easy-swipe';
import { useFela } from 'react-fela';

const slide1 = 'https://time.wobbly.me/static/media/Onboarding1.65e565d2.png';
const slide2 = 'https://time.wobbly.me/static/media/Onboarding1.65e565d2.png';
const slide3 = 'https://time.wobbly.me/static/media/Onboarding1.65e565d2.png';
const slide4 = 'https://time.wobbly.me/static/media/Onboarding1.65e565d2.png';
const slide5 = 'https://time.wobbly.me/static/media/Onboarding5.bac3b50e.png';
const slide6 = 'https://time.wobbly.me/static/media/Onboarding5.bac3b50e.png';

export interface ITutorialComponent {
  user?: any;
  isMobile?: any;
}

export const TutorialComponent: React.FC<ITutorialComponent> = (props: any) => {
  const { css } = useFela(props);
  const { user, isMobile, children } = props;
  const [swipedTarget, setSwipedTarget] = useState(null);
  const [swipedElements, setSwipedElements] = useState([]);

  const ref = useRef(null);

  const restartTutorial = () => {
    swipedElements.forEach((elem) => elem.classList.remove('swiped'));
    setSwipedElements(swipedElements);
  };

  const toggleSwipe = (event) => {
    setSwipedTarget(event.currentTarget);
  };
  const onSwipeLeft = () => {
    swipedTarget.classList.add('swiped');
    swipedElements.push(swipedTarget);
    setSwipedElements(swipedElements);
  };
  const finishTutorial = async () => {
    // tslint:disable-next-line: no-console
    console.log('here is finish');
    // const { user, changeUserData } = props;
    //     try {
    //             let res = await tutorialChecked(user.id, true);
    //             changeUserData(res.data);
    //         } catch (err) {
    //             console.log(err);
    //         }
  };
  const handleSwiftLeft = (e) => {
    if (e.target.className !== 'skip-link') {
      onSwipeLeft();
    }
  };
  return isMobile ? (
    // tslint:disable-next-line: no-use-before-declare
    <div className={css(styleSheet.tutorialComponent)}>
      <div className="tutorial-container">
        <div className="tutorial-wrapper">
          <div className="slide" style={{ backgroundImage: `url(${slide6})` }}>
            <i className="arrow-back" onClick={restartTutorial} />
            <div className="slide-title">
              <h1>Use wobbly with pleasure</h1>
              <button onClick={finishTutorial}>Get started</button>
            </div>
          </div>
          <Swipe
            innerRef={() => ref}
            className="swiped-elem"
            onSwipeStart={toggleSwipe}
            onSwipeLeft={onSwipeLeft}>
            <div
              className="slide"
              onClick={handleSwiftLeft}
              style={{ backgroundImage: `url(${slide5})` }}>
              <a href="# " onClick={finishTutorial} className="skip-link">
                Skip tutorial
              </a>
              <div
                className="instruction"
                style={{ bottom: '10%', right: '8%' }}>
                <p>Stop the timer when complete the task.</p>
                <i className="arrow-tutorial" />
              </div>
            </div>
          </Swipe>
          <Swipe
            innerRef={() => ref}
            className="swiped-elem"
            onSwipeStart={toggleSwipe}
            onSwipeLeft={onSwipeLeft}>
            <div
              className="slide"
              onClick={handleSwiftLeft}
              style={{ backgroundImage: `url(${slide4})` }}>
              <a href="# " onClick={finishTutorial} className="skip-link">
                Skip tutorial
              </a>
              <div className="instruction" style={{ top: '47%', right: '0%' }}>
                <p style={{ width: '80%' }}>
                  You are ready to start, click on the play button.
                </p>
                <i className="arrow-tutorial" />
              </div>
            </div>
          </Swipe>
          <Swipe
            innerRef={() => ref}
            className="swiped-elem"
            onSwipeStart={toggleSwipe}
            onSwipeLeft={onSwipeLeft}>
            <div
              className="slide"
              onClick={handleSwiftLeft}
              style={{ backgroundImage: `url(${slide3})` }}>
              <a href="# " onClick={finishTutorial} className="skip-link">
                Skip tutorial
              </a>
              <div className="instruction" style={{ top: '37%', right: '13%' }}>
                <p>Choose or create your project.</p>
                <i className="arrow-tutorial" />
              </div>
            </div>
          </Swipe>
          <Swipe
            innerRef={() => ref}
            className="swiped-elem"
            onSwipeStart={toggleSwipe}
            onSwipeLeft={onSwipeLeft}>
            <div
              className="slide"
              onClick={handleSwiftLeft}
              style={{ backgroundImage: `url(${slide2})` }}>
              <a href="# " onClick={finishTutorial} className="skip-link">
                Skip tutorial
              </a>
              <div className="instruction" style={{ top: '26%', right: '13%' }}>
                <p>Enter the name of your task.</p>
                <i className="arrow-tutorial" />
              </div>
            </div>
          </Swipe>
          <Swipe
            innerRef={() => ref}
            className="swiped-elem"
            onSwipeStart={toggleSwipe}
            onSwipeLeft={onSwipeLeft}>
            <div
              className="slide"
              onClick={handleSwiftLeft}
              style={{ backgroundImage: `url(${slide1})` }}>
              <a href="# " className="skip-link">
                Skip tutorial
              </a>
              {/* onClick={finishTutorial} */}
              <div className="slide-title">
                <h1>Wellcome to wobbly!</h1>
                <p>Begin to track your time now</p>
              </div>
              <div
                className="instruction"
                style={{ bottom: '14%', right: '10%' }}>
                <p>To start the timer click on the play button</p>
                <i className="arrow-tutorial" />
              </div>
            </div>
          </Swipe>
        </div>
      </div>
    </div>
  ) : (
    children
  );
};

const styleSheet: any = {
  tutorialComponent: (props) => ({
    position: 'relative',
    '& .tutorial-container': {
      width: '100%',
      height: '100%',
      position: 'fixed',
      top: '9rem',
      background: '#333',
    },
    '& .tutorial-wrapper': {
      backgroundColor: '#fff',
      position: 'fixed',
      top: '9rem',
      width: '100%',
      height: '100%',
      fontFamily: 'Open Sans',
      overflow: 'hidden',
    },
    '& .swiped-elem': {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: '0',
      left: '0',
      transition: 'left 1s ease',
    },
    '& .slide': {
      width: '100%',
      height: '100%',
      display: 'flex',
      color: 'white',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundSize: '100% 100%',
    },
    '& .slide-title': {
      textAlign: 'center',
      width: '100%',
    },
    '& .slide-title h1': {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '26px',
      lineHeight: '33px',
    },
    '& .slide-title p': {
      fontStyle: 'normal',
      fontSize: '15px',
      fontWeight: '600',
    },
    '& .skip-link': {
      position: 'absolute',
      // top: '0',
      fontSize: '14px',
      color: 'white',
      top: '6%',
      right: '4%',
    },
    '& .instruction': {
      position: 'absolute',
      display: 'flex',
    },
    '& .instruction p': {
      margin: '0',
      fontSize: '15px',
      fontWeight: '600',
      paddingRight: '10px',
      textAlign: 'center',
    },
    '& .swiped': {
      left: '-100%',
    },
    '& .arrow-tutorial': {
      background:
        'url("https://time.wobbly.me/static/media/Arrow.bb0290d3.svg") no-repeat center',
      backgroundSize: 'cover',
      height: '50px',
      width: '50px',
    },
    '& .slide-title button': {
      width: '70%',
      fontSize: '15px',
      lineHeight: '1.9rem',
      padding: '1rem 0',
      color: 'white',
      borderRadius: '0.5rem',
      background: '#27ae60',
      marginTop: '2rem',
    },
    '& .arrow-back': {
      background:
        'url("https://time.wobbly.me/static/media/Arrow.bb0290d3.svg") no-repeat center',
      backgroundSize: 'contain',
      height: '24px',
      position: 'absolute',
      top: '8.3%',
      left: '4%',
      width: '24px',
    },
    '& @media screen and (min-width: 414px)': {
      '& .tutorial-wrapper': {
        width: '414px',
        left: '50%',
        transform: 'translate(-50%)',
      },
    },
    '& @media screen and (min-height: 820px)': {
      '& .tutorial-wrapper': {
        height: '820px',
        left: '50%',
        top: '50%',
        webkitTransform: 'translate(-50%)',
        transform: 'translate(-50%,-50%)',
      },
    },
  }),
};
