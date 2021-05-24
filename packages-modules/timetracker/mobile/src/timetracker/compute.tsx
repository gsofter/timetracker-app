import { IMenuPosition } from '@common-stack/client-react';
import TimerScreen from './components/TimerScreen'
import TimesheetCalendar from './components/Calendar';
import TimesheetPage from '@admin-layout/timetracker-module-browser/src/timetracker/containers/TimesheetPage'
import AddManual from "./components/AddManual"
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
    {
        exact: true,
        key: 'add',
        name: 'CreateManual',
        component: AddManual,
        position: IMenuPosition.MIDDLE,
        // path: ROUTES.Timer,
        path: '/create',
        priority: 4,
    },
];

const selectedRoutesAndMenus = [
    'timeTracker',
    'timeTracker.timer',
    'timeTracker.timesheet',
    'add'
];

// get routes
const filteredRoutes = getFilteredRoutes(timePageStore, selectedRoutesAndMenus);

console.log('--FilteredRoutes', filteredRoutes);
export { filteredRoutes };