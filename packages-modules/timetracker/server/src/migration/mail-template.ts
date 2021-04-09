import * as Logger from 'bunyan';
import { Connection, Model } from 'mongoose';
import { injectable, inject } from 'inversify';
import { MailTemplateModelFunc } from '@adminide-stack/platform-server';
import { EmailTemplateCodes } from '../constants';
var TimeApprovalTemplate = require('./approval-notification.ejs');

@injectable()
export class TimesheetApprovalMailTemplate {
  constructor(
    @inject('Logger') private logger: Logger,
    @inject('MongoDBConnection') private db: Connection,
  ) {}

  public async up(): Promise<void> {
    const model = MailTemplateModelFunc(this.db);
    model.create({
      engine: 'ejs',
      code: EmailTemplateCodes.TIMESHEET_APPROVAL,
      description: 'Timesheet approved',
      html: TimeApprovalTemplate.default,
      text: 'Timesheet approved',
      name: EmailTemplateCodes.TIMESHEET_APPROVAL,
      topic: 'Timesheet approved.',
    });
  }
}
