import React, { useState } from 'react';
import { useFela } from 'react-fela';
import CSS from 'csstype';
import { Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import moment from 'moment';
import { ITimeRecord, ITimeRecordRequest } from '@admin-layout/timetracker-core';
import * as _ from 'lodash';
import DurationInput from '../DurationInput';
import TimesheetEditModal from './TimesheetEditModal';
import { useSelector } from 'react-redux';

export interface ITimesheetInputProps {
  dateStr: string;
  projectId?: string;
  records?: ITimeRecord[];
  projects: any[];
  projectTitle?: string;
  disabled?: boolean;
  updateTimeRecord: Function;
  createTimeRecord: Function;
}

export const TimesheetInput = (props: ITimesheetInputProps) => {
  const {
    dateStr,
    records,
    projectId,
    createTimeRecord,
    updateTimeRecord,
    projectTitle,
    disabled,
  } = props;
  const { css } = useFela();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userId = useSelector<any>((state) => state.user.auth0UserId) as string;
  const handleMore = (event) => {
    event.preventDefault();
    setIsModalVisible(true);
  };

  const totalDuration = () => {
    return records.reduce((totalDur, r) => {
      const dur = Math.floor((moment(r.endTime).valueOf() - moment(r.startTime).valueOf()) / 1000);
      return (totalDur = totalDur + Math.abs(dur));
    }, 0);
  };

  const handleChangeDuration = (dur) => {
    if (records === undefined || records.length === 0) {
      // empty
      const newRequest: ITimeRecordRequest = {
        userId,
        startTime: moment(dateStr).add('9', 'hours'),
        endTime: moment(dateStr).add('9', 'hours').add(dur, 'seconds'),
        projectId: projectId,
      };

      createTimeRecord(newRequest);
    } else if (records.length === 1) {
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
            <DurationInput
              duration={totalDuration() as Number}
              onChange={handleChangeDuration}
              disabled={disabled}
            />
            <Button
              icon={<MoreOutlined />}
              onClick={handleMore}
              disabled={disabled}
            />
          </>
        ) : (
          <DurationInput onChange={handleChangeDuration} disabled={disabled} />
        )}
      </div>
    </>
  );
};

const styles: { [key: string]: (arg) => CSS.Properties } = {
  timesheet: (theme) => ({
    display: 'flex',
    flexDirection: 'row',
  }),

  modal: (theme) => ({
    display: 'block',
    '& .date': {
      color: '#eee',
    },
  }),
};
