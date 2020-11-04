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

  const onChangeTime = (time, timeString) => {
    console.log(time, timeString);
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
            <Select>
              <Select.Option value="user1">User1</Select.Option>
              <Select.Option value="user2">User2</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="DatePicker">
            <DatePicker /> &nbsp;
            <TimePicker use12Hours format="h:mm a" onChange={onChangeTime} />
            &nbsp;TO &nbsp;
            <TimePicker use12Hours format="h:mm a" onChange={onChangeTime} />
            &nbsp;
            <DatePicker />
          </Form.Item>
          <Form.Item label="Minimum Hours">
            <Input placeholder="5" />
          </Form.Item>
          <Form.Item label="Repeats">
            <Select>
              <Select.Option value="Never">Never</Select.Option>
              <Select.Option value="Yes">Yes</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button htmlType="button">Cancel</Button>
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
        defaultDate={new Date(2020, 4, 21)}
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
