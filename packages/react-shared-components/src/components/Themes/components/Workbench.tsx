import * as React from 'react';
import cx from 'classnames';
import { useFela } from 'react-fela';
import { getWorkbenchColors } from './colors';

export interface IProps {
}

export const Workbench: React.SFC<IProps> = ({ children}) =>  {
    const { css, theme } = useFela();

    return (
      <div className={cx(css(stylesSheet.container), (theme && theme.className))}>
        <div className={cx('monaco-workbench', css(stylesSheet.child))}>{children}</div>
      </div>
    );
};


const stylesSheet: any = {
  container: () => ({
    display: 'flex',
    height: '100%',
    position: 'relative'
  }),
  child: ({ theme }) => ({
    height: '100%',
    display: 'flex',
    fontSize: '13px',
    lineHeight: 1.4,
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden',
    ...getWorkbenchColors(theme),
  }),
};

