import React, { useEffect } from 'react';
import { Moment } from 'moment';
import { message, Spin, Row, Col, Button } from 'antd';
import {
  ITimesheetCreateRequest,
  IProjects as IProject,
  ITimeRecordRequest,
  ITimeRecord,
  IOrgMember,
} from '@admin-layout/timetracker-core';
import {
  useGetDurationTimeRecordsQuery,
  useGetDurationTimesheetsQuery,
  useRemoveDurationTimeRecordsMutation,
  useUpdateTimeRecordMutation,
  useCreateTimeRecordMutation,
  useCreateTimesheetMutation,
} from '../../../../generated-models';
import { moment } from '../../TimesheetPage';

import { TabularCalendar } from './TabularCalendar';
interface ITabularCalendarWrapperProps {
  projects: IProject[];
  members: Array<IOrgMember>;
  localizer: any;
  weekStart: Moment;
  selectedUser: string;
  selectedProject: string;
  setPathWeekStart: Function;
}
import * as _ from 'lodash';

interface IFilterOptions {
  selectedUser?: string;
  selectedProject?: string;
  approval?: boolean;
  members?: Array<IOrgMember>;
}

const filterTimeRecords = (records: Array<ITimeRecord>, filterOptions: IFilterOptions): Array<ITimeRecord> => {
  const { selectedUser, selectedProject, approval, members } = filterOptions;
  if (!records) return [];
  const memStrArr = members.map((mem) => mem.userId);
  return records
    .filter(
      (ev) =>
        (ev.userId === selectedUser || selectedUser === '__all') &&
        (ev.projectId === selectedProject || selectedProject === '__all') &&
        (approval === undefined ? true : approval ? !!ev.timesheetId : !ev.timesheetId),
    )
    .filter((record) => memStrArr.includes(record.userId));
};

const TabularCalendarWrapper = ({
  projects,
  weekStart,
  selectedUser,
  members,
  selectedProject,
  setPathWeekStart,
}: ITabularCalendarWrapperProps) => {
  const { data, loading: loadingRecords, refetch, error } = useGetDurationTimeRecordsQuery({
    variables: {
      startTime: weekStart,
      endTime: moment(weekStart).add(1, 'week'),
    },
  });

  const { data: approvalData, loading: loadingApproval, refetch: refetchApproval } = useGetDurationTimesheetsQuery({
    variables: {
      start: moment(weekStart),
      end: moment(weekStart).add(1, 'week'),
    },
  });

  const reloadData = () => {
    refetch();
    refetchApproval();
  };

  useEffect(() => {
    reloadData();
  }, [weekStart]);

  const [createMutation, { loading: loadingCreate }] = useCreateTimeRecordMutation();
  const [updateMutation, { loading: loadingUpdate }] = useUpdateTimeRecordMutation();
  const [removeMutation, { loading: loadingRemove }] = useRemoveDurationTimeRecordsMutation();
  const [createTimesheetMutation, { loading: loadingCreateTimesheet }] = useCreateTimesheetMutation();
  const handleRemoveDuration = (pId) => {
    removeMutation({
      variables: {
        startTime: moment(weekStart),
        endTime: moment(weekStart).add(1, 'week'),
        projectId: pId,
      },
    })
      .then(() => {
        message.success('Removed');
        refetch();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // create time record
  const createTimeRecord = (request: ITimeRecordRequest) => {
    createMutation({ variables: { request } })
      .then(() => {
        message.success('TimeRecord created');
        refetch();
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  // update time record
  const updateTimeRecord = (recordId: string, request: ITimeRecordRequest) => {
    updateMutation({ variables: { recordId, request } })
      .then(() => {
        message.success('TimeRecord Updated');
        refetch();
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  // create timeSheet
  const createTimesheet = (request: ITimesheetCreateRequest) => {
    createTimesheetMutation({ variables: { request } })
      .then(() => {
        refetchApproval();
        message.success('Timesheet Created');
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const memberTimesheet = () => {
    return _.get(approvalData, 'getDurationTimesheets', []).find((sheet) => sheet.userId === selectedUser);
  };

  const projectsApproval = () => {
    let approvedSet = new Set<string>();
    let unApprovedSet = new Set<string>();
    filterTimeRecords(data?.getDurationTimeRecords, {
      selectedUser,
      selectedProject,
      members,
    }).forEach((record) => {
      if (!!record.timesheetId) approvedSet.add(record.projectId);
      else unApprovedSet.add(record.projectId);
    });
    return {
      approvals: Array.from(approvedSet.values()),
      unApprovals: Array.from(unApprovedSet.values()),
    };
  };

  const getProjectsMap = () => {
    const projectsMap = new Map<string, IProject>();
    projects.forEach((project) => {
      projectsMap.set(project.id, project);
    });
    return projectsMap;
  };

  const onClickBack = (event) => {
    event.preventDefault();
    const newWeekStart = moment(weekStart).add('-1', 'week');
    setPathWeekStart(newWeekStart);
  };

  const onClickNext = (event) => {
    event.preventDefault();
    const newWeekStart = moment(weekStart).add('1', 'week');
    setPathWeekStart(newWeekStart);
  };

  const onClickToday = (event) => {
    event.preventDefault();
    const newWeekStart = moment().startOf('week');
    setPathWeekStart(newWeekStart);
  };

  return (
    <Spin
      spinning={
        !data ||
        loadingRecords ||
        loadingApproval ||
        loadingCreate ||
        loadingUpdate ||
        loadingRemove ||
        loadingCreateTimesheet
      }
    >
      <Row className="toolBar">
        <Col xs={24} md={6} className="control">
          <Button onClick={onClickToday}> Today </Button>
          <Button onClick={onClickBack}> Back </Button>
          <Button onClick={onClickNext}> Next </Button>
        </Col>
        <Col xs={24} md={12} style={{ textAlign: 'center' }}>
          <span className="duration-start"> {moment(weekStart).format('MMMM DD')}</span> -
          <span className="duration-end">
            {moment(weekStart).format('MM') === moment(weekStart).add(1, 'week').format('MM')
              ? moment(weekStart).add(1, 'week').format('DD')
              : moment(weekStart).add(1, 'week').format('MMMM DD')}
          </span>
        </Col>
        <Col xs={24} md={6} className="control" style={{ textAlign: 'right' }}>
          <Button> Day </Button>
          <Button> Week </Button>
          <Button> Month </Button>
        </Col>
      </Row>
      {selectedUser !== '__all' ? (
        <TabularCalendar
          weekStart={weekStart}
          records={filterTimeRecords(data?.getDurationTimeRecords, {
            selectedUser,
            selectedProject,
            members,
          })}
          projects={projects}
          projectsMap={getProjectsMap()}
          projectsApproval={projectsApproval()}
          timesheet={memberTimesheet()}
          selectedUser={selectedUser}
          loading={
            loadingRecords ||
            loadingApproval ||
            loadingCreate ||
            loadingUpdate ||
            loadingRemove ||
            loadingCreateTimesheet
          }
          handleRemoveDuration={handleRemoveDuration}
          createTimeRecord={createTimeRecord}
          updateTimeRecord={updateTimeRecord}
          createTimesheet={createTimesheet}
        />
      ) : (
        members.map((mem) => {
          return (
            <TabularCalendar
              key={mem.userId}
              weekStart={weekStart}
              records={filterTimeRecords(data?.getDurationTimeRecords, {
                selectedUser: mem.userId,
                selectedProject,
                members,
              })}
              projects={projects}
              projectsMap={getProjectsMap()}
              projectsApproval={projectsApproval()}
              timesheet={memberTimesheet()}
              selectedUser={mem.userId}
              loading={
                loadingRecords ||
                loadingApproval ||
                loadingCreate ||
                loadingUpdate ||
                loadingRemove ||
                loadingCreateTimesheet
              }
              handleRemoveDuration={handleRemoveDuration}
              createTimeRecord={createTimeRecord}
              updateTimeRecord={updateTimeRecord}
              createTimesheet={createTimesheet}
            />
          );
        })
      )}
    </Spin>
  );
};

export default TabularCalendarWrapper;
