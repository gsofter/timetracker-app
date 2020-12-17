import * as React from 'react';
import cx from 'classnames';
import { useFela } from 'react-fela';
import { getWorkbenchColors } from './colors';

export interface IProps {}

export const Workbench: React.SFC<IProps> = ({ children }) => {
  const { css, theme } = useFela();

  return (
    <div className={css(stylesSheet.container)}>
      <div className={cx('monaco-workbench', css(stylesSheet.child))}>{children}</div>
    </div>
  );
};

const stylesSheet: any = {
  container: () => ({
    // display: 'flex',
    //commented this line due to this height affect
    // on the whole layout scroll screen.
    // height: '100%',
    position: 'relative',
  }),
  child: ({ theme }) => ({
    width: '100%',
    height: '100%',
    // display: 'flex',
    fontSize: '13px',
    lineHeight: 1.4,
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden',
    ...getWorkbenchColors(theme),
  }),
};
