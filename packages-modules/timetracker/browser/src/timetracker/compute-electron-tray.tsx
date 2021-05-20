import Tray from './components/TrayTimerHandler';
import { ROUTES } from './constants/routes';
import { getFilteredRoutes } from '../utils';

const trayStore: any[] = [
  {
    exact: false,
    key: 'timeTracker.headerTray',
    component: Tray,
    tab: 'Time Tracker',
    name: 'Time Tracker',
    path: ROUTES.ROOT,
    priority: 1,
  },
];

const selectedRoutesAndMenus = [
  'timeTracker.headerTray',
];

// get routes
const filteredRoutes = getFilteredRoutes(trayStore, selectedRoutesAndMenus);

export { filteredRoutes };
