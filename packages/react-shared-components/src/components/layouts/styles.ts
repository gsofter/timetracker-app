export const styleSheet = {
  siderLayoutStyles: () => {
    return {
      '& .ant-pro-sider .ant-layout-sider-children': {
        overflowY: 'overlay',
      },

      '& .ant-layout-sider-children div:nth-child(4)': {
        overflow: 'unset !important',
      },
    };
  },
};