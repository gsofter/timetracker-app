import { MenuDataItem } from "../typings";



// @sri custom type
export type SeparateMenusTypes = {
    upperMenus?: MenuDataItem[];
    middleMenus?: MenuDataItem[];
    lowerMenus?: MenuDataItem[];
    bottomMenus?: MenuDataItem[];
};

//@sri custom function
export const getMenuSeparation: (menus: MenuDataItem[]) => SeparateMenusTypes = (menus) => {
    const upperMenus = menus.filter(menu => menu.position === 'UPPER');
    const middleMenus = menus.filter(
        menu =>
            menu.position === 'MIDDLE' ||
            (menu.position !== 'UPPER' && menu.position !== 'LOWER' && menu.position !== 'BOTTOM'),
    );
    const lowerMenus = menus.filter(menu => menu.position === 'LOWER');
    const bottomMenus = menus.filter(menu => menu.position === 'BOTTOM');
    return {
        upperMenus,
        middleMenus,
        lowerMenus,
        bottomMenus,
    };
};

