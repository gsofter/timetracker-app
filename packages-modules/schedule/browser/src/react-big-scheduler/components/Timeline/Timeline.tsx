import React, { useState, useEffect } from 'react';
import TimelineComponent, { TimelineHeaders, DateHeader } from 'react-calendar-timeline';
import moment from 'moment';
import { UserOutlined, ScheduleOutlined } from '@ant-design/icons';
import TimezonePicker from 'react-timezone';
import 'react-calendar-timeline/lib/Timeline.css';
import { Row, Col, Form, Input, Button, Select, DatePicker, Avatar } from 'antd';
import { Modal } from '../Modal';
import { useFela } from 'react-fela';
import { PageContainer } from '@admin-layout/components';
const { TextArea } = Input;
const { RangePicker } = DatePicker;

export interface ITimelineCalendarProps {
  handleAddSchedule: any;
  events: any;
}

const resourceMap = [
  { resourceId: '1', resourceTitle: 'Project1', stackItems: true },
  { resourceId: '2', resourceTitle: 'Project2', stackItems: true },
  { resourceId: '3', resourceTitle: 'Project3', stackItems: true },
  { resourceId: '4', resourceTitle: 'Project4', stackItems: true },
  { resourceId: '5', resourceTitle: 'Project5', stackItems: true },
];

const keys = {
  groupIdKey: 'resourceId',
  groupTitleKey: 'resourceTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'resourceId',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end',
  groupLabelKey: 'resourceTitle',
};

function TimelineCalendar({ handleAddSchedule, events: propEvents }: ITimelineCalendarProps) {
  const [isShowing, setIsShowing] = useState(false);
  const [events, setEvents] = React.useState(propEvents);
  const [selectedUser, setSelectedUser] = useState('');

  const openModal = () => {
    setIsShowing(!isShowing);
  };

  const resetModal = (e: any) => {
    e.preventDefault();
    form.resetFields();
  };

  const handleItemMove = (itemId, dragTime, newGroupOrder) => {
    // tslint:disable-next-line
    console.log('Moved', itemId, dragTime, newGroupOrder);
  };

  const handleItemResize = (itemId, time, edge) => {
    // tslint:disable-next-line
    console.log('Resized', itemId, time, edge);
  };

  const handleClose = () => {
    setIsShowing(false);
  };

  const handleSelectTimezone = timezone => {
    // tslint:disable-next-line
    console.log('New Timezone Selected:', timezone);
  };

  const [form] = Form.useForm();
  const onFinish = values => {
    const request = {
      title: values.title,
      start: moment(values.dateRange[0]).toDate(),
      end: moment(values.dateRange[1]).toDate(),
      userId: values.user,
      resourceId: values.project,
      desc: values.desc,
    };
    handleAddSchedule(request);
    setIsShowing(!isShowing);
    form.resetFields();
  };

  useEffect(() => {
    setEvents(
      propEvents.filter(ev => {
        return ev.userId === selectedUser || selectedUser === '';
      }),
    );
  }, [selectedUser]);

  const renderModalBody = (): JSX.Element => {
    return (
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        onFinish={onFinish}
        form={form}
      >
        <div style={{ margin: '15px 0px' }}>
          <Avatar style={{ backgroundColor: '#3174ad' }} icon={<UserOutlined />} />
          <span style={{ marginLeft: '10px' }}>Cdmbase</span>
        </div>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Required field' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="User" name="user" rules={[{ required: true, message: 'Required field' }]}>
          <Select>
            <Select.Option value="1">User1</Select.Option>
            <Select.Option value="2">User2</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Project"
          name="project"
          rules={[{ required: true, message: 'Required field' }]}
        >
          <Select>
            <Select.Option value="1">Project1</Select.Option>
            <Select.Option value="2">Project2</Select.Option>
            <Select.Option value="3">Project3</Select.Option>
            <Select.Option value="4">Project4</Select.Option>
            <Select.Option value="5">Project5</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="DatePicker"
          name="dateRange"
          rules={[{ required: true, message: 'Required field' }]}
        >
          <RangePicker showTime />
        </Form.Item>
        <Form.Item
          label="REASON *"
          name="desc"
          rules={[{ required: true, message: 'Required field' }]}
        >
          <TextArea rows={3} placeholder="Reason for time" />
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
    );
  };

  const [visibleTimeStart, setVisibleTimeStart] = useState(
    moment()
      .startOf('week')
      .add(1, 'day')
      .valueOf(),
  );
  const [visibleTimeEnd, setVisibleTimeEnd] = useState(
    moment()
      .startOf('week')
      .add(1, 'week')
      .add(1, 'day')
      .valueOf(),
  );
  const onClickPrev = () => {
    const zoom = visibleTimeEnd - visibleTimeStart;
    setVisibleTimeStart(visibleTimeStart - zoom);
    setVisibleTimeEnd(visibleTimeEnd - zoom);
  };

  const onClickNext = () => {
    const zoom = visibleTimeEnd - visibleTimeStart;
    setVisibleTimeStart(visibleTimeStart + zoom);
    setVisibleTimeEnd(visibleTimeEnd + zoom);
  };

  const { css } = useFela();

  const onChangeUser = value => {
    setSelectedUser(value);
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
              </span>
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

      <Row>
        <Col>
          <Button onClick={onClickPrev}> Prev </Button>
          <Button onClick={onClickNext}> Next </Button>
        </Col>
      </Row>
      <TimelineComponent
        keys={keys}
        groups={resourceMap}
        items={events}
        canMove={true}
        canResize={'both'}
        onItemMove={handleItemMove}
        onItemResize={handleItemResize}
        itemHeightRatio={0.75}
        fullUpdate={true}
        itemTouchSendsClick={false}
        stackItems
        visibleTimeStart={visibleTimeStart}
        visibleTimeEnd={visibleTimeEnd}
      >
        <TimelineHeaders style={{ height: 65 }}>
          <DateHeader
            unit="day"
            labelFormat={dates => {
              const curTime = dates[0];
              const isToday = curTime.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');
              return (
                <div className={css(stylesheet.dateHeader)}>
                  <div className="day" style={isToday ? { color: '#2196f3' } : {}}>
                    {curTime.format('DD')}
                  </div>
                  <div className="extra">
                    <span className="week" style={isToday ? { color: '#2196f3' } : {}}>
                      {curTime.format('ddd')}
                    </span>
                    <span className="month">{curTime.format('MMM')}</span>
                  </div>
                </div>
              );
            }}
            style={{ height: 100 }}
            intervalRenderer={({ getIntervalProps, intervalContext, data }) => {
              return (
                <div
                  {...getIntervalProps()}
                  style={{ ...getIntervalProps().style, borderRight: '1px solid #bbb' }}
                >
                  {intervalContext.intervalText}
                </div>
              );
            }}
          />
        </TimelineHeaders>
      </TimelineComponent>
    </PageContainer>
  );
}

const stylesheet: any = {
  styles: theme => ({
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
    '& .react-calendar-timeline .rct-header-root': {
      backgroundColor: '#ffffff',
    },
    '& .rct-calendar-header > div': {
      height: '65px !important',
    },
    '& .react-calendar-timeline': {
      border: '1px solid #bbb',
    },
    '& .react-calendar-timeline .rct-calendar-header': {
      border: 'none',
      borderRight: '1px solid #bbb',
      borderLeft: '1px solid #bbb',
    },
  }),

  dateHeader: theme => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlgin: 'center',
    '& .day': {
      fontSize: '3em',
      fontWeight: '600',
    },
    '& .extra': {
      display: 'flex',
      flexDirection: 'column',
      '& .week': {
        fontSize: '1.1em',
        fontWeight: '500',
      },
      '& .month': {
        color: 'rgba(0,0,0, .5)',
      },
    },
  }),
};

export default props => {
  const { css } = useFela();
  return (
    <div className={css(stylesheet.styles)}>
      <div>
        <TimelineCalendar {...props} />
      </div>
    </div>
  );
};
