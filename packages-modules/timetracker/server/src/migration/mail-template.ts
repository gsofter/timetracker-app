import * as Logger from 'bunyan';
import { Connection, Model } from 'mongoose';
import { injectable, inject } from 'inversify';
import { MailTemplateModelFunc } from '@adminide-stack/platform-server';
import { EmailTemplateCodes } from '../constants';
var TimeApprovalTemplate = require('./approval_notification.ejs');
var TimeSubmitTemplate = require('./submit_notification.ejs');

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
      name: 'Timesheet approval notification',
      topic: 'Timesheet approved.',
    });
  }
}

@injectable()
export class TimesheetSubmitMailTemplate {
  constructor(
    @inject('Logger') private logger: Logger,
    @inject('MongoDBConnection') private db: Connection,
  ) {}

  public async up(): Promise<void> {
    const model = MailTemplateModelFunc(this.db);
    model.create({
      engine: 'ejs',
      code: EmailTemplateCodes.SUBMIT_TIME,
      description: 'Timesheet submitted',
      html: TimeSubmitTemplate.default,
      text: 'Timesheet submitted',
      name: 'Timesheet submit notification',
      topic: 'Timesheet submitted.',
    });
  }
}
