import React, { useState } from 'react';
import { PageContainer } from '@admin-layout/components';
import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import TabularCalendar from './TabularCalendar';
import TimesheetCalendar from './TimesheetCalendar';
import { Row, Col, Switch } from 'antd';
import CSS from 'csstype';
enum VIEW_MODE {
  CALENDAR_VIEW,
  TABULAR_VIEW,
}

export interface IProject {
  id: string;
  name: string;
  tasks: any;
}

const members = [
  {
    id: 'user1',
    name: 'userA',
  },
  { id: 'user2', name: 'userB' },
];

const projects: Array<IProject> = [
  {
    id: 'project1',
    name: 'projectA',
    tasks: [
      { id: 'task1', name: 'PATaskA' },
      { id: 'task2', name: 'PATaskB' },
    ],
  },
  {
    id: 'project2',
    name: 'projectB',
    tasks: [
      { id: 'task1', name: 'PBTaskA' },
      { id: 'task2', name: 'PBTaskB' },
    ],
  },
];

const tags = [
  { id: 'tag1', name: 'TagA', active: true },
  { id: 'tag2', name: 'TagB', active: true },
];

const TimesheetPage = () => {
  const [viewMode, setViewMode] = useState(VIEW_MODE.CALENDAR_VIEW);
  const handleChangeViewMode = checked => {
    setViewMode(checked ? VIEW_MODE.CALENDAR_VIEW : VIEW_MODE.TABULAR_VIEW);
  };
  return (
    <PageContainer>
      <Row align="middle" justify="space-between" style={{ marginBottom: '10px' }}>
        <Col>
          <Switch
            checkedChildren="Calendar View"
            unCheckedChildren="Tabular View"
            checked={viewMode === VIEW_MODE.CALENDAR_VIEW}
            onChange={handleChangeViewMode}
          />
        </Col>
      </Row>
      {viewMode === VIEW_MODE.CALENDAR_VIEW ? (
        <TimesheetCalendar projects={projects} />
      ) : (
        <TabularCalendar projects={projects} members={members} tags={tags} />
      )}
    </PageContainer>
  );
};

export default TimesheetPage;

const styles: { [property: string]: (props) => CSS.Properties } = {
  dateHeader: props => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
    '& .day': {
      fontSize: '3em',
      fontWeight: '500',
      '@media (max-width: 768px)': {
        fontSize: '14px',
      },
    },
    '& .extra': {
      display: 'flex',
      flexDirection: 'column',
      '& .week': {
        fontSize: '1em',
        '@media (max-width: 768px)': {
          fontSize: '12px',
        },
      },

      '& .month': {
        fontSize: '1em',
        '@media (max-width: 768px)': {
          fontSize: '12px',
        },
        color: '#bbb',
      },
    },
    '& .today': {
      color: '#1890ff',
    },
  }),
  greenText: props => ({
    color: 'green',
  }),
  boldText: props => ({
    fontWeight: 'bold',
  }),

  calendarTable: props => ({
    width: '100%',
    background: 'white',
  }),
};
