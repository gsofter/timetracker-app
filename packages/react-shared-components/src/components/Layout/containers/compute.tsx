import { IMenuPosition } from "@common-stack/client-react";
import { Feature, FeatureWithRouterFactory } from "@common-stack/client-react";

import { getFilteredMenus, getFilteredRoutes } from "../components/utils/menu";
import { Dashboard } from './Dashboard';
import { Home } from './HomePage';

export const commonPageStore: any[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "export",
    key: "dashboard",
    component: Dashboard,
    position: IMenuPosition.MIDDLE,
  },
  {
    path: "/welcome",
    name: "Welcome",
    icon: "smile",
    key: "welcome",
    position: IMenuPosition.MIDDLE,
    component: Home,
    children: [
      {
        path: "/welcome/one",
        name: "One",
        key: "one",
        component: Home,
      },
      {
        path: "/welcome/two",
        name: "Two",
        key: "two",
        component: Home,
      },
    ],
  },
  {
    path: "/home",
    name: "Home",
    icon: "export",
    key: "home",
    position: IMenuPosition.MIDDLE,
    component: Dashboard,
    children: [
        {
          path: "/home/one",
          name: "one",
          key: "one",
          component: Dashboard,
        },
      ],
  },
];

const selectedRoutesAndMenus = ["dashboard", "welcome", "home"];

// get menus
const filteredMenus = getFilteredMenus(commonPageStore, selectedRoutesAndMenus);

// get routes
const filteredRoutes = getFilteredRoutes(
  commonPageStore,
  selectedRoutesAndMenus
);

const sharedModule = new Feature({
  menuConfig: filteredMenus,
  routeConfig: filteredRoutes,
});

export { filteredMenus, filteredRoutes, sharedModule };
