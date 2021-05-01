/* eslint-disable max-classes-per-file */
import * as Logger from 'bunyan';
import { injectable, inject, tagged } from 'inversify';
import { IDatabaseMigration } from '@adminide-stack/core';
import { IMoleculerServiceName, IMailServiceAction, IMailerServicesendArgs } from '@container-stack/mailing-api';
import { CommonType } from '@common-stack/core';
import { CallingOptions, ServiceBroker } from 'moleculer';
import { EmailTemplateCodes } from '../constants';

const TimeApprovalTemplate = require('./approval_notification.ejs');
const TimeSubmitTemplate = require('./submit_notification.ejs');

@injectable()
export class TimesheetApprovalMailTemplate implements IDatabaseMigration {
    constructor(
        @inject(CommonType.MOLECULER_BROKER)
        protected broker: ServiceBroker,
        @inject('Settings')
        @tagged('microservice', true)
        private settings: any,
    ) {}

    get id() {
        return EmailTemplateCodes.TIMESHEET_APPROVAL;
    }

    public async up(): Promise<void> {
        const requestData = {
            engine: 'ejs',
            code: EmailTemplateCodes.TIMESHEET_APPROVAL,
            description: 'Timesheet approved',
            html: TimeApprovalTemplate.default,
            text: 'Timesheet approved',
            name: 'Timesheet approval notification',
            topic: 'Timesheet approved.',
        };

        await this.broker.waitForServices('MailService');

        return this.callAction(
            IMailServiceAction.saveTemplate,
            { request: requestData },
            IMoleculerServiceName.MailService,
        );
    }

    private async callAction<T, P = any>(command: string, params?: P, topic?: string, opts?: CallingOptions) {
        return this.broker.call<T, P>(`${topic}.${command}@${this.settings.adminApiNamespace}`, params, opts);
    }
}

@injectable()
export class TimesheetSubmitMailTemplate implements IDatabaseMigration {
    constructor(
        @inject(CommonType.MOLECULER_BROKER)
        protected broker: ServiceBroker,
        @inject('Settings')
        @tagged('microservice', true)
        private settings: any,
    ) {}

    get id() {
        return EmailTemplateCodes.SUBMIT_TIME;
    }

    public async up(): Promise<void> {
        const requestData = {
            engine: 'ejs',
            code: EmailTemplateCodes.SUBMIT_TIME,
            description: 'Timesheet submitted',
            html: TimeSubmitTemplate.default,
            text: 'Timesheet submitted',
            name: 'Timesheet submit notification',
            topic: 'Timesheet submitted.',
        };

        await this.broker.waitForServices('MailService');

        return this.callAction(
            IMailServiceAction.saveTemplate,
            { request: requestData },
            IMoleculerServiceName.MailService,
        );
    }

    private async callAction<T, P = any>(command: string, params?: P, topic?: string, opts?: CallingOptions) {
        return this.broker.call<T, P>(`${topic}.${command}@${this.settings.adminApiNamespace}`, params, opts);
    }
}
