import React from 'react';
import * as renderer from 'react-test-renderer';
import { createRenderer } from 'fela';
import { Provider, createComponent } from 'react-fela';

import { styleSheet } from './styles';
import 'jest';

const styles = styleSheet();
const Box = createComponent(styles.footerLayout);

describe('Box', () => {
    it('should render component', () => {
      const felaRenderer = createRenderer();
      console.log('----test---', felaRenderer)
      const component = renderer.create(
        <Provider renderer={felaRenderer}>
          <Box>hello</Box>
        </Provider>
      )
  
      expect(component.toJSON()).toMatchSnapshot()
    })
  })
