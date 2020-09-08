import * as React from 'react';
import { usetoggleSidebarMutation as useToggleSidebarMutation, usesidebarStateQuery as useSidebarStateQuery } from '../../generated';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
export const SidebarTumbler = (props) => {
    const { data = {} } = useSidebarStateQuery();
    const [ mutate ] = useToggleSidebarMutation();

    const toggle = () => mutate({ variables: { state: !data.sidebarState } });

    return (
        <h1>Here is</h1>
        // <span onClick={toggle}>
        //     {data.sidebarState
        //         ? <MenuUnfoldOutlined type="menu-unfold" />
        //         : <MenuFoldOutlined type="menu-fold" />}
        // </span>
    );
};
