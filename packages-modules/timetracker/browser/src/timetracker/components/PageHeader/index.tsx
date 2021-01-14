import React from 'react';
import { useFela } from 'react-fela';
import { styleSheet } from './style';

export interface IPageHeader {
  title?: any;
  disabledTitle?: any;
}

const PageHeader: React.FC<IPageHeader> = ({ title, children, disabledTitle }) => {
  const { css } = useFela();
  return (
    <div className={css(styleSheet.pageHeaderStyle as any )}>
      <div className="header-wrapper">
        {!disabledTitle && <h1 className="header-wrapper__title">{title}</h1>}
        <div className="header-wrapper__child">{children}</div>
      </div>
    </div>
  );
};

export default PageHeader;
