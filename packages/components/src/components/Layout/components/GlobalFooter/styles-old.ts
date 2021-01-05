import { Property, Properties } from 'csstype';

export const styleSheet: { [key: string]: (obj) => Properties } = {
    footerLayout: ({ theme, primaryColor, layout }) => ({
        display: 'inherit',
        '& .ant-pro-global-footer': {
            margin: '48px 0 24px 0',
            padding: '0 16px',
            textAlign: 'center',
        },
        '& .ant-pro-global-footer-links': {
            marginBottom: '8px',
        },
        '& .ant-pro-global-footer-links a': {
            color: 'rgba(0,0,0,0.45)',
            transition: 'all 0.3s',
        },
        '& .ant-pro-global-footer-links a:not(:last-child)': {
            marginRight: '40px',
        },
        '& .ant-pro-global-footer-links a:hover': {
            color: 'rgba(0,0,0,0.65)',
        },
        '& .ant-pro-global-footer-copyright': {
            color: 'rgba(0,0,0,0.45)',
            fontSize: '14px',
        },
    }),
};

