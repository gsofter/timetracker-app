import * as _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@admin-layout/components';
import TabularCalendar from './TabularCalendar';
import TimesheetCalendar from './TimesheetCalendar';
import {
  useGetProjectsQuery,
  useGetMembersQuery,
  useGetTagsQuery,
} from '../../../generated-models';
import { Row, Col, Switch, Form, Select, Checkbox } from 'antd';
import { IProject, ITag, IMember } from '@admin-layout/timetracker-module-core';
import TimezonePicker from 'react-timezone';
import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import momentZ from 'moment-timezone';
import CSS from 'csstype';

enum VIEW_MODE {
  CALENDAR_VIEW,
  TABULAR_VIEW,
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
    id: '1',
    name: 'projectA',
    tasks: [
      { id: 'task1', name: 'PATaskA' },
      { id: 'task2', name: 'PATaskB' },
    ],
  },
  {
    id: '2',
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

interface ITimesheetProps {
  projects: Array<IProject>;
  tags: Array<ITag>;
  members: Array<IMember>;
}

const Timesheet = ({ projects, tags, members }: ITimesheetProps) => {
  const [viewMode, setViewMode] = useState(VIEW_MODE.CALENDAR_VIEW);
  const [localizer, setLocalizer] = useState(momentLocalizer(moment));
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [openAddTimeModal, setOpenAddTimeModal] = useState(false);

  const handleChangeViewMode = checked => {
    setViewMode(checked ? VIEW_MODE.CALENDAR_VIEW : VIEW_MODE.TABULAR_VIEW);
  };

  const handleSelectTimezone = timezone => {
    setLocalizer(momentLocalizer(moment.tz.setDefault(timezone)));
  };

  const handleChangeProject = (value: string) => {
    setSelectedProject(value);
    const selProject = projects.find(p => p.id === value);
  };

  const handleChangeUser = value => {
    setSelectedUser(value);
  };

  const handleOpenAddTimeModal = () => {
    setOpenAddTimeModal(true);
  };

  const handleCloseAddTimeModal = () => {
    setOpenAddTimeModal(false);
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
      <Row align="middle" justify="space-between" style={{ marginBottom: '10px' }}>
        <Col>
          <div style={{ textAlign: 'center' }}>
            <h3>View & edit timesheets</h3>
          </div>
        </Col>
      </Row>
      <Row align="middle" gutter={[24, 16]}>
        <Col md={6} xs={16} style={{ top: '-10px' }}>
          <span>Select Timezone</span>
          <TimezonePicker
            value="Asia/Yerevan"
            onChange={handleSelectTimezone}
            inputProps={{
              placeholder: 'Select Timezone...',
              name: 'timezone',
            }}
          />
        </Col>
        <Col md={4} xs={16}>
          <Form
            labelCol={{ span: 20 }}
            wrapperCol={{ span: 20 }}
            layout="vertical"
            className="sm-screen-size"
          >
            <Form.Item label="Members">
              <Select onChange={handleChangeUser} value={selectedUser}>
                <Select.Option value="">All</Select.Option>
                {members.map(member => {
                  return (
                    <Select.Option value={member.id} key={member.id}>
                      {member.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Form>
        </Col>
        <Col md={4} xs={16}>
          <Form
            labelCol={{ span: 20 }}
            wrapperCol={{ span: 20 }}
            layout="vertical"
            className="sm-screen-size"
          >
            <Form.Item label="Projects">
              <Select onChange={handleChangeProject} value={selectedProject}>
                <Select.Option value="">All</Select.Option>
                {projects.map(res => {
                  return (
                    <Select.Option value={res.id} key={res.id}>
                      {res.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Form>
        </Col>
        <Col md={4} xs={16}>
          {viewMode === VIEW_MODE.CALENDAR_VIEW ? (
            <div>
              <span style={{ fontWeight: 'bold' }}>
                <a onClick={handleOpenAddTimeModal}>Add Time</a>
              </span>
            </div>
          ) : (
            ''
          )}
        </Col>
      </Row>
      {viewMode === VIEW_MODE.CALENDAR_VIEW ? (
        <TimesheetCalendar
          localizer={localizer}
          projects={projects}
          members={members}
          showAddTimeModal={openAddTimeModal}
          selectedUser={selectedUser}
          selectedProject={selectedProject}
          handleChangeProject={handleChangeProject}
          handleChangeUser={handleChangeUser}
          handleOpenAddTimeModal={handleOpenAddTimeModal}
          handleCloseAddTimeModal={handleCloseAddTimeModal}
        />
      ) : (
        <TabularCalendar projects={projects} members={members} tags={tags} />
      )}
    </PageContainer>
  );
};

const TimesheetPage = () => {
  const { data: projectsData, loading: loadingProjects } = useGetProjectsQuery();
  const { data: membersData, loading: loadingMembers } = useGetMembersQuery();
  const { data: tagsData, loading: loadingTags } = useGetTagsQuery();
  return loadingProjects || loadingMembers || loadingTags ? (
    <></>
  ) : (
    <Timesheet
      projects={_.get(projectsData, 'getProjects', [])}
      members={_.get(membersData, 'getMembers', [])}
      tags={_.get(tagsData, 'getTags', [])}
    ></Timesheet>
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
