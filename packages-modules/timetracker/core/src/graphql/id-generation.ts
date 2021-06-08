/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-underscore-dangle */
import { IClientCacheTypeNames } from '../interfaces/generated-models';

export const dataIdFromObject = {
    [IClientCacheTypeNames.TimeTracker]: (result: { id: string } = { id: '' }) =>
        `${IClientCacheTypeNames.TimeTracker}:${result.id}`,
    [IClientCacheTypeNames.TimeRecord]: (result: { id: string } = { id: '' }) =>
        `${IClientCacheTypeNames.TimeRecord}:${result.id}`,
    [IClientCacheTypeNames.Timesheet]: (result: { id: string } = { id: '' }) =>
        `${IClientCacheTypeNames.Timesheet}:${result.id}`,
};
