import { ConfigurationScope } from '@adminide-stack/core';
import { localize } from '@vscode/monaco-editor/esm/vs/nls';
import { IConfigurationNode } from '@adminide-stack/core';
import { IConfigurationContributionNames  } from '@admin-layout/timetracker-core';

// const localize = (id, defaultMessage) => defineMessages({
//     id,
//     defaultMessage,

// });
const enum TimeFormat {
    ROUNDED_0_0 = '"H.m" (rounded)',
    ROUNDED_0_00 = '"H.mm" (rounded)',
    PRECISE_00_00_00 = '"HH:mm:ss" (precise)',
    ROUNDED_UP_00_00 = '"HH:mm" (rounded up)'
}

const enum DateFormat {
    USFORMAT = '"MM-DD-YYYY" (US standard)',
    UKFORMAT = '"DD-MM-YYYY" (UK standard)',
    ISOFORMAT = '"YYYY-MM-DD" (ISO)',
}


const enum TimeRoundingUpToValue {
    IN_MINUTES_15 = 15*60,
    IN_MINUTES_1 = 1*60,
    IN_MINUTES_5 = 5*60,
    IN_MINUTES_6 = 6*60,
    IN_MINUTES_10 = 10*60,
    IN_MINUTES_12 = 12*60,
    IN_MINUTES_30 = 30*60,
    IN_HOUR_1  = 1*60*60,
    IN_HOUR_4 = 4*60*60
}

const enum TimeRoundedType {
    ROUND_UP_TO,
    ROUND_TO_NEAREST,
    ROUND_DOWN_TO,
}
export const TimeTrackerProperties = {
    'timetracker.timerecord.automaticLock': {
        'type': 'string',
        'default': null,
        'description': localize('accountNotificationPrimaryEmail', 'Prevent regular users from editing their past time or adding new entries to past dates'),
        'scope': ConfigurationScope.RESOURCE,
    },
    'timetracker.project.billable': {
        'type': 'boolean',
        'default': true,
        'description': localize('timetracker.project.billable', 'When you create a project, make it billable so its time entries are set as billable by default.'),
        'scope': ConfigurationScope.WINDOW,
    },
    'timetracker.project.firstWeekOfTheyear': {
        'type': 'string',
        'enum': [],
        'default': 'private',
        'enumDescriptions': [
            localize('timetracker.project.timeFormat.ROUNDED_0_0', '"0.0" (rounded)'),
            localize('timetracker.project.timeFormat.ROUNDED_0_00', 'Rounded to 0.00'),
            localize('timetracker.project.timeFormat.PRECISE_00_00_00', 'Precise time without rounding.'),
            localize('timetracker.project.timeFormat.ROUNDED_UP_00_00', 'Rounded up to 00.00'),
        ],
        'description': localize('timetracker.project.timeFormat', 'Select the format in which you want your entry represented'),
        'scope': ConfigurationScope.RESOURCE,
    },
    'timetracker.project.timeFormat': {
        'type': 'string',
        'enum': [TimeFormat.ROUNDED_0_0, TimeFormat.ROUNDED_0_00, TimeFormat.PRECISE_00_00_00, TimeFormat.ROUNDED_UP_00_00],
        'default': TimeFormat.PRECISE_00_00_00,
        'enumDescriptions': [
            localize('timetracker.project.timeFormat.ROUNDED_0_0', '"H.m" (rounded)'),
            localize('timetracker.project.timeFormat.ROUNDED_0_00', '"H.mm" (rounded)'),
            localize('timetracker.project.timeFormat.PRECISE_00_00_00', '"HH:mm:ss" (precise)'),
            localize('timetracker.project.timeFormat.ROUNDED_UP_00_00', '"HH:mm" (rounded up)'),
        ],
        'description': localize('timetracker.project.timeFormat', 'Select the format in which you want your entry represented'),
        'scope': ConfigurationScope.RESOURCE,
    },
    'timetracker.project.dateFormat': {
        'type': 'string',
        'enum': [DateFormat.USFORMAT, DateFormat.UKFORMAT, DateFormat.ISOFORMAT],
        'default': DateFormat.USFORMAT,
        'enumDescriptions': [
            localize('timetracker.project.dateFormat.USFORMAT', '"MM-DD-YYYY" (US standard)'),
            localize('timetracker.project.dateFormat.UKFORMAT', '"DD-MM-YYYY" (UK standard)'),
            localize('timetracker.project.dateFormat.ISOFORMAT', '"YYYY-MM-DD" (ISO FORMAT)'),
        ],
        'description': localize('timetracker.project.dateFormat', 'Select the format in which you want your entry represented'),
        'scope': ConfigurationScope.RESOURCE,
    },
    'timetracker.project.roundedToNearest': {
        'type': 'string',
        'enum': [
            TimeRoundingUpToValue.IN_MINUTES_1,
            TimeRoundingUpToValue.IN_MINUTES_5,
            TimeRoundingUpToValue.IN_MINUTES_6,
            TimeRoundingUpToValue.IN_MINUTES_10,
            TimeRoundingUpToValue.IN_MINUTES_12,
            TimeRoundingUpToValue.IN_MINUTES_15,
            TimeRoundingUpToValue.IN_MINUTES_30,
            TimeRoundingUpToValue.IN_HOUR_1,
            TimeRoundingUpToValue.IN_HOUR_4,
        ],
        'default': TimeRoundingUpToValue.IN_MINUTES_15,
        'enumDescriptions': [
            localize('TimeRoundingUpToValue.IN_MINUTES_1','1 minute'),
            localize('TimeRoundingUpToValue.IN_MINUTES_5', '5 minutes'),
            localize('TimeRoundingUpToValue.IN_MINUTES_6', '6 minutes'),
            localize('TimeRoundingUpToValue.IN_MINUTES_10', '10 minutes'),
            localize('TimeRoundingUpToValue.IN_MINUTES_12', '12 minutes'),
            localize('TimeRoundingUpToValue.IN_MINUTES_15', '15 minutes'),
            localize('TimeRoundingUpToValue.IN_MINUTES_30', '30 minutes'),
            localize('TimeRoundingUpToValue.IN_HOUR_1', '1 hour'),
            localize('TimeRoundingUpToValue.IN_HOUR_4', '4 hours'),     
        ],
        'description': localize('timetracker.project.roundedToNearest', 'Round to nearest selected minute/hour'),
        'scope': ConfigurationScope.RESOURCE,
    },
    'timetracker.project.roundedType': {
        'type': 'string',
        'enum': [
            TimeRoundedType.ROUND_UP_TO,
            TimeRoundedType.ROUND_TO_NEAREST,
            TimeRoundedType.ROUND_DOWN_TO,
        ],
        'default': TimeRoundedType.ROUND_TO_NEAREST,
        'enumDescriptions': [
            localize('timetracker.project.roundedType.ROUND_UP_TO', 'e.g. if you set the interval to 30min, a 26min entry will show up in report as 30min'),
            localize('timetracker.project.roundedType.ROUND_TO_NEAREST', 'e.g. if you set theinterval to 30min, a 14min entry will up as 0min and 26min entry as 30min'),
            localize('timetracker.project.roundedType.ROUND_DOWN_TO', 'e.g. if you set the interval to 30min, a 26min entry will show up in reports as 0min'),
        ],
        'description': localize('timetracker.project.roundedType', 'Select the time rounding type'),
        'scope': ConfigurationScope.RESOURCE,
    },
    'timetracker.project.visibility': {
        'type': 'boolean',
        'default': true,
        'description': localize('timetracker.project.visibility', 'When you create a project, set the visibility of the project to all other users'),
        'scope': ConfigurationScope.WINDOW,
    },
    'timetracker.report.timeRoundingInReports': {
        'type': 'boolean',
        'default': false,
        'description': localize('timetracker.report.timeRoundingInReports', 'Round time in reports up, down, or to nearest X minutes'),
        'scope': ConfigurationScope.WINDOW,
    },
    'timetracker.project.favorites': {
        'type': 'boolean',
        'default': true,
        'description': localize('timetracker.project.favorites', 'Let people mark their most used projects as favorite so they appear at the top of their project list when tracking time.'),
        'scope': ConfigurationScope.RESOURCE,
    },
    'timetracker.project.groupingLabel': {
        'type': 'string',
        'default': "client",
        'description': localize('timetracker.project.groupingLabel', 'Group Project by clients or departments, you can change the lable to somethign else'),
        'scope': ConfigurationScope.RESOURCE,
    },
    'timetracker.project.pickerSpecialFilter': {
        'type': 'boolean',
        'default': false,
        'description': localize('timetracker.project.pickerSpecialFilter', 'Quickly find the right task in project picker by using the task@project syntax.'),
        'scope': ConfigurationScope.WINDOW,
    },
    'timetracker.timerecord.screenshotsEnabled': {
        'type': 'boolean',
        'default': false,
        'description': localize('timetracker.timerecord.screenshotsEnabled', 'Generate screenshots every 5 minutes while the timer is running (desktop app only)'),
        'scope': ConfigurationScope.WINDOW,
    },
    'timetracker.project.taskBillableEnabled': {
        'type': 'boolean',
        'default': false,
        'description': localize('SubscribeToBillingNotifications', 'Subscribe to all billing changes'),
        'scope': ConfigurationScope.WINDOW,
    },
    'timetracker.project.taskRateEnabled': {
        'type': 'boolean',
        'default': false,
        'description': localize('timetracker.project.taskRateEnabled', 'Have a different rate depending on the task on a project, plus choose whether tasks are billable by default.'),
        'scope': ConfigurationScope.RESOURCE,
    },
    'timetracker.project.timeApprovalEnabled': {
        'type': 'boolean',
        'default': false,
        'description': localize('timetracker.project.timeApprovalEnabled', 'Your team can submit their weekly timehseets for review, which you can approve or reject'),
        'scope': ConfigurationScope.RESOURCE,
    },
    'timetracker.project.timeTrackingMode': {
        'type': 'string',
        'default': 'DEFAULT',
        'description': localize('SubscribeToBillingNotifications', 'Subscribe to all billing changes'),
        'scope': ConfigurationScope.RESOURCE,
    },
    'timetracker.project.trackTimeDownToSecond': {
        'type': 'boolean',
        'description': localize('SubscribeToBillingNotifications', 'Subscribe to all billing changes'),
        'default': true,
        'scope': ConfigurationScope.WINDOW,
    },
};

export const TimeTrackerContribution: IConfigurationNode = {
    'id': IConfigurationContributionNames.timeTracker,
    'type': 'object',
    'properties': TimeTrackerProperties as any,
}