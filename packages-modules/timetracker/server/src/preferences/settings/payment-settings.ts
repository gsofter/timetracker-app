import { ConfigurationScope, IConfigurationPropertySchema } from '@adminide-stack/core';
import { localize } from '@vscode/monaco-editor/esm/vs/nls';
import { WeekDay } from './general-settings';

const enum PayPeriod {
    NONE = 'None',
    WEEKLY = 'Weekly',
    TWICE_PER_MONTH = 'Twice per month',
    BI_WEEKLY = 'Bi-weekly',
    MONTHLY = 'Monthly',
}

const enum PayRate {
    HOURLY = 'Hourly',
    FIXED = 'Fixed',
}
export const TrackerPaymentProperties: { [path: string]: IConfigurationPropertySchema } = {
    'timetracker.payment.processPayments': {
        type: 'string',
        default: true,
        enum: ['Manually', 'Automatically'],
        enumDescriptions: [
            localize(
                'timetracker.payment.processPayments.manually',
                'When set manually, time need to be updated manually.',
            ),
            localize(
                'timetracker.payment.processPayments.automatically',
                "When set automatically, time is marked as 'paid' in our system and if you have payroll enabled, the payment will be send.",
            ),
        ],
        description: localize(
            'timetracker.payment.processPayments',
            'Choose whether you want to manually send payments or have them automatically processed.',
        ),
        scope: ConfigurationScope.WINDOW,
    },
    'timetracker.payment.sendPaymentAfter': {
        type: 'number',
        default: 0,
        description: localize(
            'timetracker.payment.sendPaymentAfter',
            'Number of days after pay period ends, you would like to send payments for timesheets. ',
        ),
        scope: ConfigurationScope.WINDOW,
    },

    'timetracker.payment.payPeriod': {
        type: 'string',
        enum: [PayPeriod.NONE, PayPeriod.WEEKLY, PayPeriod.TWICE_PER_MONTH, PayPeriod.BI_WEEKLY, PayPeriod.MONTHLY],
        default: PayPeriod.NONE,
        description: localize('timetracker.payment.payPeriod', 'Pay Period'),
        scope: ConfigurationScope.RESOURCE,
    },
    'timetracker.payment.payType': {
        type: 'string',
        enum: [PayRate.HOURLY, PayRate.FIXED],
        default: PayRate.HOURLY,
        description: localize('timetracker.payment.payType', 'Pay type'),
        scope: ConfigurationScope.RESOURCE,
    },
    'timetracker.payment.billRate': {
        type: 'number',
        default: 0.0,
        description: localize('timetracker.payment.billRate', 'Billing Rate'),
        scope: ConfigurationScope.RESOURCE,
    },
    'timetracker.payment.payRate': {
        type: 'number',
        default: 0.0,
        description: localize('timetracker.payment.payRate', 'Paying Rate'),
        scope: ConfigurationScope.RESOURCE,
    },
    'timetracker.payment.requireTimesheetApproval': {
        type: 'boolean',
        default: false,
        description: localize('timetracker.payment.requireTimesheetApproval', 'Whether it requires Timesheet Approval'),
        scope: ConfigurationScope.RESOURCE,
    },
    // User limits
    'timetracker.user.recurringWeeklyLimit': {
        type: 'number',
        default: null,
        description: localize(
            'timetracker.payment.recurringWeeklyLimit',
            'Limits how much time can be tracked each week',
        ),
        scope: ConfigurationScope.RESOURCE,
    },
    'timetracker.user.recurringDailyLimit': {
        type: 'number',
        default: null,
        description: localize(
            'timetracker.payment.recurringDailyLimit',
            'Limits how much time can be tracked each day',
        ),
        scope: ConfigurationScope.RESOURCE,
    },
};