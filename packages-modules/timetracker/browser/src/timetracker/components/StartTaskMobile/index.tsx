import React, { useState } from 'react';
import { Loading } from '../../components/Loading';
import ModalPortal from '../../components/ModalPortal';
import { StartEditTaskModal } from '../../components/StartEditTaskModal';
import { useFela } from 'react-fela';

const PlayIcon = ({ className, onClick }) => (
  <svg
    className={className}
    onClick={onClick}
    viewBox="24 20 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d)">
      <circle cx="49" cy="45" r="25" fill="#27AE60" />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M58.1441 43.4936L45.7085 35.1956C45.3409 34.9638 44.8844 35.0024 44.5396 35.0024C43.1606 35.0024 43.1667 36.13 43.1667 36.4157V53.3759C43.1667 53.6174 43.1606 54.7893 44.5396 54.7893C44.8844 54.7893 45.341 54.8277 45.7085 54.596L58.144 46.2981C59.1647 45.6549 58.9884 44.8958 58.9884 44.8958C58.9884 44.8958 59.1648 44.1367 58.1441 43.4936Z"
      fill="white"
    />
    <defs>
      <filter
        id="filter0_d"
        x="0"
        y="0"
        width="98"
        height="98"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="12" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

const StopIcon = ({ className, onClick }) => (
  <svg
    className={className}
    onClick={onClick}
    viewBox="0 0 47 47"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <circle cx="23.5" cy="23.5" r="23.5" fill="#EB5757" />
    <rect
      x="15.6666"
      y="15.6666"
      width="15.6667"
      height="15.6667"
      rx="2"
      fill="white"
    />
  </svg>
);

export const StartTaskMobile = (props) => {
  const { css } = useFela(props);
  const [isStoppingTask, setIsStoppingTask] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const { timerTick, currentTimer, isMobile } = props;

  const handleStopTask = (event) => {
    setIsStoppingTask(true);
    //     this.setState(
    //         {
    //             isStoppingTask: true,
    //         },
    //         () => stopTimerSocket()
    //     );
  };
  const disableShowModal = (event) => {
    setShowModal(false);
  };
  const handleStartTask = (event) => {
    const { setSwipedTaskAction } = props;
    setSwipedTaskAction(null);
    setShowModal(true);
  };
  return (
    <div className={css(styleSheet.startTaskMobile)}>
      {currentTimer ? (
        <div className="current-task-mobile">
          <div className="current-task-mobile__task-info">
            <div className="current-task-mobile__task-timer">
              {timerTick ? timerTick : '00:00:00'}
            </div>
            <div className="current-task-mobile__task-name">
              {currentTimer.issue}
            </div>
          </div>
          <Loading
            mode="overlay"
            flag={isStoppingTask}
            withLogo={false}
            width="50px"
            height="50px">
            <StopIcon
              className="current-task-mobile__stop-icon"
              onClick={handleStopTask}
            />
          </Loading>
        </div>
      ) : (
        <>
          {showModal ? (
            <ModalPortal>
              <StartEditTaskModal disableShowModal={disableShowModal} />
            </ModalPortal>
          ) : (
            <PlayIcon
              className="play-icon-large-mobile"
              onClick={handleStartTask}
            />
          )}
        </>
      )}
    </div>
  );
};

const styleSheet: any = {
  startTaskMobile: (props) => ({
    position: 'relative',
    '& .play-icon-large-mobile': {
      position: 'fixed',
      zIndex: '5',
      width: '5rem',
      height: '5rem',
      bottom: '1.5rem',
      right: '2.5rem',
      borderRadius: '50%',
      boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.25)',
    },
    '& .current-task-mobile': {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      color: '#ffffff',
      '& .current-task-mobile__task-info': {
        display: 'flex',
        flexGrow: '1',
        margin: '0 1rem 0 0',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      },
      '& .current-task-mobile__task-timer': {
        fontSize: '1.8rem',
        margin: '0 0 0.7rem 0',
      },
      '& .current-task-mobile__task-name': {
        fontSize: '1.4rem',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        maxWidth: '100%',
      },
      '& .current-task-mobile__stop-icon-wrapper': {
        position: 'relative',
        display: 'inline-block',
      },
      '& .current-task-mobile__stop-icon': {
        minWidth: '5rem',
        minHeight: '5rem',
      },
    },
  }),
};
