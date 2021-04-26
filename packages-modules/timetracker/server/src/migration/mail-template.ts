import * as Logger from 'bunyan';
import { Connection, Model } from 'mongoose';
import { injectable, inject } from 'inversify';
import { IDatabaseMigration } from '@adminide-stack/core';
import { MailTemplateModelFunc } from '@adminide-stack/platform-server';
import { EmailTemplateCodes } from '../constants';
var TimeApprovalTemplate = require('./approval_notification.ejs');
var TimeSubmitTemplate = require('./submit_notification.ejs');

@injectable()
export class TimesheetApprovalMailTemplate implements IDatabaseMigration {
  constructor(
    @inject('Logger') private logger: Logger,
    @inject('MongoDBConnection') private db: Connection,
  ) {}

  get id() {
    return EmailTemplateCodes.TIMESHEET_APPROVAL;
  }

  public async up(): Promise<void> {
    const model = MailTemplateModelFunc(this.db);
    const previousTemplate = await model.findOne({ code: EmailTemplateCodes.TIMESHEET_APPROVAL });
    if (previousTemplate) {
      await model.findByIdAndRemove(previousTemplate.id);
    }
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
export class TimesheetSubmitMailTemplate implements IDatabaseMigration {
  constructor(
    @inject('Logger') private logger: Logger,
    @inject('MongoDBConnection') private db: Connection,
  ) {}

  get id() {
    return EmailTemplateCodes.SUBMIT_TIME;
  }
  public async up(): Promise<void> {
    const model = MailTemplateModelFunc(this.db);
    const previousTemplate = await model.findOne({ code: EmailTemplateCodes.SUBMIT_TIME });
    if (previousTemplate) {
      await model.findByIdAndRemove(previousTemplate.id);
    }
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
