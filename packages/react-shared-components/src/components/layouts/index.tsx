import React from 'react';
import {  useSelector } from 'react-redux';
import BasicLayout, { RouteParams, BasicLayoutProps } from './BasicLayout';
import { useGetOrgNameFromContextQuery } from '../generated';
import { DefaultSettings } from '../../interfaces';
import { I18nPropvider } from '../../locales';
import { styleSheet } from './styles';
import { useFela } from 'react-fela';
import classNames from 'classnames';

const ProLayout: React.SFC<BasicLayoutProps> = (props) => {
  const language = useSelector<{ settings: DefaultSettings }, string>(state => state.settings.language);
    const { data, loading} = useGetOrgNameFromContextQuery();
    if(loading) {
        return (<div>Loading</div>)
    }
    const params = { ...data.getOrgNameFromContext}

    const { css } = useFela(props);
    const felaStyles = css(styleSheet.siderLayoutStyles as any);

    return (
      <I18nPropvider locale={language} >
        <span className={classNames(felaStyles)}>
          <BasicLayout routeParams={params} {...props}/>
        </span>
      </I18nPropvider>

    )
}
export { ProLayout };
