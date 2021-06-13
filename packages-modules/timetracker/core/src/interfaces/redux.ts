import { ITimeRecord } from './generated-models';

export interface ITimerAction {
    type: string;
    payload: ITimeRecord;
}
