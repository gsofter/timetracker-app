import React, { useCallback, useEffect, useState } from 'react';
import { Calendar, View, DateLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';
import { momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  TimePicker,
  Avatar,
  Popconfirm,
  Modal,
} from 'antd';
import { useFela } from 'react-fela';
import {
  ITimesheetCreateRequest,
  ITimeRecord,
  IProjects as IProject,
  ITask,
  IOrgMember as IMember,
} from '@admin-layout/timetracker-core';
import Spacer from '../../components/Spacer';

const { TextArea } = Input;
const DnDCalendar: any = withDragAndDrop(Calendar as any);
const localizerM = momentLocalizer(moment);
const { RangePicker } = TimePicker;
const allViews: View[] = ['day', 'week', 'month'];

enum VIEW_MODE {
  CALENDAR_VIEW,
  TABULAR_VIEW,
}

interface ITimesheetProps {
  form: any;
  events: [ITimeRecord];
  showModal: boolean;
  selectedProject: string;
  selectedTask: string;
  selectedUser: any;
  selectedEvent: any;
  loading: boolean;
  projects: Array<IProject>;
  tasks: Array<ITask>;
  members: Array<IMember>;
  handleAddTimeRecordEvent: Function;
  handleUpdateTimeRecordEvent: Function;
  handleRemoveTimeRecordEvent: () => void;
  handleOpenAddTimeModal: () => void;
  handleCloseAddTimeModal: () => void;
  handleSelectSlot: (any) => void;
  handleSelectEvent: (any) => void;
  handleChangeProject: (any) => void;
  handleChangeTask: (any) => void;
  handleChangeUser: (any) => void;
}

function SelectableCalendar({
  events,
  projects,
  members,
  form,
  tasks,
  showModal,
  loading,
  selectedProject,
  selectedEvent,
  handleAddTimeRecordEvent,
  handleUpdateTimeRecordEvent,
  handleRemoveTimeRecordEvent,
  handleCloseAddTimeModal,
  handleSelectSlot,
  handleSelectEvent,
  handleChangeProject,
  handleChangeTask,
  handleChangeUser,
  localizer,
}: ITimesheetProps & { localizer: DateLocalizer }) {
  const resetModal = (e: any) => {
    e.preventDefault();
    form.resetFields();
  };

  const onEventDrop = ({ event, start, end, allDay }) => {
    const updateRequest = { start: moment(start), end: moment(end) };
    handleUpdateTimeRecordEvent(event.id, updateRequest);
  };

  const onEventResize = ({ event, start, end }) => {
    const updateRequest = { start: moment(start), end: moment(end) };
    handleUpdateTimeRecordEvent(event.id, updateRequest);
  };

  const EventComponent = ({ start, end, title }) => {
    return (
      <>
        <p>{title}</p>
        <p>{start}</p>
        <p>{end}</p>
      </>
    );
  };

  const EventAgenda = ({ event }) => {
    return (
      <>
        <span>
          <em style={{ color: 'magenta' }}>{event.title}</em>
          <p>{event.desc}</p>
        </span>
      </>
    );
  };

  const onFinish = values => {
    const request: ITimesheetCreateRequest = {
      //   title: values.title,
      startDate: moment(
        values.date.format('YYYY-MM-DD') + ' ' + values.timeRange[0].format('hh:mm:ss'),
      ).toDate(),
      endDate: moment(
        values.date.format('YYYY-MM-DD') + ' ' + values.timeRange[1].format('hh:mm:ss'),
      ).toDate(),
      //   projectId: values.project,
      //   reason: values.reason,
      //   note: values.note,
    };
    if (selectedEvent === -1) handleAddTimeRecordEvent(request);
    else handleUpdateTimeRecordEvent(selectedEvent, request);
  };

  const renderModalBody = (): JSX.Element => {
    const { css } = useFela();
    return (
      <>
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
          onFinish={onFinish}
          form={form}
          className={css(stylesheet.form)}
        >
          <div style={{ margin: '15px 0px' }}>
            <Avatar style={{ backgroundColor: '#3174ad' }} icon={<UserOutlined />} />
            <span style={{ marginLeft: '10px' }}>Cdmbase</span>
          </div>
          <Form.Item
            label="User"
            name="user"
            rules={[{ required: true, message: 'Required field' }]}
          >
            <Select>
              {members.map(member => {
                return (
                  <Select.Option value={member._id} key={member._id}>
                    {member.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Projects"
            name="project"
            rules={[{ required: true, message: 'Required field' }]}
          >
            <Select onChange={handleChangeProject}>
              {projects.map(res => {
                return (
                  <Select.Option value={res.id} key={res.id}>
                    {res.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Task"
            name="task"
            rules={[{ required: true, message: 'Required field' }]}
          >
            <Select
              disabled={selectedProject === '' || !!!selectedProject}
              onChange={handleChangeTask}
            >
              {tasks.map(task => {
                return (
                  <Select.Option value={task.id} key={task.id}>
                    {task.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Row gutter={10}>
            <Col>
              <Form.Item
                label="Pick a date"
                name="date"
                rules={[{ required: true, message: 'Required field' }]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label="Select time range"
                name="timeRange"
                rules={[{ required: true, message: 'Required field' }]}
              >
                <RangePicker />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="REASON *"
            name="reason"
            rules={[{ required: true, message: 'Required field' }]}
          >
            <TextArea rows={3} placeholder="Reason for time" />
          </Form.Item>
          <Form.Item label="Note" name="note">
            <TextArea placeholder="Notes for time" />
          </Form.Item>

          <Form.Item>
            <Row className="footer">
              <Button htmlType="button" onClick={resetModal}>
                Reset
              </Button>
              &nbsp;
              {selectedEvent !== -1 ? (
                <Popconfirm
                  title="Are you sure to remove event"
                  okText="OK"
                  cancelText="Cancel"
                  onConfirm={handleRemoveTimeRecordEvent}
                >
                  <Button
                    type="primary"
                    htmlType="button"
                    loading={loading}
                    icon={<DeleteOutlined />}
                    danger
                  >
                    Remove
                  </Button>
                </Popconfirm>
              ) : (
                ''
              )}
              <Spacer />
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </>
    );
  };

  return (
    <>
      <Modal
        title={selectedEvent === -1 ? 'Add Timesheet' : 'Edit Timesheet'}
        visible={showModal}
        onCancel={handleCloseAddTimeModal}
        footer={false}
      >
        {renderModalBody()}
      </Modal>

      <DnDCalendar
        selectable={true}
        localizer={localizer}
        events={events}
        defaultView="week"
        views={allViews}
        defaultDate={new Date()}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        startAccessor="startTime"
        endAccessor="endTime"
        titleAccessor="taskName"
        toolbar={true}
        resizable={true}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        components={{
          event: EventComponent,
          agenda: {
            event: EventAgenda,
          },
        }}
        // resources={isViewGroup ? resourceMap : undefined}
        // resourceIdAccessor={isViewGroup ? 'projectId' : undefined}
        // resourceTitleAccessor={isViewGroup ? 'projectTitle' : undefined}
      />
    </>
  );
}

const stylesheet: any = {
  styles: theme => ({
    position: 'relative',
    width: '100%',
    // Default height for the Timesheet Calender view
    '& .rbc-calendar': {
      height: '100vh',
    },
    '& .sm-screen-size': {
      '@media (max-width: 768px)': {
        width: '100% !important',
      },
    },
    '& ul.jsx-4179805763': {
      zIndex: 1050,
      webkitBoxSizing: 'border-box',
      boxSizing: 'border-box',
      padding: '4px 0',
      fontSize: '13px',
      maxHeight: '100px',
      fontVariant: 'initial',
      backgroundColor: '#fff',
      borderRadius: '2px',
      outline: 'none',
      webkitBoxShadow:
        '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
      boxShadow:
        '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
    },
    '& div.jsx-4179805763': {
      marginTop: '8px',
      width: '100%',
    },
    '& .rbc-day-slot': {
      position: 'relative',
    },
    '& .rbc-day-slot .rbc-events-container': {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      marginRight: '10px',
      top: 0,
    },
    '& .rbc-day-slot .rbc-events-container.rbc-rtl': {
      left: '10px',
      right: 0,
    },
    '& .rbc-day-slot .rbc-event': {
      border: '1px solid #265985',
      display: 'flex',
      maxHeight: '100%',
      minHeight: '20px',
      flexFlow: 'column wrap',
      alignItems: 'flex-start',
      overflow: 'hidden',
      position: 'absolute',
    },
    '& .rbc-event': {
      border: 'none',
      boxShadow: 'none',
      margin: 0,
      padding: '2px 5px',
      backgroundColor: '#3174ad',
      borderRadius: '5px',
      color: '#fff',
      cursor: 'pointer',
      width: '100%',
      textAlign: 'left',
    },
  }),

  form: props => ({
    display: 'block',
    '& .footer': {
      display: 'flex',
      flexDirection: 'row',
    },
  }),
};

export default (props: ITimesheetProps) => {
  const { css } = useFela();
  return (
    <div className={css(stylesheet.styles)}>
      <div className="calender-width">
        <SelectableCalendar localizer={localizerM} {...props} />
      </div>
    </div>
  );
};
