import React, { useEffect, useState } from 'react';
import { Calendar, View, DateLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { UserOutlined, ScheduleOutlined } from '@ant-design/icons';
import TimezonePicker from 'react-timezone';
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
  Checkbox,
  Avatar,
} from 'antd';
import { Modal } from '../Modal';
import { useFela } from 'react-fela';
import { PageContainer } from '@admin-layout/components';

const { TextArea } = Input;
const DnDCalendar = withDragAndDrop(Calendar);
const localizerM = momentLocalizer(moment);
const { RangePicker } = DatePicker;
const allViews: View[] = ['agenda', 'day', 'week', 'month'];
const resourceMap = [
  { resourceId: '1', resourceTitle: 'Project1' },
  { resourceId: '2', resourceTitle: 'Project2' },
  { resourceId: '3', resourceTitle: 'Project3' },
  { resourceId: '4', resourceTitle: 'Project4' },
  { resourceId: '5', resourceTitle: 'Project5' },
];

interface ISelectableCalendarProps {
  localizer: DateLocalizer;
  handleAddSchedule: any;
  events:any;
}

class CalendarEvent {
  title: string;
  allDay: boolean;
  start: Date;
  end: Date;
  desc: string;
  resourceId?: string;
  tooltip?: string;

  constructor(
    _title: string,
    _start: Date,
    _endDate: Date,
    _allDay?: boolean,
    _desc?: string,
    _resourceId?: string,
  ) {
    this.title = _title;
    this.allDay = _allDay || false;
    this.start = _start;
    this.end = _endDate;
    this.desc = _desc || '';
    this.resourceId = _resourceId;
  }
}

function SelectableCalendar({ localizer, handleAddSchedule, events: propEvents}: ISelectableCalendarProps) {
  const [isShowing, setIsShowing] = useState(false);
  const [events, setEvents] = React.useState(propEvents.map(ev => ({ ...ev, start: moment(ev.start).toDate(), end: moment(ev.end).toDate()})));
  const [form] = Form.useForm();
  const handleSelect = ({ start, end, resourceId }) => {
    const title = window.prompt('New Event name');
    if (title) {
      let newEvent = {} as CalendarEvent;
      newEvent.start = moment(start).toDate();
      newEvent.end = moment(end).toDate();
      newEvent.title = title;
      newEvent.resourceId = resourceId
      setEvents([...(events as any), newEvent]);
      handleAddSchedule(newEvent);
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
    handleAddSchedule(updatedEvent);
    alert(`${event.title} was dropped onto ${event.start}`);
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

  const handleSelectEvent = event => {
    alert(event.title);
  };
  const handleClose = () => {
    setIsShowing(false);
  };
  
  const handleSelectTimezone = timezone => {
    // tslint:disable-next-line
    console.log('New Timezone Selected:', timezone);
  };

  const onFinish = (values) => {
    const request = {
      title: values.title,
      start: moment(values.dateRange[0]).toDate(),
      end: moment(values.dateRange[1]).toDate(),
      resourceId: values.project,
      desc: values.desc,
    }
    handleAddSchedule(request)
    setIsShowing(!isShowing);
    form.resetFields();
  }

  const renderModalBody = (): JSX.Element => {
    return (
      <>
        <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} layout="vertical" onFinish={onFinish} form={form}>
          <div style={{ margin: '15px 0px' }}>
            <Avatar style={{ backgroundColor: '#3174ad' }} icon={<UserOutlined />} />
            <span style={{ marginLeft: '10px' }}>Cdmbase</span>
          </div>
          <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Required field' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Projects" name="project" rules={[{ required: true, message: 'Required field'}]}>
            <Select>
              {
                resourceMap.map(res => {
                  return <Select.Option value={res.resourceId} key={ res.resourceId }>{ res.resourceTitle}</Select.Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item label="DatePicker" name="dateRange" rules={[{ required: true, message: 'Required field'}]}>
            <RangePicker showTime/>
          </Form.Item>
          <Form.Item label="REASON *" name="desc" rules={[{ required: true, message: 'Required field'}]}>
            <TextArea
              rows={3}
              placeholder="Reason for time"
            />
          </Form.Item>
          <Form.Item label="Note" name="note">
            <TextArea placeholder="Notes for time" />
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
            <h3>View & edit timesheets</h3>
          </div>
        </Col>
      </Row>
      <Row align="middle" gutter={[24, 16]}>
        <Col md={6} xs={16} style={{ top: '-10px' }}>
          <span>Select Timezone</span>
          <TimezonePicker
            value="Asia/Yerevan"
            onChange={handleSelectTimezone}
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
              <Select>
                <Select.Option value="user1">User1</Select.Option>
                <Select.Option value="user2">User2</Select.Option>
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
              Timesheet settings
            </a>
          </div>
        </Col>
        <Col md={6} xs={16}>
          <div>
            <span style={{ fontWeight: 'bold' }}>
              <a onClick={openModal}>Add Time</a>
            </span>
            <Modal
              modalTitle="Add Time"
              showModal={isShowing}
              handleClose={handleClose}
              modalBody={renderModalBody()}
            />
          </div>
        </Col>
      </Row>
      <DnDCalendar
        selectable={true}
        localizer={localizer}
        events={events}
        defaultView="week"
        views={allViews}
        defaultDate={new Date()}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelect}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        toolbar={true}
        resizable={true}
        onEventDrop={onEventDrop}
        components={{
          event: EventComponent,
          agenda: {
            event: EventAgenda,
          },
        }}
        resources={resourceMap}
        resourceIdAccessor="resourceId"
        resourceTitleAccessor="resourceTitle"
      />
    </PageContainer>
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
};

export default props => {
  const { css } = useFela();
  return (
    <div className={css(stylesheet.styles)}>
      <div className="calender-width">
        <SelectableCalendar localizer={localizerM} {...props} />
      </div>
    </div>  
  );
};
