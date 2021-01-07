import React, { useEffect, useState } from 'react';
import { Calendar, View, DateLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { ScheduleOutlined } from '@ant-design/icons';
import TimezonePicker from 'react-timezone';
import { momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { Row, Col, Form, Input, Button, Select, DatePicker } from 'antd';
import { Modal } from '../Modal';
import { useFela } from 'react-fela';
import { PageContainer } from '@admin-layout/components';

const { RangePicker } = DatePicker;
const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

const allViews: View[] = ['agenda', 'day', 'week', 'month'];

interface ISelectableCalendarProps {
  localizer: DateLocalizer;
  handleAddSchedule: any;
  events: any;
}
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

function SelectableCalendar({ localizer, handleAddSchedule, events: propEvents }: ISelectableCalendarProps) {
  const [isShowing, setIsShowing] = useState(false);
  const [form] = Form.useForm();
  const [selectedUser, setSelectedUser] = useState('');
  const [events, setEvents] = React.useState(propEvents);

  // filter events by selected user
  useEffect(() => {
    if (selectedUser === '')
      setEvents(propEvents);
    else
      setEvents(propEvents.filter(ev => ev.userId === selectedUser))
  }, [selectedUser])

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title) {
      let newEvent = {} as CalendarEvent;
      newEvent.start = moment(start).toDate();
      newEvent.end = moment(end).toDate();
      newEvent.title = title;
      newEvent.userId = selectedUser;
      setEvents([...events, newEvent]);
      handleAddSchedule(newEvent)
    }
  };

  const openModal = () => {
    setIsShowing(!isShowing);
  };

  const resetModal = (e: any) => {
    e.preventDefault();
    form.resetFields();
  };

  const onEventDrop = ({ event, start, end, allDay }) => {
    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);
    setEvents(nextEvents);
    alert(`${event.title} was dropped onto ${event.start}`);
  };

  const onChangeUser = (value) => {
    setSelectedUser(value);
  }

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

  const onFinish = (values) => {
    const request = {
      title: values.title,
      start: moment(values.dateRange[0]).toDate(),
      end: moment(values.dateRange[1]).toDate(),
      userId: values.user,
    }
    console.log("request =>", request)
    handleAddSchedule(request)
    setIsShowing(!isShowing);
    form.resetFields();
  }
  const renderModalBody = (): JSX.Element => {
    return (
      <>
        <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Required field' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="User" name="user" rules={[{ required: true, message: 'Required field' }]}>
            <Select>
              <Select.Option value="1">User1</Select.Option>
              <Select.Option value="2">User2</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="RangePicker" name="dateRange" rules={[{ required: true, message: 'Required field' }]}>
            <RangePicker allowClear showTime />
          </Form.Item>
          <Form.Item label="Minimum Hours" name="minHours">
            <Input
              name="minhours"
              placeholder="5"
            />
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
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
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
              <Select onChange={onChangeUser} value={selectedUser}>
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
              <a onClick={openModal}>Add Schedule</a>
            </span>
            <Modal
              modalTitle="Create Schedule"
              showModal={isShowing}
              handleClose={() => setIsShowing(false)}
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
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={handleSelect}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        toolbar
        resizable
        onEventDrop={onEventDrop}
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

export interface IScheduleProps {
  handleAddSchedule: Function
  events: any;
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
};

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
