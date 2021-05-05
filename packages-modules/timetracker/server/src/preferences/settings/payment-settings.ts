import { ConfigurationScope, IConfigurationPropertySchema } from '@adminide-stack/core';
import { localize } from '@vscode/monaco-editor/esm/vs/nls';

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

const enum ProcessPayment {
    MANUALLY = 'Manually',
    AUTOMATICALLY = 'Automatically',
}

export const TrackerPaymentProperties: { [path: string]: IConfigurationPropertySchema } = {
    'timetracker.user.payment.processPayments': {
        type: 'string',
        default: ProcessPayment.MANUALLY,
        enum: [ProcessPayment.MANUALLY, ProcessPayment.AUTOMATICALLY],
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
        overridable: true,
    },
    'timetracker.user.payment.sendPaymentAfter': {
        type: 'number',
        default: 0,
        description: localize(
            'timetracker.payment.sendPaymentAfter',
            'Number of days after pay period ends, you would like to send payments for timesheets. ',
        ),
        scope: ConfigurationScope.WINDOW,
        overridable: true,
    },

    'timetracker.user.payment.payPeriod': {
        type: 'string',
        enum: [PayPeriod.NONE, PayPeriod.WEEKLY, PayPeriod.TWICE_PER_MONTH, PayPeriod.BI_WEEKLY, PayPeriod.MONTHLY],
        default: PayPeriod.NONE,
        description: localize('timetracker.payment.payPeriod', 'Pay Period'),
        scope: ConfigurationScope.RESOURCE,
        overridable: true,
    },
    'timetracker.user.payment.payType': {
        type: 'string',
        enum: [PayRate.HOURLY, PayRate.FIXED],
        default: PayRate.HOURLY,
        description: localize('timetracker.payment.payType', 'Pay type'),
        scope: ConfigurationScope.RESOURCE,
        overridable: true,
    },
    'timetracker.user.payment.billRate': {
        type: 'number',
        default: 0.0,
        description: localize('timetracker.payment.billRate', 'Billing Rate'),
        scope: ConfigurationScope.RESOURCE,
        overridable: true,
    },
    'timetracker.user.payment.payRate': {
        type: 'number',
        default: 0.0,
        description: localize('timetracker.payment.payRate', 'Paying Rate'),
        scope: ConfigurationScope.RESOURCE,
        overridable: true,
    },
    'timetracker.user.payment.requireTimesheetApproval': {
        type: 'boolean',
        default: false,
        description: localize('timetracker.payment.requireTimesheetApproval', 'Whether it requires Timesheet Approval'),
        scope: ConfigurationScope.RESOURCE,
        overridable: true,
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
        overridable: true,
    },
    'timetracker.user.recurringDailyLimit': {
        type: 'number',
        default: null,
        description: localize(
            'timetracker.payment.recurringDailyLimit',
            'Limits how much time can be tracked each day',
        ),
        scope: ConfigurationScope.RESOURCE,
        overridable: true,
    },
};
