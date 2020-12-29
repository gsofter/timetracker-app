import { omitUndefined } from '../../../../utils';
import { useEffect, useState } from 'react';
import { ProSettings } from '../defaultSettings';


const useCurrentMenuLayoutProps = (currentMenu: ProSettings) => {
    const [currentMenuLayoutProps, setCurrentMenuLayoutProps] = useState({});

    useEffect(() => {
        setCurrentMenuLayoutProps(
            omitUndefined({
                // Sometimes it becomes an object, the original way
                layout: typeof currentMenu.layout !== 'object' ? currentMenu.layout : undefined,
                navTheme: currentMenu.navTheme,
                menuRender: currentMenu.menuRender,
                fotterRender: currentMenu.footerRender,
                menuHeaderRender: currentMenu.menuHeaderRender,
                headerRender: currentMenu.headerRender,
                fixSiderBar: currentMenu.fixSiderbar,
                headerTheme: currentMenu.headerTheme,
            }),
        );
    }, [
        currentMenu.layout,
        currentMenu.navTheme,
        currentMenu.menuRender,
        currentMenu.footerRender,
        currentMenu.menuHeaderRender,
        currentMenu.headerRender,
        currentMenu.fixSiderbar,
        currentMenu.headerTheme,
    ]);
    return currentMenuLayoutProps;
}

export default useCurrentMenuLayoutProps;