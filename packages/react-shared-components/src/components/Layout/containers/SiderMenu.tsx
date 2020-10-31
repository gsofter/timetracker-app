import * as React from 'react';
import SiderMenuComponent from '../components/SubMenu3/index';
import { SiderMenuProps } from '../components/SubMenu3/SiderMenu';
import { useGetOrgNameFromContextQuery } from '../../generated';


const SiderMenu: React.SFC<SiderMenuProps> = (props) => {
    const { data, loading} = useGetOrgNameFromContextQuery();
    if(loading) {
        return (<div>Loading</div>)
    }

    const params = { ...data.getOrgNameFromContext}
    return (
        <SiderMenuComponent params={params} {...props}/>
    )    
}

export { SiderMenu }
