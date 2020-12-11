import { Property, Properties } from 'csstype';

export const styleSheet: { [key: string]: (obj) => Properties } = {
    footerToolbarStyle: ({ theme, primaryColor, layout }) => ({
        display: 'inherit',
        '.ant-prefix-pro-footer-bar': {
            position: 'fixed',
            right: 0,
            bottom: 0,
            zIndex: 99,
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            padding: '0 24px',
            lineHeight: '44px',
            background: '#fff',
            borderTop: '1px solid hsv(0,0,94%)',
            boxShadow: '0 -6px 16px -8px rgba(0,0,0,0.08), 0 -9px 28px 0 rgba(0,0,0,0.05)',
        },
        '.ant-prefix-pro-footer-bar-left': {
            flex: 1,
        },
        '.ant-prefix-pro-footer-bar-right > *': {
            marginRight: '8px',
        },
        '.ant-prefix-pro-footer-bar-right > *:last-child': {
            margin: 0,
        },
    }),
};

