import React, { useEffect } from 'react';
import CSS from 'csstype';
import {
  Modal,
  Form,
  Select,
  Input,
  Avatar,
  Row,
  Col,
  DatePicker,
  TimePicker,
  Checkbox,
  Button,
  Popconfirm,
} from 'antd';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';
import { useFela } from 'react-fela';
import {
  ITimeRecord,
  ITimeRecordRequest,
  IOrgMember,
  IProjects as IProject,
} from '@admin-layout/timetracker-core';
import moment from 'moment';
import Spacer from '../../components/Spacer';
import { withTimeformat } from '../../components/hoc'
const { RangePicker } = TimePicker;

export interface ITimesheetModalProps {
  userId: string;
  event?: ITimeRecord;
  isShowModal: boolean;
  members: Array<IOrgMember>;
  projects: Array<IProject>;
  loading: boolean;
  handleAddTimeRecordEvent: Function;
  handleUpdateTimeRecordEvent: Function;
  handleRemoveTimeRecordEvent: () => void;
  handleCloseTimeModal: () => void;
}

const TimesheetModal = ({
  userId,
  event,
  isShowModal,
  members,
  projects,
  loading,
  handleAddTimeRecordEvent,
  handleUpdateTimeRecordEvent,
  handleRemoveTimeRecordEvent,
  handleCloseTimeModal,
}: ITimesheetModalProps) => {
  const { css } = useFela();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      userId: event?.userId || '',
      projectId: event?.projectId || '',
      isBillable: event?.isBillable || false,
      timeRange: [event?.startTime || moment(), event?.endTime || moment()],
      date: event?.startTime || moment(),
    });
  }, [event]);

  const onFinish = values => {
    const request: ITimeRecordRequest = {
      userId,
      startTime: moment(
        values.date.format('YYYY-MM-DD') + ' ' + values.timeRange[0].format('HH:mm:ss'),
      ).toDate(),
      endTime: moment(
        values.date.format('YYYY-MM-DD') + ' ' + values.timeRange[1].format('HH:mm:ss'),
      ).toDate(),
      projectId: values.projectId,
      isBillable: values.isBillable,
    };
    if (event.id === undefined) handleAddTimeRecordEvent(request);
    else handleUpdateTimeRecordEvent(event.id, request);
  };

  const resetModal = () => {
    form.resetFields();
  };

  const generateUserName = () => {
    const user = members.find(m => m.userId === userId);
    if (user !== undefined) return user.name;
    return '';
  };
  return (
    <Modal
      title={event.id === undefined ? 'Add time record' : 'Edit time record'}
      visible={isShowModal}
      onCancel={handleCloseTimeModal}
      footer={false}
    >
      <>
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
          onFinish={onFinish}
          className={css(stylesheet.form)}
          form={form}
        >
          <div style={{ margin: '15px 0px' }}>
            <Avatar style={{ backgroundColor: '#3174ad' }} icon={<UserOutlined />} />
            <span style={{ marginLeft: '10px' }}>{generateUserName()}</span>
          </div>
          <Form.Item
            label="User"
            name="userId"
            rules={[{ required: true, message: 'Required field' }]}
          >
            <Select>
              {members.map(member => {
                return (
                  <Select.Option value={member.userId} key={member.userId}>
                    {member.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Projects"
            name="projectId"
            rules={[{ required: true, message: 'Required field' }]}
          >
            <Select>
              {projects.map(res => {
                return (
                  <Select.Option value={res.id} key={res.id}>
                    {res.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item label="Task" name="taskId">
            <Select disabled={event?.projectId === '' || !!!event?.projectId}>
              {[].map(task => {
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
                <RangePicker format="HH:mm:ss" bordered={false} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Billable" name="isBillable" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item label="Tags" name="tags">
            <Select mode="tags" />
          </Form.Item>

          <Form.Item>
            <Row className="footer">
              <Button htmlType="button" onClick={resetModal}>
                Reset
              </Button>
              &nbsp;
              {event !== -1 ? (
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
    </Modal>
  );
};

export default withTimeformat(TimesheetModal);

const stylesheet: { [property: string]: (props) => CSS.Properties } = {
  form: props => ({
    display: 'block',
    '& .footer': {
      display: 'flex',
      flexDirection: 'row',
    },
  }),
};
