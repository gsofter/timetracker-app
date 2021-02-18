import React, { useEffect, useState } from 'react';
import TimesheetComponent from './Timesheet';
import {
  useCreateTimesheetMutation,
  useUpdateTimesheetMutation,
  useRemoveTimesheetMutation,
  useGetTimeRecordsQuery,
  useCreateTimeRecordMutation,
  useUpdateTimeRecordMutation,
  useRemoveTimeRecordMutation,
} from '../../../generated-models';
import { ITimesheetCreateRequest, ITimeRecordRequest } from '@admin-layout/timetracker-module-core';
import { message, Form } from 'antd';
import moment from 'moment';
import { IProject } from '@admin-layout/timetracker-module-core';

export interface ITimesheetCalendarProps {
  projects: Array<IProject>;
  members: Array<{ id: string; name: string }>;
}

const TimesheetCalendar = ({ projects, members }: ITimesheetCalendarProps) => {
  const [selectedEvent, setSelectedEvent] = useState(-1);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [selectableTasks, setSelectableTasks] = useState([]);
  const [addMutation, { loading: loadingAdd }] = useCreateTimeRecordMutation();
  const [updateMutation, { loading: loadingUpdate }] = useUpdateTimeRecordMutation();
  const [removeMutation, { loading: loadingRemove }] = useRemoveTimeRecordMutation();
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  // create event handler
  const handleAddTimeRecordEvent = (request: ITimeRecordRequest) => {
    addMutation({ variables: { request } })
      .then(() => {
        message.success('A new event has been created!');
        closeModal();
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
        closeModal();
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
        closeModal();
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
    openModal();
  };

  // new slot selection handler
  const handleSelectSlot = ({ start, end }) => {
    form.setFieldsValue({
      dateRange: [moment(start), moment(end)],
    });
    openModal();
  };

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setSelectedEvent(-1);
    form.resetFields();
    setShowModal(false);
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

  const handleChangeUser = value => {
    setSelectedUser(value);
  };

  const handleChangeProject = value => {
    setSelectedProject(value);
    const selProject = projects.find(p => p.id === value);
    setSelectableTasks(selProject.tasks);
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
      showModal={showModal}
      selectedUser={selectedUser}
      selectedProject={selectedProject}
      selectedTask={selectedTask}
      selectedEvent={selectedEvent}
      handleAddTimeRecordEvent={handleAddTimeRecordEvent}
      handleUpdateTimeRecordEvent={handleUpdateTimeRecordEvent}
      handleRemoveTimeRecordEvent={handleRemoveTimeRecordEvent}
      handleOpenModal={openModal}
      handleCloseModal={closeModal}
      handleSelectSlot={handleSelectSlot}
      handleSelectEvent={handleSelectEvent}
      handleChangeUser={handleChangeUser}
      handleChangeTask={handleChangeTask}
      handleChangeProject={handleChangeProject}
    />
  );
};

export default TimesheetCalendar;
