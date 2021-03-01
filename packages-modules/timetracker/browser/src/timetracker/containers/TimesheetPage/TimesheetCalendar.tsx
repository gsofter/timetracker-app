import React, { useEffect, useState } from 'react';
import TimesheetComponent from './Timesheet';
import {
  useGetTimeRecordsQuery,
  useCreateTimeRecordMutation,
  useUpdateTimeRecordMutation,
  useRemoveTimeRecordMutation,
} from '../../../generated-models';
import { message, Form } from 'antd';
import moment from 'moment';
import { ITimeRecordRequest, IProjects as  IProject, ITeamMember as IMember } from '@admin-layout/timetracker-core';

export interface ITimesheetCalendarProps {
  projects: Array<IProject>;
  members: Array<IMember>;
  selectedUser: string;
  selectedProject: string;
  localizer: any;
  showAddTimeModal: boolean;
  handleChangeUser: (value: string) => void;
  handleChangeProject: (value: string) => void;
  handleOpenAddTimeModal: () => void;
  handleCloseAddTimeModal: () => void;
}

const TimesheetCalendar = ({
  projects,
  members,
  selectedUser,
  selectedProject,
  showAddTimeModal,
  handleChangeUser,
  handleChangeProject,
  handleOpenAddTimeModal,
  handleCloseAddTimeModal,
}: ITimesheetCalendarProps) => {
  const [selectedEvent, setSelectedEvent] = useState(-1);
  const [selectedTask, setSelectedTask] = useState('');
  const [selectableTasks, setSelectableTasks] = useState([]);
  const [addMutation, { loading: loadingAdd }] = useCreateTimeRecordMutation();
  const [updateMutation, { loading: loadingUpdate }] = useUpdateTimeRecordMutation();
  const [removeMutation, { loading: loadingRemove }] = useRemoveTimeRecordMutation();
  const [form] = Form.useForm();
  // create event handler
  const handleAddTimeRecordEvent = (request: ITimeRecordRequest) => {
    addMutation({ variables: { request } })
      .then(() => {
        message.success('A new event has been created!');
        handleCloseAddTimeModal();
        refetch();
      })
      .catch(err => {
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
        handleCloseAddTimeModal();
      })
      .catch(err => {
        console.log(err.message);
        message.error('Event update failed!');
      });
  };

  // remove event handler
  const handleRemoveTimeRecordEvent = () => {
    removeMutation({ variables: { recordId: selectedEvent.toString() } })
      .then(() => {
        message.success('Event has removed');
        refetch();
        handleCloseAddTimeModal();
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  // event selection handler
  const handleSelectEvent = event => {
    form.setFieldsValue({
      title: event.title,
      user: event.userId,
      date: moment(event.start),
      timeRange: [moment(event.start), moment(event.end)],
      project: event.projectId,
      reason: event.reason,
      note: event.note,
    });
    setSelectedEvent(event.id);
    handleOpenAddTimeModal();
  };

  // new slot selection handler
  const handleSelectSlot = ({ start, end }) => {
    form.setFieldsValue({
      dateRange: [moment(start), moment(end)],
    });
    handleOpenAddTimeModal();
  };

  const { data, loading, error, refetch } = useGetTimeRecordsQuery();
  useEffect(() => {
    refetch();
  }, [refetch]);

  const filterEvents = events => {
    return events
      .map(ev => ({
        ...ev,
        startTime: moment(ev.startTime).toDate(),
        endTime: moment(ev.endTime).toDate(),
      }))
      .filter(ev => {
        return (
          (ev.userId === selectedUser || selectedUser === '') &&
          (ev.projectId === selectedProject || selectedProject === '')
        );
      });
  };

  const handleChangeTask = value => {
    setSelectedTask(value);
  };

  return !data || loading ? null : (
    <TimesheetComponent
      events={filterEvents(data.getTimeRecords)}
      form={form}
      loading={loadingAdd || loadingUpdate || loadingRemove}
      projects={projects}
      tasks={selectableTasks}
      members={members}
      showModal={showAddTimeModal}
      selectedUser={selectedUser}
      selectedProject={selectedProject}
      selectedTask={selectedTask}
      selectedEvent={selectedEvent}
      handleAddTimeRecordEvent={handleAddTimeRecordEvent}
      handleUpdateTimeRecordEvent={handleUpdateTimeRecordEvent}
      handleRemoveTimeRecordEvent={handleRemoveTimeRecordEvent}
      handleOpenAddTimeModal={handleOpenAddTimeModal}
      handleCloseAddTimeModal={handleCloseAddTimeModal}
      handleSelectSlot={handleSelectSlot}
      handleSelectEvent={handleSelectEvent}
      handleChangeUser={handleChangeUser}
      handleChangeTask={handleChangeTask}
      handleChangeProject={handleChangeProject}
    />
  );
};

export default TimesheetCalendar;
