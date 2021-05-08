import { IMenuPosition } from '@common-stack/client-react';
import TimerScreen from './components/TimerScreen'
import TimesheetCalendar from './components/Calendar';
import { getFilteredRoutes } from '../utils/menu';

export const timePageStore: any[] = [
    {
        exact: true,
        key: 'timeTracker.timer',
        name: 'Timer',
        component: TimerScreen,
        position: IMenuPosition.MIDDLE,
        // path: ROUTES.Timer,
        path: '/org/timer',
        priority: 2,
    },
    {
        exact: true,
        key: 'timeTracker.timesheet',
        name: 'Timesheet',
        component: TimesheetCalendar,
        position: IMenuPosition.MIDDLE,
        path: '/org/timesheet',
        priority: 3,
    },
];

const selectedRoutesAndMenus = [
    'timeTracker',
    'timeTracker.timer',
    'timeTracker.timesheet',
];

// get routes
const filteredRoutes = getFilteredRoutes(timePageStore, selectedRoutesAndMenus);

console.log('--FilteredRoutes', filteredRoutes);
export { filteredRoutes };