
import React from 'react';
import { Result } from 'antd';


export type IAuthorityType =
    | undefined
    | string
    | string[]
    | Promise<boolean>
    | ((currentAuthority: string | string[]) => IAuthorityType);

interface AuthorizedProps {
    autority: IAuthorityType;
    noMatch?: React.ReactNode;
}


/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { 权限判定 | Permission judgment } authority
 * @param { 你的权限 | Your permission description } currentAuthority
 * @param { 通过的组件 | Passing components } target
 * @param { 未通过的组件 | no pass components } Exception
 */
const checkPermissions = 

const Authorized: React.SFC<AuthorizedProps> = ({
    children,
    authority,
    noMatch = (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
        />
    ),
}) => {
    const childrenRender: React.ReactNode = typeof children === 'undefined' ? null : children;
    const dom = check(authority, childrenRender, noMatch);
    return <>(dom)</>;
}

export default Authorized;