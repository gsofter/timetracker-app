import { DropDownProps } from 'antd/es/dropdown';
import { Dropdown } from 'antd';
import React from 'react';
import classNames from 'classnames';

declare type OverlayFunc = () => React.ReactNode;

export interface HeaderDropdownProps extends Omit<DropDownProps, 'overlay'> {
  overlayClassName?: string;
  overlay: React.ReactNode | OverlayFunc | any;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ overlayClassName: cls, ...restProps }) => (
  <Dropdown overlayClassName={classNames('container', cls)} {...restProps} />
);

export default HeaderDropdown;

const styleSheet: any = {
  heaaderStyles: ({theme, layout}) => ({
    '& .container > *': {
      'background-color': '@popover-bg',
      'border-radius': '4px',
      'box-shadow': '@shadow-1-down'
    },
    '@media screen and (max-width: @screen-xs)': {
      '& .container': {
        'width': '100% !important'
      },
      '& .container > *': {
        'border-radius': '0 !important'
      }
    }
  })
};

