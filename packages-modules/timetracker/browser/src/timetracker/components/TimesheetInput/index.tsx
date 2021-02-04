import React, { useState } from 'react';
import { useFela } from 'react-fela';
import CSS from 'csstype';
import { Button, Input, Modal, Row, Col, Divider, Select, Switch } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import moment from 'moment';
import { formatDuration } from '../../services/timeRecordService';

export interface ITimesheetInputProps {
  workDur?: any;
  startTime?: Date;
  endTime?: Date;
  date?: Date;
  taskName?: string;
}

export const TimesheetInput = (props: ITimesheetInputProps) => {
  const { css } = useFela();
  const { workDur, taskName } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleMore = event => {
    setIsModalVisible(true);
  };

  return (
    <>
      <Modal
        title="Edit Timesheet"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        className={css(styles.modal)}
      >
        <p className="date"> 02/05/2021 </p>
        <p> {taskName} </p>
        <Divider />
        <Row>
          <Col sm={6}> Description: </Col>
          <Col sm={18}>
            <Input />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col sm={6}> Tags: </Col>
          <Col sm={18}>
            <Select mode="tags" style={{ width: '100%' }} />
          </Col>
          <Col sm={6}>Billable</Col>
          <Col sm={18}>
            <Switch />
          </Col>
        </Row>
      </Modal>
      <div className={css(styles.timesheet)}>
        {workDur !== undefined ? (
          <>
            <Input value={formatDuration(Math.floor(workDur / 1000))} />
            <Button icon={<MoreOutlined />} onClick={handleMore} />
          </>
        ) : (
          <Input value={workDur} />
        )}
      </div>
    </>
  );
};

const styles: { [key: string]: (arg) => CSS.Properties } = {
  timesheet: theme => ({
    display: 'flex',
    flexDirection: 'row',
  }),

  modal: theme => ({
    display: 'block',
    '& .date': {
      color: '#eee',
    },
  }),
};
