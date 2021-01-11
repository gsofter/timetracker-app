import { DefaultFooter, MenuDataItem, getMenuData, getPageTitle } from '@admin-layout/components';
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';



const UserLayout: React.FC<> = (props) => {
    const {
        route = {
            routes: [],
        }
    }  = props;
    const { routes = [] } = route;
    const {
        children,
        location = {
            pathname: '',
        }
    } = props;
    const { breadcrumb } = getMenuData(routes);
    const title = getPageTitle({
        pathname: location.pathname,
        formatMessage,
        breadcrumb,
        ...props,
    });
    return (
        <HelmetProvider>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={title} />
            </Helmet>
        </HelmetProvider>
    )
}