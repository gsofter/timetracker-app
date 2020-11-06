import React, { useState } from "react";
import { Calendar, View, DateLocalizer } from "react-big-calendar";
import moment from "moment";
import { ScheduleOutlined } from "@ant-design/icons";

import { momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  TimePicker,
} from "antd";
import { Modal } from "./Modal";
import { useFela } from "react-fela";
import { values } from "lodash";

const localizer = momentLocalizer(moment);

const allViews: View[] = ["agenda", "day", "week", "month"];

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
    _resourceId?: string
  ) {
    this.title = _title;
    this.allDay = _allDay || false;
    this.start = _start;
    this.end = _endDate;
    this.desc = _desc || "";
    this.resourceId = _resourceId;
  }
}

function SelectableCalendar({ localizer }: Props) {
  const [isShowing, setIsShowing] = useState(false);
  const [repeat, setRepeat] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [values, setValues] = useState({
    selectuser: "",
    minhours: "",
  });

  const [events, setEvents] = useState([
    {
      title: "My event",
      allDay: true,
      start: moment().toDate(),
      end: moment()
        .add(4, "hours")
        .toDate(),
    },
  ] as CalendarEvent[]);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");

    if (title) {
      let newEvent = {} as CalendarEvent;
      newEvent.start = moment(start).toDate();
      newEvent.end = moment(end).toDate();
      newEvent.title = title;

      // Erroneous code
      // events.push(newEvent)
      // setEvents(events)
      setEvents([...events, newEvent]);
    }
  };

  const openModal = () => {
    setIsShowing(!isShowing);
  };
  
  const handleChange = (e: any) => {
    if(!e.target){
      setValues({...values, selectuser: e })
    }
    else{
      const {name, value} = e && e.target
      setValues({...values, [name]:value })
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const submitValue ={
      selectUser: values.selectuser,
      minhours: values.minhours,
      repeat: repeat,
      startTime: startTime,
      endTime: endTime,
      startDate: startDate,
      endDate: endDate
    }
    const title = "New event added"
    if (title) {
      let newEvent = {} as CalendarEvent;
      newEvent.start = moment(startDate).toDate();
      newEvent.end = moment(endDate).toDate();
      newEvent.title = title;
      setEvents([...events, newEvent ])
    }
    
    
    setIsShowing(!isShowing);
    console.log(submitValue, "submitValue");
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

  const renderModalBody = (): JSX.Element => {
    return (
      <>
        <Form
          labelCol={{ span: 21 }}
          wrapperCol={{ span: 21 }}
          layout="vertical"
        >
          <Form.Item label="User">
            <Select onChange={handleChange} value={values.selectuser}>
              <Select.Option value="user1">User1</Select.Option>
              <Select.Option value="user2">User2</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="DatePicker">
            <DatePicker onChange={(date) => { setStartDate(date as any) }} value={startDate as any} />{" "}
            &nbsp;
            <TimePicker
              use12Hours
              format="h:mm a"
              onChange={(time, timeString) => { setStartTime( time as any ) }}
              value={startTime as any}
            />
            &nbsp;TO &nbsp;
            <TimePicker
              use12Hours
              format="h:mm a"
              onChange={(time, timeString) => { setEndTime( time as any ) }}
              value={endTime as any}
            />
            &nbsp;
            <DatePicker onChange={(date) => { setEndDate(date as any) }} value={endDate as any} />
          </Form.Item>
          <Form.Item label="Minimum Hours">
            <Input
              name='minhours'
              placeholder="5"
              onChange={handleChange}
              value={values.minhours as any}
            />
          </Form.Item>
          <Form.Item label="Repeats">
            <Select onChange={(e)=> {
              setRepeat(e)
            }} value={repeat}>
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
    <>
      <Row
        align="middle"
        justify="space-between"
        style={{ marginBottom: "15px" }}
      >
        <Col>
          <div style={{ textAlign: "center" }}>
            <h3>Attendance schedules</h3>
          </div>
        </Col>
      </Row>
      <Row align="middle" justify="space-between">
        <Col>
          <div>
            <Form
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              layout="vertical"
              style={{ width: "150px" }}
            >
              <Form.Item label="My time zone">
                <Select>
                  <Select.Option value="user1">User1</Select.Option>
                  <Select.Option value="user2">User2</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Col>
          <div>
            <Form
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              layout="vertical"
              style={{ width: "150px" }}
            >
              <Form.Item label="Members">
                <Select>
                  <Select.Option value="user1">User1</Select.Option>
                  <Select.Option value="user2">User2</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Col>
          <a href="#">
            <span>
              <ScheduleOutlined />
            </span>{" "}
            schedule settings
          </a>
        </Col>
        <Col>
          <div>
            <span style={{ fontWeight: "bold" }}>
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
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        defaultView="month"
        views={allViews}
        defaultDate={new Date()}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        // components={{
        //   day: { header: MyCustomHeader }
        // }}
      />
    </>
  );
}

export default (props) => {
  const { css } = useFela();
  return (
    <div className={css(stylesheet.styles)}>
      <div style={{ height: "70vh", width: "1030px" }}>
        <SelectableCalendar localizer={localizer} />
      </div>
    </div>
  );
};

const stylesheet: any = {
  styles: (theme) => ({
    position: "relative",
    "& .ant-select-single:not(.ant-select-customize-input) .ant-select-selector": {
      // width: '150px !important'
    },
  }),
};
