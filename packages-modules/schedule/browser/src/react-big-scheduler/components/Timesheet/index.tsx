import React, { useEffect, useState } from 'react';
import TimesheetComponent from './Timesheet';
import {
  useAddTimesheetEventMutation,
  useUpdateTimesheetEventMutation,
  useRemoveTimesheetEventMutation,
  useGetTimesheetEventsQuery,
} from '../../../generated-models';
import { ITimesheetCreateRequest } from '@admin-layout/schedule-module-core';
import { message, Form } from 'antd';
import moment from 'moment';

const Timesheet = props => {
  const [selectedEvent, setSelectedEvent] = useState(-1);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [addMutation, { loading: loadingAdd }] = useAddTimesheetEventMutation();
  const [updateMutation, { loading: loadingUpdate }] = useUpdateTimesheetEventMutation();
  const [removeMutation, { loading: loadingRemove }] = useRemoveTimesheetEventMutation();
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
  const handleUpdateTimesheetEvent = (eventId: string, request: ITimesheetCreateRequest) => {
    updateMutation({ variables: { eventId, request } })
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
    removeMutation({ variables: { eventId: selectedEvent.toString() } })
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
  const { data, loading, error, refetch } = useGetTimesheetEventsQuery();
  useEffect(() => {
    refetch();
  }, [refetch]);

  const filterEvents = events => {
    return events
      .map(ev => ({
        ...ev,
        start: moment(ev.start).toDate(),
        end: moment(ev.end).toDate(),
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

  return !data && loading ? null : (
    <TimesheetComponent
      events={filterEvents(data.getTimesheetEvents)}
      form={form}
      loading={loadingAdd || loadingUpdate || loadingRemove}
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

export default Timesheet;
