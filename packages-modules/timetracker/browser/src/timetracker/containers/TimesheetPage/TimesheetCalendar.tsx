import React, { useEffect, useState } from 'react';
import TimesheetComponent from './Timesheet';
import {
  useCreateTimesheetMutation,
  useUpdateTimesheetMutation,
  useRemoveTimesheetMutation,
  useGetTimeRecordsQuery,
} from '../../../generated-models';
import { ITimesheetCreateRequest } from '@admin-layout/timetracker-module-core';
import { message, Form } from 'antd';
import moment from 'moment';
import { IProject } from '../TimesheetPage';

export interface ITimesheetCalendarProps {
  projects: Array<IProject>;
}

const TimesheetCalendar = ({ projects }: ITimesheetCalendarProps) => {
  const [selectedEvent, setSelectedEvent] = useState(-1);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [addMutation, { loading: loadingAdd }] = useCreateTimesheetMutation();
  const [updateMutation, { loading: loadingUpdate }] = useUpdateTimesheetMutation();
  const [removeMutation, { loading: loadingRemove }] = useRemoveTimesheetMutation();
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  // create event handler
  const handleAddTimesheetEvent = (request: ITimesheetCreateRequest) => {
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
  const handleUpdateTimesheetEvent = (sheetId: string, request: ITimesheetCreateRequest) => {
    updateMutation({ variables: { sheetId, request } })
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
  const handleRemoveTimesheetEvent = () => {
    removeMutation({ variables: { sheetId: selectedEvent.toString() } })
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
  };

  return !data || loading ? null : (
    <TimesheetComponent
      events={filterEvents(data.getTimeRecords)}
      form={form}
      loading={loadingAdd || loadingUpdate || loadingRemove}
      projects={projects}
      showModal={showModal}
      selectedUser={selectedUser}
      selectedProject={selectedProject}
      selectedEvent={selectedEvent}
      handleAddTimesheetEvent={handleAddTimesheetEvent}
      handleUpdateTimesheetEvent={handleUpdateTimesheetEvent}
      handleRemoveTimesheetEvent={handleRemoveTimesheetEvent}
      handleOpenModal={openModal}
      handleCloseModal={closeModal}
      handleSelectSlot={handleSelectSlot}
      handleSelectEvent={handleSelectEvent}
      handleChangeUser={handleChangeUser}
      handleChangeProject={handleChangeProject}
    />
  );
};

export default TimesheetCalendar;
