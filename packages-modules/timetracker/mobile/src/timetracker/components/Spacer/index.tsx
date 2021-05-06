import React from 'react';
import { useFela } from 'react-fela';
import CSS from 'csstype';

// outer wrapper should be flex layout
const Spacer = () => {
  const { css } = useFela();
  return <div className={css(styles.spacer)}> </div>;
};

const styles: { [key: string]: (props) => CSS.Properties } = {
  spacer: props => ({
    flexGrow: 1,
  }),
};

export default Spacer;
