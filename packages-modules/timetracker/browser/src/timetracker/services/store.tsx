import store from 'store';
import { ITimeRecord } from '@admin-layout/timetracker-core';
export const saveTimeRecord = (timeRecord: ITimeRecord) => {
  store.set('playing_record', timeRecord);
};

export const clearTimeRecord = () => {
  store.set('playing_record', null);
};

export const getTimeRecord = (): ITimeRecord => {
  return store.get('playing_record') as ITimeRecord;
};
