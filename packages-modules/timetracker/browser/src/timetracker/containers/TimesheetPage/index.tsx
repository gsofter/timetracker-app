import * as _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@admin-layout/components';
import TabularCalendar from './Tabular';
import TimesheetCalendar from './Calendar';
import {
  useGetProjectsQuery,
  useGetTagsQuery,
  useGetOrganizationMembersQuery,
} from '../../../generated-models';
import { Row, Col, Switch, Form, Select, Spin } from 'antd';
import { IProjects as IProject, ITag, IOrgMember } from '@admin-layout/timetracker-core';
import { IPermissionType } from '@adminide-stack/core';
import TimezonePicker from 'react-timezone';
import { momentLocalizer } from 'react-big-calendar';
import moment, { Moment } from 'moment';
import momentZ from 'moment-timezone';
import { useLocation } from 'react-router';
import qs from 'query-string';
import { useHistory } from 'react-router';
import { useFirstWeekDay, useViewPermissions } from '../../hooks';
import { useSelector } from 'react-redux';
interface ITimesheetProps {
  projects: Array<IProject>;
  tags: Array<ITag>;
  members: Array<IOrgMember>;
  localizer: any;
  weekStart: Moment;
  selectedUser: string;
  setSelectedUser: Function;
  setPathWeekStart: Function;
}

const Timesheet = ({
  projects,
  tags,
  members,
  localizer,
  weekStart,
  selectedUser,
  setSelectedUser,
  setPathWeekStart,
}: ITimesheetProps) => {
  const location = useLocation();
  const history = useHistory();
  const parsed = qs.parse(location.search);
  const [selectedProject, setSelectedProject] = useState('');
  const [isShowTimeModal, setIsShowTimeModal] = useState(false);
  const { others: viewOthersPermit } = useViewPermissions();

  const handleChangeViewMode = () => {
    parsed.view = parsed.view === 'calendar' ? 'tabular' : 'calendar';
    history.push({
      pathname: location.pathname,
      search: qs.stringify(parsed),
    });
  };

  const handleSelectTimezone = (timezone) => {
    // setLocalizer(momentLocalizer(moment.tz.setDefault(timezone)));
  };

  const handleChangeProject = (value: string) => {
    setSelectedProject(value);
  };

  const handleChangeSelectedUser = (value) => {
    setSelectedUser(value);
  };

  console.log('selectedUser => ', selectedUser);
  return (
    <PageContainer>
      <Row align="middle" justify="space-between" style={{ marginBottom: '10px' }}>
        <Col>
          <Switch
            checkedChildren="Calendar View"
            unCheckedChildren="Tabular View"
            checked={parsed.view === 'calendar'}
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
        <Col md={4} xs={16}>
          <Form
            labelCol={{ span: 20 }}
            wrapperCol={{ span: 20 }}
            layout="vertical"
            className="sm-screen-size"
          >
            <Form.Item label="Timezone Picker">
              <TimezonePicker
                value="Asia/Yerevan"
                onChange={handleSelectTimezone}
                inputProps={{
                  placeholder: 'Select Timezone...',
                  name: 'timezone',
                }}
              />
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
            <Form.Item label="Members">
              <Select onChange={handleChangeSelectedUser} value={selectedUser}>
                <Select.Option value="__all" key="__all">
                  All
                </Select.Option>
                {members.map((member) => {
                  return (
                    <Select.Option value={member.userId} key={member.userId}>
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
                <Select.Option value="__all">All</Select.Option>
                {projects.map((res) => {
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
      </Row>
      {parsed.view === 'calendar' ? (
        <TimesheetCalendar
          localizer={localizer}
          weekStart={weekStart}
          projects={projects}
          members={members}
          isShowTimeModal={isShowTimeModal}
          selectedUser={selectedUser}
          selectedProject={selectedProject}
          setIsShowTimeModal={setIsShowTimeModal}
          setPathWeekStart={setPathWeekStart}
        />
      ) : (
        <TabularCalendar
          projects={projects}
          members={members}
          tags={tags}
          localizer={localizer}
          weekStart={weekStart}
          setPathWeekStart={setPathWeekStart}
          selectedUser={selectedUser}
          selectedProject={selectedProject}
        />
      )}
    </PageContainer>
  );
};

const TimesheetPage = () => {
  const { data: projectsData, loading: loadingProjects } = useGetProjectsQuery();
  const { data: membersData, loading: loadingMembers } = useGetOrganizationMembersQuery();
  const { data: tagsData, loading: loadingTags } = useGetTagsQuery();
  const { value: dowValue } = useFirstWeekDay();
  const history = useHistory();
  const queryParsed = qs.parse(location.search);
  const userId = useSelector<any>((state) => state.user.auth0UserId) as string;
  const { self: viewSelfPermit, others: viewOtherPermit } = useViewPermissions();

  const weekStart = () => {
    return queryParsed.weekStart ? moment(queryParsed.weekStart) : moment().startOf('week');
  };

  const selectedUser = () => {
    return (
      (queryParsed.username as string) ?? (viewSelfPermit === IPermissionType.Allow ? userId : '')
    );
  };

  useEffect(() => {
    const queryParsed = qs.parse(location.search);
    if (queryParsed.strict === undefined || !queryParsed.strict) {
      queryParsed.weekStart = moment().startOf('week').format('YYYY-MM-DD');
      history.push({
        pathname: location.pathname,
        search: qs.stringify(queryParsed),
      });
    }
  }, [dowValue]);

  const setPathWeekStart = (newWeekStarts: Moment) => {
    const parsed = qs.parse(location.search);
    parsed.weekStart = moment(newWeekStarts).format('YYYY-MM-DD');
    history.push({
      pathname: location.pathname,
      search: qs.stringify(parsed),
    });
  };

  const setSelectedUser = (username: string) => {
    const parsed = qs.parse(location.search);
    parsed.username = username;
    history.push({
      pathname: location.pathname,
      search: qs.stringify(parsed),
    });
  };

  moment.locale('en', {
    week: {
      dow: dowValue, // { dow: 0 } => Monday
    },
  });

  const localizerM = momentLocalizer(moment);
  const filteredProjects = () => {
    return [..._.get(projectsData, 'getProjects', []), { id: '', name: 'UnKnown' }];
  };

  const filteredMembers = () => {
    return _.get(membersData, 'getOrganizationMembers', []).filter((member) => {
      if (viewOtherPermit === IPermissionType.Allow && member.userId !== userId) return true;
      if (viewSelfPermit === IPermissionType.Allow && member.userId === userId) return true;
      return false;
    });
  };

  return (
    <Spin spinning={loadingProjects || loadingMembers || loadingTags}>
      <Timesheet
        projects={filteredProjects()}
        members={filteredMembers()}
        tags={_.get(tagsData, 'getTags', [])}
        localizer={localizerM}
        weekStart={weekStart()}
        selectedUser={selectedUser()}
        setPathWeekStart={setPathWeekStart}
        setSelectedUser={setSelectedUser}
      ></Timesheet>
    </Spin>
  );
};
export { moment };
export default TimesheetPage;
