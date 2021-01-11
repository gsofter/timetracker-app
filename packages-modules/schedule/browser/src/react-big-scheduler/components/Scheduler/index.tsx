import React, { useEffect, useState } from 'react';
import SchedulerComponent from './Scheduler';
import {
  useAddScheduleEventMutation,
  useGetScheduleEventsQuery,
  useUpdateScheduleEventMutation,
  useRemoveScheduleEventMutation,
} from '../../../generated-models';
import { IScheduleCreateRequest } from '@admin-layout/schedule-module-core';
import { message, Form } from 'antd';
import moment from 'moment';
import events from 'events';

const Scheduler = props => {
  const [addMutation, { loading: loadingAdd }] = useAddScheduleEventMutation();
  const [updateMutation, { loading: loadingUpdate }] = useUpdateScheduleEventMutation();
  const [removeMutation, { loading: loadingRemove }] = useRemoveScheduleEventMutation();
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [selectedEvent, setSelectedEvent] = React.useState(-1);
  const [selectedUser, setSelectedUser] = useState('');

  // create event handler
  const handleAddScheduleEvent = (request: IScheduleCreateRequest) => {
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
  const handleUpdateScheduleEvent = (eventId: string, request: IScheduleCreateRequest) => {
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
  const handleRemoveEvent = () => {
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
      dateRange: [moment(event.start), moment(event.end)],
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

  const handleChangeUser = value => {
    setSelectedUser(value);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    form.resetFields();
  };

  const { data, loading, error, refetch } = useGetScheduleEventsQuery();
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
        return ev.userId === selectedUser || selectedUser === '';
      });
  };
  return !data && loading ? null : (
    <SchedulerComponent
      handleAddScheduleEvent={handleAddScheduleEvent}
      handleUpdateScheduleEvent={handleUpdateScheduleEvent}
      events={filterEvents(data?.getScheduleEvents)}
      showModal={showModal}
      handleOpenModal={openModal}
      handleCloseModal={closeModal}
      loading={loadingAdd || loadingUpdate}
      form={form}
      selectedEvent={selectedEvent}
      handleSelectEvent={handleSelectEvent}
      selectedUser={selectedUser}
      handleChangeUser={handleChangeUser}
      handleRemoveEvent={handleRemoveEvent}
      handleSelectSlot={handleSelectSlot}
    />
  );
};

export default Scheduler;
