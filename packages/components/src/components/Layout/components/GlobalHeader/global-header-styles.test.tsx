import 'raf/polyfill'
import * as React from 'react';
import { createSnapshot } from 'jest-react-fela';
import { createComponent } from 'react-fela';
import { THEMES } from '../../../Themes/redux/constants/index'

import { styleSheet } from './styles-new';
import 'jest';


const rule = (props) => styleSheet.globalHeaderStyle({ 
  theme: THEMES[0], 
  prefixCls: 'ant-pro' }) as any;
describe('Test styles', () => {

  it('should return a Component', () => {


    const Component = createComponent(rule)

    expect(createSnapshot(<Component className='ant-pro' />)).toMatchSnapshot()
  })

})


