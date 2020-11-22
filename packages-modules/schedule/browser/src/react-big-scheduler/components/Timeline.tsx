import React, { useState } from "react";
import TimelineComponent from "react-calendar-timeline";
import moment from "moment";
import { UserOutlined, ScheduleOutlined } from "@ant-design/icons";
import TimezonePicker from "react-timezone";
import "react-calendar-timeline/lib/Timeline.css";
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
} from "antd";
import { Modal } from "./Modal";
import { useFela } from "react-fela";

const { TextArea } = Input;

const resourceMap = [
  { id: 1, title: "group 1" },
  { id: 2, title: "group 2" },
  { id: 3, title: "group 3" },
];

const items = [
  {
    id: 1,
    group: 1,
    title: "item 1",
    start_time: moment(),
    end_time: moment().add(1, "hour"),
  },
  {
    id: 2,
    group: 2,
    title: "item 2",
    start_time: moment().add(5, "hour"),
    end_time: moment().add(10, "hour"),
  },
  {
    id: 3,
    group: 1,
    title: "item 3",
    start_time: moment().add(2, "hour"),
    end_time: moment().add(3, "hour"),
  },
];

function TimelineCalendar(Props) {
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
  const [events, setEvents] = React.useState(items);

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
    const title = "New event added";
    if (title) {
      let now = moment(startTime).format("HH:mm:ss");
      let then = moment(endTime).format("HH:mm:ss");
      let calculateTime = moment
        .utc(then, "HH:mm:ss")
        .diff(moment.utc(now, "HH:mm:ss"), "h");

      setEvents([
        ...events,
        {
          id: Math.floor(Math.random() * 10000),
          group: 2,
          title: selecttask,
          start_time: moment(),
          end_time: moment().add(calculateTime, "hour"),
        },
      ]);
      setResourceMap([
        ...resource,
        {
          id: Math.floor(Math.random() * 10000),
          title: selectproject,
        },
      ]);
    }

    setIsShowing(!isShowing);
    console.log(submitValue, "submitValue");
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

  const handleItemMove = (itemId, dragTime, newGroupOrder) => {
    console.log("Moved", itemId, dragTime, newGroupOrder);
  };

  const handleItemResize = (itemId, time, edge) => {
    console.log("Resized", itemId, time, edge);
  };

  const renderModalBody = (): JSX.Element => {
    return (
      <>
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
        >
          <div style={{ margin: "15px 0px" }}>
            <Avatar
              style={{ backgroundColor: "#3174ad" }}
              icon={<UserOutlined />}
            />
            <span style={{ marginLeft: "10px" }}>Cdmbase</span>
          </div>
          <Form.Item label="Projects">
            <Select
              onChange={(e) => {
                setSelectproject(e);
              }}
              value={selectproject}
            >
              <Select.Option value="Admin-project1">
                Admin-project1
              </Select.Option>
              <Select.Option value="Admin-project2">
                Admin-project2
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="TO DO">
            <Select
              onChange={(e) => {
                setSelecttask(e);
              }}
              value={selecttask}
            >
              <Select.Option value="task1">Task1</Select.Option>
              <Select.Option value="task2">Task2</Select.Option>
              <Select.Option value="task3">Task3</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="DatePicker">
            <DatePicker
              onChange={(date) => {
                setStartDate(date as any);
              }}
              value={startDate as any}
            />{" "}
            &nbsp;
            <span>From </span>
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
          </Form.Item>
          <Form.Item>
            <Checkbox
              onChange={(e) => {
                onChange(e.target.checked);
              }}
            >
              Checkbox
            </Checkbox>
          </Form.Item>
          <Form.Item label="REASON *">
            <TextArea
              rows={3}
              onChange={(e) => {
                setReason(e.target.value as any);
              }}
              value={reason}
              placeholder="Reason for time"
            />
          </Form.Item>
          <Form.Item label="Note">
            <TextArea
              onChange={(e) => setNote(e.target.value as any)}
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
        style={{ marginBottom: "15px" }}
      >
        <Col>
          <div style={{ textAlign: "center" }}>
            <h3>View & edit timesheets</h3>
          </div>
        </Col>
      </Row>
      <Row align="middle" gutter={[24, 16]}>
        <Col md={6} xs={16} style={{ top: "-10px" }}>
          <span>Select Timezone</span>
          <TimezonePicker
            value="Asia/Yerevan"
            onChange={(timezone) =>
              console.log("New Timezone Selected:", timezone)
            }
            inputProps={{
              placeholder: "Select Timezone...",
              name: "timezone",
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
              </span>{" "}
              Timesheet settings
            </a>
          </div>
        </Col>
        <Col md={6} xs={16}>
          <div>
            <span style={{ fontWeight: "bold" }}>
              <a onClick={openModal}>Add Time</a>
            </span>
            <Modal
              modalTitle="Add Time"
              showModal={isShowing}
              handleClose={() => setIsShowing(false)}
              modalBody={renderModalBody()}
            />
          </div>
        </Col>
      </Row>
      <TimelineComponent
        groups={resource}
        items={events}
        defaultTimeStart={moment().add(-12, "hour")}
        defaultTimeEnd={moment().add(12, "hour")}
        canMove={true}
        canResize={"both"}
        onItemMove={handleItemMove}
        onItemResize={handleItemResize}
        itemHeightRatio={0.75}
        fullUpdate
        itemTouchSendsClick={false}
        stackItems
      />
    </>
  );
}

export default (props) => {
  const { css } = useFela();
  return (
    <div className={css(stylesheet.styles)}>
      <div>
        <TimelineCalendar />
      </div>
    </div>
  );
};

const stylesheet: any = {
  styles: (theme) => ({
    position: "relative",
    width: "100%",
    "& .sm-screen-size": {
      "@media (max-width: 768px)": {
        width: "100% !important",
      },
    },
    "& ul.jsx-4179805763": {
      zIndex: 1050,
      webkitBoxSizing: "border-box",
      boxSizing: "border-box",
      padding: "4px 0",
      fontSize: "13px",
      maxHeight: "100px",
      fontVariant: "initial",
      backgroundColor: "#fff",
      borderRadius: "2px",
      outline: "none",
      webkitBoxShadow:
        "0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
      boxShadow:
        "0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
    },
    "& div.jsx-4179805763": {
      marginTop: "8px",
      width: "100%",
    },
    "& .rbc-day-slot": {
      position: "relative",
    },
    "& .rbc-day-slot .rbc-events-container": {
      bottom: 0,
      left: 0,
      position: "absolute",
      right: 0,
      marginRight: "10px",
      top: 0,
    },
    "& .rbc-day-slot .rbc-events-container.rbc-rtl": {
      left: "10px",
      right: 0,
    },
    "& .rbc-day-slot .rbc-event": {
      border: "1px solid #265985",
      display: "flex",
      maxHeight: "100%",
      minHeight: "20px",
      flexFlow: "column wrap",
      alignItems: "flex-start",
      overflow: "hidden",
      position: "absolute",
    },
    "& .rbc-event": {
      border: "none",
      boxShadow: "none",
      margin: 0,
      padding: "2px 5px",
      backgroundColor: "#3174ad",
      borderRadius: "5px",
      color: "#fff",
      cursor: "pointer",
      width: "100%",
      textAlign: "left",
    },
    "& .react-calendar-timeline .rct-header-root": {
      backgroundColor: "#087acc",
    },
  }),
};
