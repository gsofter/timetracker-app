import { DropDownProps } from "antd/es/dropdown";
import { Dropdown } from "antd";
import React from "react";
import classNames from "classnames";
import { FelaComponent } from "react-fela";
import { relative } from "path";

declare type OverlayFunc = () => React.ReactNode;

export interface HeaderDropdownProps extends Omit<DropDownProps, "overlay"> {
  overlayClassName?: string;
  overlay: React.ReactNode | OverlayFunc | any;
  placement?:
    | "bottomLeft"
    | "bottomRight"
    | "topLeft"
    | "topCenter"
    | "topRight"
    | "bottomCenter";
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  overlayClassName: cls,
  ...restProps
}) => (
  <FelaComponent style={stylesheet}>
    <Dropdown overlayClassName={classNames("menuheight container cls")} {...restProps} />
  </FelaComponent>
);

export default HeaderDropdown;

const stylesheet = ({ styles }) => ({
  position: relative,
  '& .menuheight': {
    left: '1180px !important',
    top: '48px !important'
  },
  "& .container > *": {
    backgroundColor: "red",
    borderRadius: "4px",
    // box-shadow: ;
  },
  "@media screen and (max-width: )": {
    "& .container": {
      width: "100% !important",
    },
    "& .container > *": {
      borderRadius: "0 !important",
    },
  },
});
