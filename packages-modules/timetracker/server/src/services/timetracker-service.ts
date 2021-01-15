import * as ILogger from 'bunyan'

import { inject, injectable } from 'inversify'
import { ITimeTrackerService, ITimeTrackerRepository } from '../interfaces'
import { TYPES } from '../constants'
@injectable()
export class TimeTrackerService implements ITimeTrackerService {
    private logger: ILogger;
    constructor(
        @inject(TYPES.ITimeTrackerRepository)
        protected trackerRepository: ITimeTrackerRepository,

        @inject('Logger')
        logger: ILogger
    ) {
        this.logger = logger
    }

    public async getTimeRecords(): Promise<Array<any>> {
        return [];
    }
}