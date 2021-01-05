import React, { useState } from 'react';
import { Calendar, View, DateLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { ScheduleOutlined } from '@ant-design/icons';
import TimezonePicker from 'react-timezone';
import { momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { Row, Col, Form, Input, Button, Select, DatePicker, TimePicker } from 'antd';
import { Modal } from '../Modal';
import { useFela } from 'react-fela';
import { PageContainer } from '@admin-layout/components';

const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

const allViews: View[] = ['agenda', 'day', 'week', 'month'];

const initialEvents = [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2020, 3, 0),
    end: new Date(2020, 3, 1),
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2020, 3, 7),
    end: new Date(2020, 3, 10),
  },

  {
    id: 2,
    title: 'DTS STARTS',
    start: new Date(2020, 2, 13, 0, 0, 0),
    end: new Date(2020, 2, 20, 0, 0, 0),
  },

  {
    id: 3,
    title: 'DTS ENDS',
    start: new Date(2020, 10, 6, 0, 0, 0),
    end: new Date(2020, 10, 13, 0, 0, 0),
    desc: 'Description is shown here',
  },

  {
    id: 4,
    title: 'Leave',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
    desc: 'Description is shown here',
  },
];

interface Props {
  localizer: DateLocalizer;
  handleAddSchedule: any;
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

function SelectableCalendar({ localizer, handleAddSchedule }: Props) {
  const [isShowing, setIsShowing] = useState(false);
  const [repeat, setRepeat] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [values, setValues] = useState({
    selectuser: '',
    minhours: '',
  });

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
      console.log("handleSelect => ", newEvent);
      setEvents([...(events as any), newEvent]);
      handleAddSchedule(newEvent)
    }
  };

  const openModal = () => {
    setIsShowing(!isShowing);
  };

  const handleChange = (e: any) => {
    if (!e.target) {
      setValues({ ...values, selectuser: e });
    } else {
      const { name, value } = e && e.target;
      setValues({ ...values, [name]: value });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const submitValue = {
      selectUser: values.selectuser,
      minhours: values.minhours,
      repeat: repeat,
      startTime: startTime,
      endTime: endTime,
      startDate: startDate,
      endDate: endDate,
    };
    const title = 'New event added';
    if (title) {
      let newEvent = {} as CalendarEvent;
      newEvent.start = moment(startDate).toDate();
      newEvent.end = moment(endDate).toDate();
      newEvent.title = title;
      setEvents([...(events as any), newEvent]);
    }

    setIsShowing(!isShowing);
    console.log(submitValue, 'submitValue');
  };

  const resetModal = (e: any) => {
    e.preventDefault();
    setRepeat(null);
    setStartDate(null);
    setStartTime(null);
    setEndTime(null);
    setEndDate(null);
    values.selectuser = '';
    values.minhours = '';
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
      <span>
        <em style={{ color: 'magenta' }}>{event.title}</em>
        <p>{event.desc}</p>
      </span>
    );
  };

  const renderModalBody = (): JSX.Element => {
    return (
      <>
        <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} layout="vertical">
          <Form.Item label="User">
            <Select onChange={handleChange} value={values.selectuser}>
              <Select.Option value="user1">User1</Select.Option>
              <Select.Option value="user2">User2</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="DatePicker">
            <DatePicker
              onChange={date => {
                setStartDate(date as any);
              }}
              value={startDate as any}
            />{' '}
            &nbsp;
            <TimePicker
              use12Hours
              format="h:mm a"
              onChange={(time, timeString) => {
                setStartTime(time as any);
              }}
              value={startTime as any}
            />
            &nbsp;TO &nbsp;
            <TimePicker
              use12Hours
              format="h:mm a"
              onChange={(time, timeString) => {
                setEndTime(time as any);
              }}
              value={endTime as any}
            />
            &nbsp;
            <DatePicker
              onChange={date => {
                setEndDate(date as any);
              }}
              value={endDate as any}
            />
          </Form.Item>
          <Form.Item label="Minimum Hours">
            <Input
              name="minhours"
              placeholder="5"
              onChange={handleChange}
              value={values.minhours as any}
            />
          </Form.Item>
          <Form.Item label="Repeats">
            <Select
              onChange={e => {
                setRepeat(e);
              }}
              value={repeat}
            >
              <Select.Option value="never">Never</Select.Option>
              <Select.Option value="yes">Yes</Select.Option>
            </Select>
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

export interface ISchedule {
  handleAddSchedule: Function
}

export default function Schedule(props: ISchedule) {
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
