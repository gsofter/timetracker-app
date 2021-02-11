import React, { useState } from 'react';
import { useFela } from 'react-fela';
import CSS from 'csstype';
import { Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import moment from 'moment';
import { ITimeRecord, ITimeRecordRequest } from '@admin-layout/timetracker-module-core';
import * as _ from 'lodash';
import DurationInput from '../DurationInput';
import TimesheetEditModal from './TimesheetEditModal';

export interface ITimesheetInputProps {
  dateStr: string;
  projectId?: string;
  records?: ITimeRecord[];
  updateTimeRecord: Function;
  createTimeRecord: Function;
  projects: any[];
  projectTitle?: string;
}

export const TimesheetInput = (props: ITimesheetInputProps) => {
  const { dateStr, records, projectId, createTimeRecord, updateTimeRecord, projectTitle } = props;
  const { css } = useFela();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleMore = event => {
    console.log('handleMore');
    setIsModalVisible(true);
  };

  const totalDuration = () => {
    let totalDur = 0;
    records.forEach(r => {
      const dur = Math.floor((moment(r.endTime).valueOf() - moment(r.startTime).valueOf()) / 1000);
      totalDur = totalDur + dur;
    });
    return totalDur;
  };

  const handleChangeDuration = dur => {
    if (records === undefined || records.length === 0) {
      // empty
      const newRequest: ITimeRecordRequest = {
        startTime: moment(dateStr).add('9', 'hours'),
        endTime: moment(dateStr)
          .add('9', 'hours')
          .add(dur, 'seconds'),
        projectId: projectId,
      };

      createTimeRecord(newRequest);
    } else if (records.length === 1) {
      console.log('duration', dur);
      const updatedEndTime = moment(records[0].startTime).add(dur, 'seconds');
      const updateRequest = {
        ..._.omit(records[0], ['id', '__typename']),
        endTime: updatedEndTime,
      };
      updateTimeRecord(records[0].id, updateRequest);
    }
  };

  const handleSaveRecord = (id: string, request: ITimeRecordRequest) => {
    updateTimeRecord(id, request);
    setIsModalVisible(false);
  };

  return (
    <>
      {records && records.length >= 1 ? (
        <TimesheetEditModal
          show={isModalVisible}
          records={records}
          handleClose={() => setIsModalVisible(false)}
          handleOk={() => setIsModalVisible(false)}
          handleSaveRecord={handleSaveRecord}
          projectTitle={projectTitle}
        />
      ) : null}
      <div className={css(styles.timesheet)}>
        {records && records.length > 0 ? (
          <>
            <DurationInput duration={totalDuration() as Number} onChange={handleChangeDuration} />
            <Button icon={<MoreOutlined />} onClick={handleMore} />
          </>
        ) : (
          <DurationInput onChange={handleChangeDuration} />
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
