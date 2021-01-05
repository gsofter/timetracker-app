import 'raf/polyfill'
import * as React from 'react';
import { createSnapshot } from 'jest-react-fela';
import { createComponent } from 'react-fela';
import { THEMES } from '../../../Themes/constants/index';

import { styleSheet } from './styles';
import 'jest';


const rule = (props) => styleSheet.settingDrawer({
  theme: THEMES[0].defaultSettings
});
describe('Test styles', () => {

  it('should return a Component', () => {


    const Component = createComponent(rule)

    expect(createSnapshot(<Component className='ant-pro' />)).toMatchSnapshot()
  })

})


