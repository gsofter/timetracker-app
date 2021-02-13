export const styleSheet = {
  siderLayoutStyles: () => {
    return {
      '& .ant-pro-sider-extra': {
        overflow: 'hidden auto',
      },
      '& .ant-pro-sider-extra::-webkit-scrollbar': {
        width: '4px',
        borderRadius: '2px'
      },
      '& .ant-pro-sider-extra::-webkit-scrollbar-track': {
        background: '#253747',
      },
      '& .ant-pro-sider-extra::-webkit-scrollbar-thumb': {
        background: '#888',
      },
      '& .ant-pro-sider-extra::-webkit-scrollbar-thumb:hover': {
        background: '#555'
      },
      '& .ant-pro-sider-menu': {
        minHeight: 'auto !important',
      },
    };
  },
};