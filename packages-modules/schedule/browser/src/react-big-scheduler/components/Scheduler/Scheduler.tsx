import React, { useEffect, useState } from 'react';
import { Calendar, View, DateLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { ScheduleOutlined } from '@ant-design/icons';
import TimezonePicker from 'react-timezone';
import { momentLocalizer } from 'react-big-calendar';
import { Row, Col, Form, Input, Button, Select, DatePicker, Popconfirm } from 'antd';
import { Modal } from '../Modal';
import { useFela } from 'react-fela';
import { PageContainer } from '@admin-layout/components';
import { DeleteOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const DnDCalendar: any = withDragAndDrop(Calendar as any);
const localizer = momentLocalizer(moment);

const allViews: View[] = ['agenda', 'day', 'week', 'month'];
class CalendarEvent {
  title: string;
  allDay: boolean;
  start: Date;
  end: Date;
  desc: string;
  userId?: string;
  resourceId?: string;
  tooltip?: string;

  constructor(
    _title: string,
    _start: Date,
    _endDate: Date,
    _allDay?: boolean,
    _desc?: string,
    _userId?: string,
    _resourceId?: string,
  ) {
    this.title = _title;
    this.allDay = _allDay || false;
    this.start = _start;
    this.end = _endDate;
    this.desc = _desc || '';
    this.resourceId = _resourceId;
    this.userId = _userId;
  }
}

export interface IScheduleProps {
  handleAddScheduleEvent: Function;
  handleUpdateScheduleEvent: Function;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleSelectEvent: (any) => void;
  handleChangeUser: (any) => void;
  handleRemoveEvent: () => void;
  handleSelectSlot: (any) => void;
  selectedEvent: any;
  form: any;
  showModal: boolean;
  loading: boolean;
  events: any;
  selectedUser: string;
}

function SelectableCalendar({
  localizer,
  handleAddScheduleEvent,
  handleUpdateScheduleEvent,
  events,
  showModal,
  handleOpenModal,
  handleCloseModal,
  loading,
  form,
  selectedEvent,
  handleSelectEvent,
  selectedUser,
  handleChangeUser,
  handleRemoveEvent,
  handleSelectSlot,
}: IScheduleProps & { localizer: DateLocalizer }) {
  const resetModal = (e: any) => {
    e.preventDefault();
    form.resetFields();
  };

  const onEventDrop = ({ event, start, end, allDay }) => {
    const updateRequest = {
      start,
      end,
      allDay,
    };
    handleUpdateScheduleEvent(event.id, updateRequest);
  };

  const onEventResize = ({ event, start, end }) => {
    const updateRequest = {
      start,
      end,
    };
    handleUpdateScheduleEvent(event.id, updateRequest);
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
      <span>
        <em style={{ color: 'magenta' }}>{event.title}</em>
        <p>{event.desc}</p>
      </span>
    );
  };

  const onFinish = values => {
    const request = {
      title: values.title,
      start: moment(values.dateRange[0]).toDate(),
      end: moment(values.dateRange[1]).toDate(),
      userId: values.user,
    };
    if (selectedEvent !== -1) handleUpdateScheduleEvent(selectedEvent, request);
    else handleAddScheduleEvent(request);
  };

  const renderModalBody = (): JSX.Element => {
    return (
      <>
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Required field' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="User"
            name="user"
            rules={[{ required: true, message: 'Required field' }]}
          >
            <Select>
              <Select.Option value="1">User1</Select.Option>
              <Select.Option value="2">User2</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="RangePicker"
            name="dateRange"
            rules={[{ required: true, message: 'Required field' }]}
          >
            <RangePicker allowClear showTime />
          </Form.Item>
          <Form.Item label="Minimum Hours" name="minHours">
            <Input name="minhours" placeholder="5" />
          </Form.Item>
          <Form.Item label="Repeats" name="repeats">
            <Select>
              <Select.Option value="never">Never</Select.Option>
              <Select.Option value="yes">Yes</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button htmlType="button" onClick={resetModal}>
              Reset
            </Button>
            &nbsp;
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
            &nbsp;
            {selectedEvent !== -1 ? (
              <Popconfirm
                title="Are you sure to remove event"
                okText="OK"
                cancelText="Cancel"
                onConfirm={handleRemoveEvent}
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
          </Form.Item>
        </Form>
      </>
    );
  };

  return (
    <PageContainer>
      <Row align="middle" justify="space-between" style={{ marginBottom: '15px' }}>
        <Col>
          <div style={{ textAlign: 'center' }}>
            <h3>Attendance schedules</h3>
          </div>
        </Col>
      </Row>
      <Row align="middle" gutter={[24, 16]}>
        <Col md={6} xs={16} style={{ top: '-10px' }}>
          <span>Select Timezone</span>
          <TimezonePicker
            value="Asia/Yerevan"
            onChange={timezone => console.log('New Timezone Selected:', timezone)}
            inputProps={{
              placeholder: 'Select Timezone...',
              name: 'timezone',
            }}
          />
        </Col>
        <Col md={6} xs={16}>
          <Form
            labelCol={{ span: 20 }}
            wrapperCol={{ span: 20 }}
            layout="vertical"
            className="sm-screen-size"
          >
            <Form.Item label="Members">
              <Select onChange={handleChangeUser} value={selectedUser}>
                <Select.Option value="">All</Select.Option>
                <Select.Option value="1">User1</Select.Option>
                <Select.Option value="2">User2</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Col>
        <Col md={6} xs={16}>
          <div className="vertical-">
            <a href="#">
              <span>
                <ScheduleOutlined />
              </span>{' '}
              schedule settings
            </a>
          </div>
        </Col>
        <Col md={6} xs={16}>
          <div>
            <span style={{ fontWeight: 'bold' }}>
              <a onClick={handleOpenModal}>Add Schedule</a>
            </span>
            <Modal
              modalTitle={selectedEvent !== -1 ? 'Edit Schedule' : 'Create Schedule'}
              showModal={showModal}
              handleClose={handleCloseModal}
              modalBody={renderModalBody()}
            />
          </div>
        </Col>
      </Row>
      <DnDCalendar
        selectable
        localizer={localizer}
        events={events}
        defaultView="month"
        views={allViews}
        defaultDate={new Date()}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        toolbar
        resizable
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        components={{
          event: EventComponent,
          agenda: {
            event: EventAgenda,
          },
        }}
      />
    </PageContainer>
  );
}

export default function Schedule(props: IScheduleProps) {
  const { css } = useFela();
  return (
    <div className={css(stylesheet.styles)}>
      <div className="calender-width">
        <SelectableCalendar localizer={localizer} {...props} />
      </div>
    </div>
  );
}

const stylesheet: any = {
  styles: theme => ({
    position: 'relative',
    width: '100%',
    // Default height for the Calender Scheduler view
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
  }),
};
