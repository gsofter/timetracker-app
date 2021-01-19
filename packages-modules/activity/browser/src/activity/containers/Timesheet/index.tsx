import React, { useState } from 'react';
import { PageContainer } from '@admin-layout/components';
import { Timeline, Card, Progress } from 'antd';
import { useFela } from 'react-fela';
import { styleSheet } from './styles';
import { DemoData } from './../../demoData';
import { FileImageOutlined } from '@ant-design/icons';

export interface ITimesheet {}

interface IActivity {
  id: string;
  project_name: string;
  screenshort_url: string;
  taken_screenshort_time: string;
  work_progress: number;
  is_activity: boolean;
}
interface IActivityHours {
  id: string;
  activityHours: string;
  activity: any;
}

export const Timesheet: React.FC<ITimesheet> = ({}) => {
  const [activityList, setActivityList] = useState(DemoData.activityHours);
  const { css } = useFela();
  return (
    <PageContainer>
      <Timeline>
        <div className={css(styleSheet.timesheet)}>
          {activityList.map((item: IActivityHours, index: number) => {
            return (
              <Timeline.Item key={index}>
                <p>
                  {item.activityHours} <span> total time worked: 0:34:39 </span>
                </p>
                <div className="card-outer">
                  {item.activity.map((itemlist: IActivity, itemListid: number) => {
                    if (itemlist.is_activity) {
                      return (
                        <div className="activity-card" key={itemListid}>
                          <h4>{itemlist.project_name}</h4>
                          <p>No to-dos</p>
                          <Card bordered={false}>
                            <div className="activity-details">
                              <img src={itemlist.screenshort_url} alt="Timer-img" />
                              <div className="activity-body">
                                <div className="time-horizontal">
                                  <span className="time">{itemlist.taken_screenshort_time}</span>
                                  <span className="icon-value">
                                    <FileImageOutlined />
                                    X2
                                  </span>
                                </div>
                                <div className="progress-card">
                                  <Progress
                                    percent={itemlist.work_progress}
                                    showInfo={false}
                                    strokeColor={
                                      itemlist.work_progress > 50 ? '#6ed158' : '#f5a23a'
                                    }
                                  />
                                  <p>{itemlist.work_progress}% of 4 minutes</p>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </div>
                      );
                    } else {
                      return (
                        <div className="no-activity">
                          <p>No Activity</p>
                        </div>
                      );
                    }
                  })}
                </div>
              </Timeline.Item>
            );
          })}
        </div>
      </Timeline>
    </PageContainer>
  );
};

export default Timesheet;
