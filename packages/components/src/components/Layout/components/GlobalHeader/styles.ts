import { Property, Properties } from 'csstype';

export const styleSheet: { [key: string]: (obj) => Properties } = {
    globalHeaderStyle: ({ theme, primaryColor, layout }) => ({
        display: 'inherit',
        '& .ant-prefix-pro-global-header': {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            padding: '0 16px',
            background: '#fff',
            boxShadow: '0 1px 4px rgba(0,21,41,0.08)',
        },
        '& .ant-prefix-pro-global-header > *': {
            height: '100%',
        },
        '& .ant-prefix-pro-global-header-collapsed-button': {
            display: 'flex',
            alignItems: 'center',
            marginLeft: '16px',
            fontSize: '20px',
        },
        '& .ant-prefix-pro-global-header-layout-mix': {
            backgroundColor: '#001529',
        },
        '& .ant-prefix-pro-global-header-layout-mix .ant-prefix-pro-global-header-logo h1': {
            color: '#fff',
        },
        '& .ant-prefix-pro-global-header-layout-mix .anticon': {
            color: '#fff',
        },
        '& .ant-prefix-pro-global-header-logo': {
            position: 'relative',
            overflow: 'hidden',
        },
        '& .ant-prefix-pro-global-header-logo a': {
            display: 'flex',
            alignItems: 'center',
            height: '100%',
        },
        '& .ant-prefix-pro-global-header-logo a img': {
            height: '28px',
        },
        '& .ant-prefix-pro-global-header-logo a h1': {
            height: '32px',
            margin: '0 0 0 12px',
            color: '#1890ff',
            fontWeight: '600',
            fontSize: '18px',
            lineHeight: '32px',
        },
        '& .ant-prefix-pro-global-header-menu .anticon': {
            marginRight: '8px',
        },
        '& .ant-prefix-pro-global-header-menu .ant-dropdown-menu-item': {
            minWidth: '160px',
        },
        '& .ant-prefix-pro-global-header .dark': {
            height: '48px',
        },
        '& .ant-prefix-pro-global-header .dark .action': {
            color: 'rgba(255,255,255,0.85)',
        },
        '& .ant-prefix-pro-global-header .dark .action > i': {
            color: 'rgba(255,255,255,0.85)',
        },
        '& .ant-prefix-pro-global-header .dark .action:hover, .ant-prefix-pro-global-header .dark .action.opened': {
            background: '#1890ff',
        },
        '& .ant-prefix-pro-global-header .dark .action .ant-badge': {
            color: 'rgba(255,255,255,0.85)',
        },

    }),
};

