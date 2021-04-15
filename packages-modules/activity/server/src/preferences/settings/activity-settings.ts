import { ConfigurationScope } from '@adminide-stack/core';
import { localize } from '@vscode/monaco-editor/esm/vs/nls';

export const ActivityProperties = {
    'timetracker.activity.autoStop': {
        type: 'number',
        default: 24,
        description: localize(
            'timetracker.activity.autoStop',
            'Tracking will stop once maximum tack length has been exceeded',
        ),
        scope: ConfigurationScope.WINDOW,
    },
    'activity.desktopMonitoring.waitingTime': {
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

};
