import React, { useState } from 'react';
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
import { Modal } from './Modal';
import { useFela } from 'react-fela';

const { TextArea } = Input;
const DnDCalendar = withDragAndDrop(Calendar);
const localizerM = momentLocalizer(moment);

const allViews: View[] = ['agenda', 'day', 'week', 'month'];

const initialEvents = [
  {
    id: 1,
    title: 'Board meeting',
    start: new Date('Fri Nov 14 2020 04:00:00'),
    end: new Date('Fri Nov 14 2020 07:00:00'),
    resourceId: 1,
    totalHours: '3:00:00',
  },
  {
    id: 2,
    title: 'MS training Task',
    start: new Date('Fri Nov 13 2020 15:00:00'),
    end: new Date('Fri Nov 13 2020 17:00:00'),
    resourceId: 2,
    totalHours: '2:00:00',
  },
  {
    id: 3,
    title: 'Team lead meeting',
    start: new Date('Fri Nov 15 2020 18:00:00'),
    end: new Date('Fri Nov 15 2020 19:00:00'),
    resourceId: 1,
    totalHours: '1:00:00',
  },
  {
    id: 4,
    title: 'Birthday Party',
    start: new Date('Fri Nov 17 2020 15:00:00'),
    end: new Date('Fri Nov 17 2020 16:00:00'),
    resourceId: 2,
    totalHours: '1:00:00',
  },
];
const resourceMap = [
  { resourceId: 1, resourceTitle: 'Board room' },
  { resourceId: 2, resourceTitle: 'Training room' },
];

interface Props {
  localizer: DateLocalizer;
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

function SelectableCalendar({ localizer }: Props) {
  const [isShowing, setIsShowing] = useState(false);
  const [selectproject, setSelectproject] = useState();
  const [selecttask, setSelecttask] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [startDate, setStartDate] = useState();
  const [checked, setChecked] = useState(false);
  const [reason, setReason] = useState();
  const [note, setNote] = useState();
  const [resource, setResourceMap] = useState(resourceMap);
  const [events, setEvents] = React.useState(initialEvents);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title) {
      let newEvent = {} as CalendarEvent;
      newEvent.start = moment(start).toDate();
      newEvent.end = moment(end).toDate();
      newEvent.title = title;

      // Erroneous code
      // events.push(newEvent)
      // setEvents(events)
      setEvents([...(events as any), newEvent]);
    }
  };

  const openModal = () => {
    setIsShowing(!isShowing);
  };

  const onChange = (e) => {
    setChecked(e);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const submitValue = {
      selecttask: selecttask,
      selectproject: selectproject,
      checked: checked,
      // minhours: values.minhours,
      startTime: startTime,
      endTime: endTime,
      startDate: startDate,
      reason: reason,
      note: note,
    };
    const title = 'New event added';
    if (title) {
      let newEvent = ({} as CalendarEvent) as any;
      newEvent.start = moment(startDate).toDate();
      newEvent.end = moment(endTime).toDate();
      newEvent.resourceId = Math.floor(Math.random() * 10000);
      newEvent.id = 10;
      // newEvent.id = Math.floor(Math.random() * 10000);

      let now = moment(startTime).format('HH:mm:ss');
      let then = moment(endTime).format('HH:mm:ss');
      let calculateTime = moment
        .utc(then, 'HH:mm:ss')
        .diff(moment.utc(now, 'HH:mm:ss'), 'm');

      newEvent.title = selecttask;
      setEvents([...(events as any), newEvent]);
      setResourceMap([
        ...resource,
        {
          resourceTitle: selectproject,
          resourceId: 10,
          // resourceId: Math.floor(Math.random() * 10000),
        },
      ]);
    }

    setIsShowing(!isShowing);
    // tslint:disable-next-line
    console.log(submitValue, 'submitValue');
  };

  const resetModal = (e: any) => {
    e.preventDefault();
    setSelectproject(null);
    setSelecttask(null);
    setStartDate(null);
    setStartTime(null);
    setEndTime(null);
    setChecked(false);
    setReason(null);
    setNote(null);
  };

  const onEventDrop = ({ event, start, end, allDay }) => {
    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);
    setEvents(nextEvents);
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

  const handleSelectEvent = (event) => {
    alert(event.title);
  };
  const handleReason = (e) => {
    setReason(e.target.value as any);
  };
  const handleNote = (e) => {
    setNote(e.target.value as any);
  };
  const handleSelectProject = (e) => {
    setSelectproject(e);
  };
  const handleTask = (e) => {
    setSelecttask(e);
  };
  const handleClose = () => {
    setIsShowing(false);
  };
  const handleChecked = (e) => {
    // tslint:disable-next-line
    console.log(e.target.checked);
  };
  const handleStartDate = (date) => {
    setStartDate(date as any);
  };
  const handleStartTime = (time, timeString) => {
    setStartTime(time as any);
  };
  const handleEndTime = (time, timeString) => {
    setEndTime(time as any);
  };
  const handleSelectTimezone = (timezone) => {
    // tslint:disable-next-line
    console.log('New Timezone Selected:', timezone);
  };

  const renderModalBody = (): JSX.Element => {
    return (
      <>
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
        >
          <div style={{ margin: '15px 0px' }}>
            <Avatar
              style={{ backgroundColor: '#3174ad' }}
              icon={<UserOutlined />}
            />
            <span style={{ marginLeft: '10px' }}>Cdmbase</span>
          </div>
          <Form.Item label="Projects">
            <Select onChange={handleSelectProject} value={selectproject}>
              <Select.Option value="Admin-project1">
                Admin-project1
              </Select.Option>
              <Select.Option value="Admin-project2">
                Admin-project2
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="TO DO">
            <Select onChange={handleTask} value={selecttask}>
              <Select.Option value="task1">Task1</Select.Option>
              <Select.Option value="task2">Task2</Select.Option>
              <Select.Option value="task3">Task3</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="DatePicker">
            <DatePicker onChange={handleStartDate} value={startDate as any} />{' '}
            &nbsp;
            <span>From </span>
            <TimePicker
              use12Hours={true}
              format="h:mm a"
              onChange={handleStartTime}
              value={startTime as any}
            />
            &nbsp;TO &nbsp;
            <TimePicker
              use12Hours={true}
              format="h:mm a"
              onChange={handleEndTime}
              value={endTime as any}
            />
          </Form.Item>
          <Form.Item>
            <Checkbox onChange={handleChecked}>Checkbox</Checkbox>
          </Form.Item>
          <Form.Item label="REASON *">
            <TextArea
              rows={3}
              onChange={handleReason}
              value={reason}
              placeholder="Reason for time"
            />
          </Form.Item>
          <Form.Item label="Note">
            <TextArea
              onChange={handleNote}
              rows={3}
              value={note}
              placeholder="Notes for time"
            />
          </Form.Item>

          <Form.Item>
            <Button htmlType="button" onClick={resetModal}>
              Reset
            </Button>
            &nbsp;
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  };

  return (
    <>
      <Row
        align="middle"
        justify="space-between"
        style={{ marginBottom: '15px' }}
      >
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
        defaultDate={new Date('Fri Nov 13 2020')}
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
        resources={resource}
        resourceIdAccessor="resourceId"
        resourceTitleAccessor="resourceTitle"
      />
    </>
  );
}

const stylesheet: any = {
  styles: (theme) => ({
    position: 'relative',
    width: '100%',
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

export default (props) => {
  const { css } = useFela();
  return (
    <div className={css(stylesheet.styles)}>
      <div style={{ height: '100vh' }} className="calender-width">
        <SelectableCalendar localizer={localizerM} />
      </div>
    </div>
  );
};
