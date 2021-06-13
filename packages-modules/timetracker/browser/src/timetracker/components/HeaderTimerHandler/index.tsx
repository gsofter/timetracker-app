import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FieldTimeOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { Button } from 'antd';
import { useFela } from 'react-fela';
import { get } from 'lodash';
import moment from 'moment';
import { styleSheet } from './style';
import TimerWidget from './TimerWidget';
import { useStopwatch } from 'react-timer-hook';
import { currentTimerSelector, resetCurrentTimerAction, setCurrentTimerAction } from '@admin-layout/timetracker-core';
import { useGetProjectsQuery } from '../../../generated-models'; // convert to Lazy Loading

const HeaderTimerHandler: React.FC = (props) => {
  const { css } = useFela();
  const [visiblity, setVisiblity] = useState<boolean>(false);
  const dispatch = useDispatch();
  const currentTimer = useSelector(currentTimerSelector);
  const [startTimer, setStartTimer] = useState<boolean>();
  const { data: projectsData, loading: loadingProjects } = useGetProjectsQuery();
  const projects = get(projectsData, 'getProjects', [] as any);
  const { reset, hours, minutes, seconds } = useStopwatch({ autoStart: false, offsetTimestamp: 0 });
  const hidePopover = () => {
    setVisiblity(false);
  }

  useEffect(() => {
    if (currentTimer && (currentTimer.startTime === null || currentTimer.endTime !== null)) {
      if (startTimer) {
        reset(0, false);
        setStartTimer(false);
      }
    } else {
      const passDur = moment().valueOf() - moment(currentTimer.startTime).valueOf();
      const currentDate = new Date();
      const stopwatchOffset = currentDate.setSeconds(currentDate.getSeconds() + passDur/1000);
      reset(stopwatchOffset);
      setStartTimer(true);
    }
  }, [currentTimer]);

  const onChangeTrack = () => {
    if (currentTimer.startTime === null) {
      dispatch(setCurrentTimerAction({
        endTime: null,
        startTime: new Date,
        projectId: 'testProject',
        taskId: 'testTask',
        id: '#1'
      }));
    } else {
      dispatch(resetCurrentTimerAction());
    }
  }

  const timerValue = `${hours}:${minutes}:${seconds}`;
  return (
    <>
      <Draggable
        handle="._handler"
        defaultPosition={{ x: 110, y: 60 }}
        position={null}
        grid={[25, 25]}
        scale={1}
        bounds=".ant-layout:not(.ant-layout-has-sider)"
      >
        <div
          hidden={!visiblity}
          className={'_handler'}
          style={{ zIndex: 999, position: 'absolute' }}
        >
          <TimerWidget
            projects={projects}
            onClose={hidePopover}
            onTrack={onChangeTrack}
            trackStarted={currentTimer.startTime}
            timeDuration={timerValue}
          />
        </div>
      </Draggable>

      <Button
        className={css(styleSheet.button)}
        type={currentTimer.startTime ? 'primary' : 'default'}
        icon={
          <FieldTimeOutlined className={css(styleSheet.icon)} />
        }
        onClick={() => setVisiblity(!visiblity)}
      >
        {timerValue}
      </Button>
    </>
  )
}

export default HeaderTimerHandler;
