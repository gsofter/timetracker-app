import React from 'react';
import {  useSelector } from 'react-redux';
import BasicLayout, { RouteParams, BasicLayoutProps } from './BasicLayout';
import { useGetOrgNameFromContextQuery } from '../generated';
import { DefaultSettings } from '../../interfaces';
import { I18nPropvider } from '../../locales';

const ProLayout: React.SFC<BasicLayoutProps> = (props) => {
  const language = useSelector<{ settings: DefaultSettings }, string>(state => state.settings.language);
    const { data, loading} = useGetOrgNameFromContextQuery();
    if(loading) {
        return (<div>Loading</div>)
    }
    const params = { ...data.getOrgNameFromContext}

    return (
      <I18nPropvider locale={language} >
        <BasicLayout routeParams={params} {...props}/>
      </I18nPropvider>

    )
}
export { ProLayout };
