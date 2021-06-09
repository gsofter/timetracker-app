import React, { useState } from 'react';
import TimerWidget from './TimerWidget';
import { useDispatch, useSelector } from 'react-redux';
import { resetCurrentTimerAction, setCurrentTimerAction } from '../../../redux/actions/TimeWidgetAction';
import { currentTimerSelector } from '../../../redux/selector/TimeWidgetSelector';
import WeeklyRecord from './WeeklyRecord';
import { msToHMS } from '../../../utils/timeConverter';

export interface dailyLog {
  dates: string;
  duration: number;
  title: string;
  price: number;
  description: string;
}
export interface weeklyLog {
  dates: string;
  duration: number;
  days: dailyLog[];
}
interface timeLog {
  id: string;
  weeklyLogs: weeklyLog[];
}

const TrayTimerHandler: React.FC = (props) => {
  const dispatch = useDispatch();
  const currentTimer = useSelector(currentTimerSelector);
  const [timeDuration, setTimeDuration] = useState<number>(0);

  const onChangeTrack = () => {
    console.log('----START TIMER', currentTimer);
    if (currentTimer.startTime === null) {
      dispatch(setCurrentTimerAction({
        endTime: null,
        startTime: new Date,
        projectId: 'testProject',
        taskId: 'testTask',
        id: '#1'
      }));
    } else {
      console.log('--DISPATCH')
      dispatch(resetCurrentTimerAction());
    }
  }

  const calculateTimeDuration = () => {
    const now = new Date().getTime();
    const statedTime = new Date(currentTimer.startTime).getTime();

    setTimeDuration((currentTimer.startTime === null) ? 0 : now - statedTime);
  }

  setTimeout(() => {
    calculateTimeDuration();
  }, 1000);

  const timeLog: timeLog = {
    id: '#1',
    weeklyLogs: [
      {
        dates: 'Apr 26 - May 02',
        duration: 10 * 3600 + 47 * 60 + 23,
        days: [
          {
            dates: "Mon 26 Apr'21",
            duration: 10 * 3600 + 47 * 60 + 23,
            title: 'Title',
            price: 1000,
            description: 'description apr 26'
          }
        ]
      },
      {
        dates: 'May 03 - May 09',
        duration: 6 * 3600 + 47 * 60 + 23,
        days: [
          {
            dates: `Mon 04 May'21`,
            duration: 4 * 3600 + 30 * 60 + 48,
            title: 'title May 04',
            price: 1000,
            description: 'description May 04'
          },
          {
            dates: `Wed 06 May'21`,
            duration: 1 * 3600 + 30 * 60 + 48,
            title: 'title May 06',
            price: 1000,
            description: 'descriotion May 04'
          }
        ]
      }
    ]
  }

  return (
    <div>
      <TimerWidget
        onTrack={onChangeTrack}
        trackStarted={currentTimer.startTime}
        timeDuration={msToHMS(timeDuration)}
      />
      <div className="time-logs">
        {timeLog.weeklyLogs.map((log: weeklyLog) => <WeeklyRecord log={log} />)}
      </div>
    </div>
  )
}

export default TrayTimerHandler;