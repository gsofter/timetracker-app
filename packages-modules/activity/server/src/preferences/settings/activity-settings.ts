import { ConfigurationScope, IConfigurationPropertySchema } from '@adminide-stack/core';
import { localize } from '@vscode-alt/monaco-editor/esm/vs/nls';

const enum ScreenshotFrequency {
    'None' = 'None',
    'OneShot' = '1x',
    'TwoShot' = '2x',
    'ThreeShot' = '3x',
}
const enum TrackApps {
    'Off' = 'Off',
    'Apps' = 'Apps',
    'AppsAndURLs' = 'Apps & URLs',
}
export const ActivityProperties: { [path: string]: IConfigurationPropertySchema } = {
    'activityTracker.desktopMonitoring.trackAppsAndURLs': {
        type: 'string',
        enum: [TrackApps.Off, TrackApps.Apps, TrackApps.AppsAndURLs],
        default: TrackApps.AppsAndURLs,
        description: localize(
            'activityTracker.desktopMonitoring.trackAppsAndURLs',
            'Control whether the names of apps used and the URLs visted are tracked.',
        ),
        scope: ConfigurationScope.WINDOW,
    },
    'activityTracker.desktopMonitoring.screenshotFrequency': {
        type: 'string',
        enum: [
            ScreenshotFrequency.None,
            ScreenshotFrequency.OneShot,
            ScreenshotFrequency.TwoShot,
            ScreenshotFrequency.ThreeShot,
        ],
        default: ScreenshotFrequency.TwoShot,
        enumDescriptions: [
            localize('activityTracker.desktopMonitoring.screenshotFrequency.none', 'Disable screenshot'),
            localize(
                'activityTracker.desktopMonitoring.screenshotFrequency.oneShot',
                'Takes one screenshot for every 10 minutes period.',
            ),
            localize(
                'activityTracker.desktopMonitoring.screenshotFrequency.twoShot',
                'Takes two screenshot for every 10 minutes period.',
            ),
            localize(
                'activityTracker.desktopMonitoring.screenshotFrequency.threeShot',
                'Takes three screenshot for every 10 minutes period.',
            ),
        ],
        description: localize(
            'activityTracker.desktopMonitoring.screenshotFrequency',
            'Control the number of screenshots taken in a 10 minute period.',
        ),
        scope: ConfigurationScope.WINDOW,
    },
    'activityTracker.desktopMonitoring.screenshotBlur': {
        type: 'boolean',
        default: false,
        description: localize(
            'activityTracker.desktopMonitoring.screenshotBlur',
            'Control whether the desktop app blurs screenshots for security and privacy.',
        ),
        scope: ConfigurationScope.WINDOW,
    },
    'activityTracker.desktopMonitoring.deleteScreenshots': {
        type: 'boolean',
        default: true,
        description: localize(
            'activityTracker.desktopMonitoring.deleteScreenshots',
            'Allow managers and owners to delete screenshots',
        ),
        scope: ConfigurationScope.WINDOW,
    },
    'activityTracker.desktopMonitoring.recordActivity': {
        type: 'boolean',
        default: true,
        description: localize(
            'activityTracker.desktopMonitoring.recordActivity',
            'Control whether keyboard and mouse activity is monitored',
        ),
        scope: ConfigurationScope.WINDOW,
    },
    'activityTracker.desktopMonitoring.autoStopTime': {
        type: 'number',
        default: 24,
        description: localize(
            'activityTracker.desktopMonitoring.autoStopTime',
            'Tracking will stop once maximum tack length has been exceeded',
        ),
        scope: ConfigurationScope.WINDOW,
    },
    'activityTracker.desktopMonitoring.waitingTime': {
        type: 'number',
        default: 120,
        description: localize(
            'activityTracker.desktopMonitoring.waitingTime',
            'Enable activity check on the time tracking to ask if you are still tracking after the choosen idle time (in seconds)',
        ),
        scope: ConfigurationScope.WINDOW,
    },
    'activityTracker.desktopMonitoring.idleSensitivity': {
        type: 'number',
        default: 120,
        description: localize(
            'activityTracker.desktopMonitoring.idleSensitivity',
            "IdleSensivity time that activity must remain below the idle detection threshold before idle buffer timer count user's activity actions, in seconds.",
        ),
        scope: ConfigurationScope.WINDOW,
    },
    'activityTracker.desktopMonitoring.maxTimeInADay': {
        type: 'number',
        default: 120,
        description: localize(
            'activityTracker.desktopMonitoring.maxTimeInADay',
            'Enable activity check on the time tracking upto choosen max time in a day(in seconds). It can change upto 1440',
        ),
        scope: ConfigurationScope.WINDOW,
    },
};
