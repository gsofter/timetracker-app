import { Property, Properties } from 'csstype';

export const styleSheet: { [key: string]: (obj) => Properties } = {
    footerLayout: ({ theme, primaryColor, layout }) => ({
        display: 'inherit',
        '& .ant-prefix-pro-global-footer': {
            margin: '48px 0 24px 0',
            padding: '0 16px',
            textAlign: 'center',
        },
        '& .ant-prefix-pro-global-footer-links': {
            marginBottom: '8px',
        },
        '& .ant-prefix-pro-global-footer-links a': {
            color: 'rgba(0,0,0,0.45)',
            transition: 'all 0.3s',
        },
        '& .ant-prefix-pro-global-footer-links a:not(:last-child)': {
            marginRight: '40px',
        },
        '& .ant-prefix-pro-global-footer-links a:hover': {
            color: 'rgba(0,0,0,0.65)',
        },
        '& .ant-prefix-pro-global-footer-copyright': {
            color: 'rgba(0,0,0,0.45)',
            fontSize: '14px',
        },
    }),
};

