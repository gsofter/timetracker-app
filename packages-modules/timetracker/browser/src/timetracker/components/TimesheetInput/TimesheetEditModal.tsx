import React, { useEffect, useState } from 'react';
import {
  Modal,
  Row,
  Col,
  Divider,
  Select,
  Input,
  Switch,
  Alert,
  TimePicker,
  Form,
  Button,
} from 'antd';
import {
  ITimeRecord,
  ITimeRecordRequest,
  RemoveDurationTimeRecordsDocument,
} from '@admin-layout/timetracker-module-core';
import moment from 'moment';
import { useFela } from 'react-fela';
import CSS from 'csstype';
import * as _ from 'lodash';

const { RangePicker } = TimePicker;

interface ITimesheetEditModalProps {
  show: boolean;
  records: ITimeRecord[];
  handleOk: () => void;
  handleClose: () => void;
  handleSaveRecord: Function;
}

export default function TimesheetEditModal({
  show,
  records,
  handleOk,
  handleClose,
  handleSaveRecord,
}: ITimesheetEditModalProps) {
  const [startTime, setStartTime] = useState(moment());
  const [endTime, setEndTime] = useState(moment());
  const { css } = useFela();

  useEffect(() => {
    setStartTime(records[0].startTime);
    setEndTime(records[0].endTime);
  }, [records]);
  const renderDateString = () => {
    if (records.length > 0) return moment(records[0].startTime).format('YYYY-MM-DD');
  };

  const totalDuration = () => {
    let totalDur = 0;
    records.forEach(r => {
      const dur = Math.floor((moment(r.endTime).valueOf() - moment(r.startTime).valueOf()) / 1000);
      totalDur = totalDur + dur;
    });
    return totalDur;
  };

  const handleChangeRange = (ranges, str) => {
    const rangeStart = ranges[0];
    const rangeEnd = ranges[1];
    setStartTime(rangeStart);
    setEndTime(rangeEnd);
  };

  const handleSave = () => {
    const updateRequest: ITimeRecordRequest = {
      ..._.omit(records[0], ['__typename', 'id']),
      startTime,
      endTime,
    };
    handleSaveRecord(records[0].id, updateRequest);
  };

  const renderDurationRange = () => {
    if (records.length === 1) {
      return (
        <Row>
          <Col>
            <Input value={totalDuration()} />
          </Col>
          <Col>
            <RangePicker
              defaultValue={[moment(startTime), moment(endTime)]}
              onChange={handleChangeRange}
              format="HH:mm"
              bordered={false}
            />
          </Col>
        </Row>
      );
    }
  };
  return (
    <Modal
      title="Edit Timesheet"
      visible={show}
      onCancel={handleClose}
      className={css(styles.modal)}
    >
      <Form>
        <p className="date"> {renderDateString} </p>
        {renderDurationRange()}
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
            {records.length === 1 ? <Switch /> : <Alert type="warning" message="Not Available" />}
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

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
