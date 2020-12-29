import React from 'react';
import BasicLayout, { RouteParams, BasicLayoutProps } from './BasicLayout';
import { useGetOrgNameFromContextQuery } from '../generated';

const ProLayout: React.SFC<BasicLayoutProps> = (props) => {
    const { data, loading} = useGetOrgNameFromContextQuery();
    if(loading) {
        return (<div>Loading</div>)
    }
    
    const params = { ...data.getOrgNameFromContext}
    return (
        <BasicLayout routeParams={params} {...props}/>
    )
}
export { ProLayout };
