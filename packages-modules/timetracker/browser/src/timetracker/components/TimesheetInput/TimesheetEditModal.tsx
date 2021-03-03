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
} from '@admin-layout/timetracker-core';
import moment from 'moment';
import { useFela } from 'react-fela';
import CSS from 'csstype';
import * as _ from 'lodash';
import DurationInput from '../DurationInput';
const { RangePicker } = TimePicker;

interface ITimesheetEditModalProps {
  show: boolean;
  records: ITimeRecord[];
  handleOk: () => void;
  handleClose: () => void;
  handleSaveRecord: Function;
  projectTitle?: string;
}

export default function TimesheetEditModal({
  show,
  records,
  handleOk,
  handleClose,
  handleSaveRecord,
  projectTitle,
}: ITimesheetEditModalProps) {
  const [startTime, setStartTime] = useState(moment());
  const [endTime, setEndTime] = useState(moment());
  const [duration, setDuration] = useState(0);
  const [taskName, setTaskName] = useState('');
  const [isBillable, setIsBillable] = useState(false);
  const { css } = useFela();

  useEffect(() => {
    setStartTime(records[0].startTime);
    setEndTime(records[0].endTime);
    setDuration(totalDuration());
    setTaskName(records[0].taskName);
    setIsBillable(records[0].isBillable);
  }, [records]);

  useEffect(() => {
    setDuration(Math.floor((moment(endTime).valueOf() - moment(startTime).valueOf()) / 1000));
  }, [startTime, endTime]);

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
      isBillable,
      taskName,
    };
    handleSaveRecord(records[0].id, updateRequest);
  };

  const handleChangeDuration = duration => {
    setEndTime(moment(startTime).add(duration, 'seconds'));
  };

  const handleChangeTaskName = event => {
    setTaskName(event.target.value);
  };

  const handleChangeBillable = checked => {
    setIsBillable(checked);
  };
  const renderDurationRange = () => {
    if (records.length === 1) {
      return (
        <Row>
          <Col>
            <DurationInput duration={duration} onChange={handleChangeDuration} />
          </Col>
          <Col>
            <RangePicker
              value={[moment(startTime), moment(endTime)]}
              onChange={handleChangeRange}
              format="HH:mm:ss"
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
      footer={false}
    >
      <Form>
        <p className="date"> {renderDateString()} </p>
        <h3 className="project-name"> {projectTitle}</h3>
        <Divider />
        {renderDurationRange()}
        <Divider />
        <Row className="form-row">
          <Col sm={6}> Description: </Col>
          <Col sm={18}>
            <Input value={taskName} onChange={handleChangeTaskName} />
          </Col>
        </Row>
        <Row className="form-row">
          <Col sm={6}> Tags: </Col>
          <Col sm={18}>
            <Select mode="tags" style={{ width: '100%' }} />
          </Col>
        </Row>
        <Row className="form-row">
          <Col sm={6}>Billable</Col>
          <Col sm={18}>
            {records.length === 1 ? (
              <Switch checked={isBillable} onChange={handleChangeBillable} />
            ) : (
              <Alert type="warning" message="Not Available" />
            )}
          </Col>
        </Row>
        <Divider />
        <Row className="footer">
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
          <div className="spacer"> </div>
          <Button onClick={handleClose}>Cancel</Button>
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

    '& .form-row': {
      marginTop: '10px',
    },

    '& .footer': {
      display: 'flex',
      flexDirection: 'row',
      '& .spacer': {
        flexGrow: '1',
      },
    },
  }),
};
