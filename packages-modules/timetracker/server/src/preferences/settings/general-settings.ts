import { ConfigurationScope, IConfigurationPropertySchema } from '@adminide-stack/core';
import { localize } from '@vscode-alt/monaco-editor/esm/vs/nls';
// const localize = (id, defaultMessage) => defineMessages({
//     id,
//     defaultMessage,

// });
const enum TimeFormat {
    ROUNDED_0_00_12 = 'h.mm A',
    ROUNDED_0_00_24 = 'H.mm',
    PRECISE_00_00_00_12 = 'hh:mm:ss A',
    PRECISE_00_00_00_24 = 'HH:mm:ss',
    ROUNDED_UP_00_00_12 = 'hh:mm A',
    ROUNDED_UP_00_00_24 = 'HH:mm',
}

const enum GroupProjectsBy {
    CLIENT = 'Client',
    CATEGORY = 'Category',
    CUSTOM = 'Custom',
}
const enum DateFormat {
    USFORMAT = 'MM-DD-YYYY',
    UKFORMAT = 'DD-MM-YYYY',
    ISOFORMAT = 'YYYY-MM-DD',
}

export const enum WeekDay {
    SUN = 'Sunday',
    MON = 'Monday',
    TUE = 'Tuesday',
    WED = 'Wednesday',
    THU = 'Thursday',
    FRI = 'Friday',
    SAT = 'Saturday',
}

const enum FristWeekOfTheYear {
    FIRST_DAY = 'Week containing first day of the year',
    FIRST_FULL_7DAY = 'First full seven-day week in January',
    FIRST_4_DAY = 'First four-day week in January',
}

const enum TimeRoundingUpToValue {
    IN_MINUTES_15 = 15 * 60,
    IN_MINUTES_1 = 1 * 60,
    IN_MINUTES_5 = 5 * 60,
    IN_MINUTES_6 = 6 * 60,
    IN_MINUTES_10 = 10 * 60,
    IN_MINUTES_12 = 12 * 60,
    IN_MINUTES_30 = 30 * 60,
    IN_HOUR_1 = 1 * 60 * 60,
    IN_HOUR_4 = 4 * 60 * 60,
}

const enum TimeRoundedType {
    ROUND_UP_TO = 'Round up to',
    ROUND_TO_NEAREST = 'Round to nearest',
    ROUND_DOWN_TO = 'Roudn down to',
}
export const TimeTrackerProperties: { [path: string]: IConfigurationPropertySchema } = {
    // notifications
    'timetracker.notifications.enableTimetrackerNotifications': {
        type: 'boolean',
        default: true,
        description: localize(
            'timetracker.notifications.timeTrackingNotification',
            'Allow timetracker emails to be send',
        ),
        scope: ConfigurationScope.WINDOW,
    },

    'timetracker.notifications.timeTrackingNotifications': {
        type: 'boolean',
        default: true,
        description: localize(
            'timetracker.notifications.timeTrackingNotification',
            'An email will be send when tracking is stopped by the system due to lack of user response',
        ),
        scope: ConfigurationScope.WINDOW,
    },
    'timetracker.notifications.approvalNotifications': {
        type: 'boolean',
        default: true,
        description: localize(
            'timetracker.notifications.approvalNotifications',
            'An email will be sent to me when my timesheet is approved',
        ),
        scope: ConfigurationScope.WINDOW,
    },
    'timetracker.notifications.submitNotifications': {
        type: 'boolean',
        default: true,
        description: localize(
            'timetracker.notifications.submitNotifications',
            'An email will be sent to me when team member submits time (Approval Managers only)',
        ),
        scope: ConfigurationScope.WINDOW,
    },

    // Time Tracking
    'timetracker.activity.autoStop': {
        type: 'number',
        default: 24,
        description: localize(
            'timetracker.activity.autoStop',
            'Tracking will stop once maximum tack length has been exceeded',
        ),
        scope: ConfigurationScope.WINDOW,
    },
    'timetracker.activity.waitingTime': {
        type: 'number',
        default: 120,
        description: localize(
            'timetracker.activity.waitingTime',
            'Enable activity check on the time tracking to ask if you are still tracking after the choosen idle time (in seconds)',
        ),
        scope: ConfigurationScope.WINDOW,
    },
    'timetracker.activity.maxTimeInADay': {
        type: 'number',
        default: 120,
        description: localize(
            'timetracker.activity.maxTimeInADay',
            'Enable activity check on the time tracking upto choosen max time in a day(in seconds). It can change upto 1440',
        ),
        scope: ConfigurationScope.WINDOW,
    },
    'timetracker.timerecord.automaticLock': {
        type: 'string',
        default: null,
        description: localize(
            'accountNotificationPrimaryEmail',
            'Prevent regular users from editing their past time or adding new entries to past dates',
        ),
        scope: ConfigurationScope.RESOURCE,
    },
    'timetracker.project.billable': {
        type: 'boolean',
        default: true,
        description: localize(
            'timetracker.project.billable',
            'When you create a project, make it billable so its time entries are set as billable by default.',
        ),
        scope: ConfigurationScope.WINDOW,
    },
    'timetracker.project.daysAllowedToWork': {
        type: ['string'],
        default: [WeekDay.MON, WeekDay.TUE, WeekDay.WED, WeekDay.THU, WeekDay.FRI],
        enum: [WeekDay.MON, WeekDay.TUE, WeekDay.WED, WeekDay.THU, WeekDay.FRI, WeekDay.SAT, WeekDay.SUN],
        description: localize('timetracker.project.recurringDailyLimit', 'Select working day'),
        scope: ConfigurationScope.RESOURCE,
    },
    'timetracker.project.firstDayOfTheWeek': {
        type: 'string',
        enum: [WeekDay.MON, WeekDay.TUE, WeekDay.WED, WeekDay.THU, WeekDay.FRI, WeekDay.SAT, WeekDay.SUN],
        default: WeekDay.MON,
        description: localize('timetracker.project.firstDayOfTheWeek', 'First day of the week'),
        scope: ConfigurationScope.RESOURCE,
    },
    'timetracker.project.firstWeekOfTheyear': {
        type: 'string',
        enum: [FristWeekOfTheYear.FIRST_4_DAY, FristWeekOfTheYear.FIRST_FULL_7DAY, FristWeekOfTheYear.FIRST_DAY],
        default: FristWeekOfTheYear.FIRST_4_DAY,
        enumDescriptions: [
            localize(
                'timetracker.project.firstWeekOfTheyear.FIRST_4_DAY',
                'The week regarded to be the first week of the year is that which contains at least 4 days of the new year.',
            ),
            localize(
                'timetracker.project.firstWeekOfTheyear.FIRST_FULL_7DAY',
                'The week regarded as the first week of the year is that which contains 7 full days in the new year.',
            ),
            localize(
                'timetracker.project.firstWeekOfTheyear.FIRST_DAY',
                'The week regarded as the first week of the years is that which contains at least one-day of the new year.',
            ),
        ],
        description: localize(
            'timetracker.project.firstWeekOfTheyear',
            'You can set how you start or view the first calendar week of the year. This will be visible on Timetracker pages like "Reports" or "Calender View".',
        ),
        scope: ConfigurationScope.RESOURCE,
    },
    'timetracker.project.timeFormat': {
        type: 'string',
        enum: [
            TimeFormat.ROUNDED_0_00_12,
            TimeFormat.ROUNDED_0_00_24,
            TimeFormat.PRECISE_00_00_00_12,
            TimeFormat.PRECISE_00_00_00_24,
            TimeFormat.ROUNDED_UP_00_00_12,
            TimeFormat.ROUNDED_UP_00_00_24,
        ],
        default: TimeFormat.PRECISE_00_00_00_12,
        enumDescriptions: [
            localize('timetracker.project.timeFormat.ROUNDED_0_00_12', '"0.00 AM/PM" (12 hours rounded)'),
            localize('timetracker.project.timeFormat.ROUNDED_0_00_24', '"0.00" (24 hours rounded)'),
            localize(
                'timetracker.project.timeFormat.PRECISE_00_00_00_12',
                '"00:00:00 AM/PM" (precise 12 hours format)',
            ),
            localize('timetracker.project.timeFormat.PRECISE_00_00_00_24', '"13:00:00" (precise 24 hours format)'),
            localize('timetracker.project.timeFormat.ROUNDED_UP_00_00_12', '"00:00 AM/PM" (rounded up)'),
            localize('timetracker.project.timeFormat.ROUNDED_UP_00_00_24', '"13:00" (rounded up)'),
        ],
        description: localize(
            'timetracker.project.timeFormat',
            'Select the format in which you want your entry represented',
        ),
        scope: ConfigurationScope.RESOURCE,
    },
    'timetracker.project.dateFormat': {
        type: 'string',
        enum: [DateFormat.USFORMAT, DateFormat.UKFORMAT, DateFormat.ISOFORMAT],
        default: DateFormat.USFORMAT,
        enumDescriptions: [
            localize('timetracker.project.dateFormat.USFORMAT', '"MM-DD-YYYY" (US standard)'),
            localize('timetracker.project.dateFormat.UKFORMAT', '"DD-MM-YYYY" (UK standard)'),
            localize('timetracker.project.dateFormat.ISOFORMAT', '"YYYY-MM-DD" (ISO FORMAT)'),
        ],
        description: localize(
            'timetracker.project.dateFormat',
            'Select the format in which you want your entry represented',
        ),
        scope: ConfigurationScope.RESOURCE,
    },
    'timetracker.project.roundedToNearest': {
        type: 'string',
        enum: [
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
        default: TimeRoundingUpToValue.IN_MINUTES_15,
        enumDescriptions: [
            localize('TimeRoundingUpToValue.IN_MINUTES_1', '1 minute'),
            localize('TimeRoundingUpToValue.IN_MINUTES_5', '5 minutes'),
            localize('TimeRoundingUpToValue.IN_MINUTES_6', '6 minutes'),
            localize('TimeRoundingUpToValue.IN_MINUTES_10', '10 minutes'),
            localize('TimeRoundingUpToValue.IN_MINUTES_12', '12 minutes'),
            localize('TimeRoundingUpToValue.IN_MINUTES_15', '15 minutes'),
            localize('TimeRoundingUpToValue.IN_MINUTES_30', '30 minutes'),
            localize('TimeRoundingUpToValue.IN_HOUR_1', '1 hour'),
            localize('TimeRoundingUpToValue.IN_HOUR_4', '4 hours'),
        ],
        description: localize('timetracker.project.roundedToNearest', 'Round to nearest selected minute/hour'),
        scope: ConfigurationScope.RESOURCE,
    },
    'timetracker.project.roundedType': {
        type: 'string',
        enum: [TimeRoundedType.ROUND_UP_TO, TimeRoundedType.ROUND_TO_NEAREST, TimeRoundedType.ROUND_DOWN_TO],
        default: TimeRoundedType.ROUND_TO_NEAREST,
        enumDescriptions: [
            localize(
                'timetracker.project.roundedType.ROUND_UP_TO',
                'e.g. if you set the interval to 30min, a 26min entry will show up in report as 30min',
            ),
            localize(
                'timetracker.project.roundedType.ROUND_TO_NEAREST',
                'e.g. if you set theinterval to 30min, a 14min entry will up as 0min and 26min entry as 30min',
            ),
            localize(
                'timetracker.project.roundedType.ROUND_DOWN_TO',
                'e.g. if you set the interval to 30min, a 26min entry will show up in reports as 0min',
            ),
        ],
        description: localize('timetracker.project.roundedType', 'Select the time rounding type'),
        scope: ConfigurationScope.RESOURCE,
    },
    'timetracker.report.timeRoundingInReports': {
        type: 'boolean',
        default: false,
        description: localize(
            'timetracker.report.timeRoundingInReports',
            'Round time in reports up, down, or to nearest X minutes',
        ),
        scope: ConfigurationScope.WINDOW,
    },
    // 'timetracker.project.favorites': {
    //   type: 'boolean',
    //   default: true,
    //   description: localize(
    //     'timetracker.project.favorites',
    //     'Let people mark their most used projects as favorite so they appear at the top of their project list when tracking time.',
    //   ),
    //   scope: ConfigurationScope.RESOURCE,
    // },
    'timetracker.project.groupingLabel': {
        type: 'string',
        default: GroupProjectsBy.CLIENT,
        enum: [GroupProjectsBy.CLIENT, GroupProjectsBy.CATEGORY, GroupProjectsBy.CUSTOM],
        description: localize(
            'timetracker.project.groupingLabel',
            'Group Project by clients or departments, you can change the lable to somethign else',
        ),
        scope: ConfigurationScope.RESOURCE,
    },
    'timetracker.project.pickerSpecialFilter': {
        type: 'boolean',
        default: false,
        description: localize(
            'timetracker.project.pickerSpecialFilter',
            'Quickly find the right task in project picker by using the task@project syntax.',
        ),
        scope: ConfigurationScope.WINDOW,
    },
    'timetracker.timerecord.screenshotsEnabled': {
        type: 'boolean',
        default: false,
        description: localize(
            'timetracker.timerecord.screenshotsEnabled',
            'Generate screenshots every 5 minutes while the timer is running (desktop app only)',
        ),
        scope: ConfigurationScope.WINDOW,
    },
    'timetracker.project.taskBillableEnabled': {
        type: 'boolean',
        default: false,
        description: localize('SubscribeToBillingNotifications', 'Subscribe to all billing changes'),
        scope: ConfigurationScope.WINDOW,
    },
    'timetracker.project.taskRateEnabled': {
        type: 'boolean',
        default: false,
        description: localize(
            'timetracker.project.taskRateEnabled',
            'Have a different rate depending on the task on a project, plus choose whether tasks are billable by default.',
        ),
        scope: ConfigurationScope.RESOURCE,
    },
    'timetracker.project.timeApprovalEnabled': {
        type: 'boolean',
        default: false,
        description: localize(
            'timetracker.project.timeApprovalEnabled',
            'Your team can submit their weekly timehseets for review, which you can approve or reject',
        ),
        scope: ConfigurationScope.RESOURCE,
    },
    'timetracker.project.timeTrackingMode': {
        type: 'string',
        default: 'DEFAULT',
        description: localize('SubscribeToBillingNotifications', 'Subscribe to all billing changes'),
        scope: ConfigurationScope.RESOURCE,
    },
    'timetracker.project.trackTimeDownToSecond': {
        type: 'boolean',
        description: localize('SubscribeToBillingNotifications', 'Subscribe to all billing changes'),
        default: true,
        scope: ConfigurationScope.WINDOW,
    },
};
