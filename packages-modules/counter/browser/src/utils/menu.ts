import * as _ from 'lodash';

export const sortMenuByPriority = (menu_route) => {
    return _.sortBy(menu_route, (obj) => parseInt(obj.priority, 10));
}

export const routeSorting = (routes) => {
    const routesDAta = sortMenuByPriority(routes);
    return routesDAta.map(route => {
        return {
            children: route.children && routeSorting(route.children),
            path: route.path,
            key: route.key,
            tab: route.tab,
            name: route.name,
            component: route.component,
            position: route.position,
            exact: route.exact,
            priority: route.priority,
            icon: route.icon
        }
    });
  }

export const getFilteredMenus = (accountPageStore, selectedMenu) => {
    const routeStore = routeSorting(accountPageStore);
    return routeStore.map(item => {
        if (selectedMenu.indexOf(item.key) !== -1) {
            const { path, component, ...rest } = item;
            return {
                [path]: { name: rest.tab, ...rest },
            };
        }
    }).filter(valid => valid);
}


export const getFilteredRoutes = (accountPageStore, selectedRoutes) => {
    const routeStore = routeSorting(accountPageStore);
    return routeStore.map(item => {
        if (selectedRoutes.indexOf(item.key) !== -1) {
            const { path } = item;
            return {
                [path]: item,
            };
        }
        return null;
    }).filter(valid => valid);
}

export const getFilteredTabs = (accountPageStore, selectedTabs) =>{
    const routeStore = routeSorting(accountPageStore);
    return routeStore.map(item => {
        if (selectedTabs.indexOf(item.key) !== -1) {
            const { component, ...rest } = item;
            return rest;
        }
    }).filter(valid => valid);
}
