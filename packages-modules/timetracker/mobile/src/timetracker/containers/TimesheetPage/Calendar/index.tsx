import React, { useState } from 'react';
import TimesheetComponent from './Timesheet';
import {
  useGetTimeRecordsQuery,
  useCreateTimeRecordMutation,
  useUpdateTimeRecordMutation,
  useRemoveTimeRecordMutation,
} from '../../../../generated-models';
import { message, Form, Spin } from 'antd';
import moment, { Moment } from 'moment';
import {
  ITimeRecordRequest,
  IProjects as IProject,
  IOrgMember as IMember,
  ITimeRecord,
} from '@admin-layout/timetracker-core';
import { useSelector } from 'react-redux';
import * as _ from 'lodash';
export interface ITimesheetCalendarProps {
  projects: Array<IProject>;
  members: Array<IMember>;
  selectedUser: string;
  selectedProject: string;
  localizer: any;
  weekStart: Moment;
  isShowTimeModal: boolean;
  setIsShowTimeModal: (value: boolean) => void;
  setPathWeekStart: Function;
}

const defaultRecord: ITimeRecord = {
  id: undefined,
  projectId: undefined,
  userId: undefined,
  startTime: undefined,
  endTime: undefined,
  isBillable: false,
  tags: [],
};

const TimesheetCalendar = ({
  projects,
  members,
  selectedUser,
  selectedProject,
  isShowTimeModal,
  setIsShowTimeModal,
  localizer,
  weekStart,
  setPathWeekStart,
}: ITimesheetCalendarProps) => {
  const [selectedEvent, setSelectedEvent] = useState<ITimeRecord>(defaultRecord);
  const [selectedTask, setSelectedTask] = useState('');
  const [selectableTasks, setSelectableTasks] = useState([]);
  const [addMutation, { loading: loadingAdd }] = useCreateTimeRecordMutation();
  const [updateMutation, { loading: loadingUpdate }] = useUpdateTimeRecordMutation();
  const [removeMutation, { loading: loadingRemove }] = useRemoveTimeRecordMutation();
  const [form] = Form.useForm();
  const userId = useSelector<any>((state) => state.user.auth0UserId) as string;
  // create event handler
  const handleAddTimeRecordEvent = (request: ITimeRecordRequest) => {
    addMutation({ variables: { request } })
      .then(() => {
        message.success('A new event has been created!');
        setIsShowTimeModal(false);
        refetch();
      })
      .catch((err) => {
        console.log(err.message);
        message.error('Event creation failed!');
      });
  };

  // update event handler
  const handleUpdateTimeRecordEvent = (recordId: string, request: ITimeRecordRequest) => {
    updateMutation({ variables: { recordId, request } })
      .then(() => {
        message.success('A new event has been updated!');
        refetch();
        setIsShowTimeModal(false);
      })
      .catch((err) => {
        console.log(err.message);
        message.error('Event update failed!');
      });
  };

  // remove event handler
  const handleRemoveTimeRecordEvent = () => {
    removeMutation({ variables: { recordId: selectedEvent.id } })
      .then(() => {
        message.success('Event has removed');
        refetch();
        setIsShowTimeModal(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // event selection handler
  const handleSelectEvent = (event: ITimeRecord) => {
    setSelectedEvent({
      id: event.id,
      userId: event.userId,
      projectId: event.projectId,
      startTime: moment(event.startTime),
      endTime: moment(event.endTime),
      isBillable: event.isBillable || false,
      tags: event.tags || [],
    });
    setIsShowTimeModal(true);
  };

  // new slot selection handler
  const handleSelectSlot = ({ start, end }) => {
    setSelectedEvent({ ...selectedEvent, startTime: moment(start), endTime: moment(end) });
    setIsShowTimeModal(true);
  };

  const { data, loading, error, refetch } = useGetTimeRecordsQuery();

  const filterEvents = (events) => {
    if (!events) return [];
    return events
      .filter((ev) => {
        return (
          (ev.userId === selectedUser || selectedUser === '__all') &&
          (ev.projectId === selectedProject || selectedProject === '__all') &&
          members.findIndex((mem) => mem.userId === ev.userId) > -1
        );
      })
      .map((ev) => ({
        ...ev,
        startTime: moment(ev.startTime).toDate(),
        endTime: moment(ev.endTime).toDate(),
      }));
  };

  const handleChangeTask = (value) => {
    setSelectedTask(value);
  };

  const handleOpenNewTimeModal = () => {
    setSelectedEvent(defaultRecord);
    setIsShowTimeModal(true);
  };

  const handleCloseTimeModal = () => {
    setSelectedEvent(defaultRecord);
    setIsShowTimeModal(false);
  };

  return (
    <Spin spinning={!data || loading}>
      <TimesheetComponent
        userId={userId}
        events={filterEvents(_.get(data, 'getTimeRecords', []))}
        form={form}
        loading={loadingAdd || loadingUpdate || loadingRemove}
        projects={projects}
        tasks={selectableTasks}
        members={members}
        weekStart={weekStart}
        isShowModal={isShowTimeModal}
        selectedUser={selectedUser}
        selectedProject={selectedProject}
        selectedTask={selectedTask}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        localizer={localizer}
        handleAddTimeRecordEvent={handleAddTimeRecordEvent}
        handleUpdateTimeRecordEvent={handleUpdateTimeRecordEvent}
        handleRemoveTimeRecordEvent={handleRemoveTimeRecordEvent}
        handleOpenNewTimeModal={handleOpenNewTimeModal}
        handleCloseTimeModal={handleCloseTimeModal}
        handleSelectSlot={handleSelectSlot}
        handleSelectEvent={handleSelectEvent}
        handleChangeTask={handleChangeTask}
        setPathWeekStart={setPathWeekStart}
      />
    </Spin>
  );
};

export default TimesheetCalendar;
