import React, { useEffect } from 'react';
import { Moment } from 'moment';
import { message, Spin } from 'antd';
import {
  ITimesheetCreateRequest,
  IProjects as IProject,
  ITimeRecordRequest,
  ITimeRecord,
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
  tags: any;
  members: any;
  localizer: any;
  weekStart: Moment;
  selectedUser: string;
  selectedProject: string;
  setPathWeekStart: Function;
}
import * as _ from 'lodash';

const filterTimeRecords = (records: Array<ITimeRecord>, filterOptions: any): Array<ITimeRecord> => {
  const { selectedUser, selectedProject, approval } = filterOptions;
  if (!records) return [];
  return records
    .filter(
      (ev) =>
        (ev.userId === selectedUser || selectedUser === '') &&
        (ev.projectId === selectedProject || selectedProject === '__all') &&
        (approval === undefined ? true : approval ? !!ev.timesheetId : !ev.timesheetId)
        ,
    )
};

const TabularCalendarWrapper = ({
  projects,
  weekStart,
  selectedUser,
  selectedProject,
  setPathWeekStart,
}: ITabularCalendarWrapperProps) => {
  const { data, loading, refetch, error } = useGetDurationTimeRecordsQuery({
    variables: {
      startTime: weekStart,
      endTime: moment(weekStart).add(1, 'week'),
    },
  });

  const {
    data: approvalData,
    loading: loadingApproval,
    refetch: refetchApproval,
  } = useGetDurationTimesheetsQuery({
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

  const [createMutation] = useCreateTimeRecordMutation();
  const [updateMutation] = useUpdateTimeRecordMutation();
  const [removeMutation] = useRemoveDurationTimeRecordsMutation();
  const [createTimesheetMutation] = useCreateTimesheetMutation();
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
    return _.get(approvalData, 'getDurationTimesheets', []).find(
      (sheet) => sheet.userId === selectedUser,
    );
  };

  const projectsApproval = () => {
    let approvedSet = new Set<string>()
    let unApprovedSet = new Set<string>()
    filterTimeRecords(data?.getDurationTimeRecords, {selectedUser, selectedProject})
      .forEach(record => {
        if(!!record.timesheetId)
          approvedSet.add(record.projectId)
        else
          unApprovedSet.add(record.projectId)
      })
    return {
      approvals: Array.from(approvedSet.values()),
      unApprovals: Array.from(unApprovedSet.values())
    }
  }

  const getProjectsMap = () => {
    const projectsMap = new Map<string, IProject>()
    projects.forEach(project => {
      projectsMap.set(project.id, project)
    })
    return projectsMap
  }

  return (
    <Spin spinning={!data || loading}>
      <TabularCalendar
        weekStart={weekStart}
        setPathWeekStart={setPathWeekStart}
        records={filterTimeRecords(data?.getDurationTimeRecords, { selectedUser, selectedProject})}
        projects={projects}
        projectsMap={getProjectsMap()}
        projectsApproval={projectsApproval()}
        timesheet={memberTimesheet()}
        selectedUser={selectedUser}
        handleRemoveDuration={handleRemoveDuration}
        createTimeRecord={createTimeRecord}
        updateTimeRecord={updateTimeRecord}
        createTimesheet={createTimesheet}
      />
    </Spin>
  );
};

export default TabularCalendarWrapper;
