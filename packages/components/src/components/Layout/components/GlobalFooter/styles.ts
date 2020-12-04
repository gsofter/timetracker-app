import { Property, Properties } from 'csstype';


export const styleSheet: (antPrefix?: string) => { [key: string]: (obj) => Properties } = (antPrefix = 'ant',) => {
    const proGlobalFooterPrefixCls = `${antPrefix}-pro-global-footer`

    return ({
        footerLayout: ({ theme, primaryColor, layout }) => ({
            margin: '48px 0 24px 0',
            padding: '0 16px',
            'text-align': 'center',
            [`& ${proGlobalFooterPrefixCls}-links`]: {
                'margin-bottom': '8px',
                a: {
                    color: '@text-color-secondary',
                    transition: 'all 0.3s',

                    ['&:not(:last-child)']: {
                        'margin-right': '40px;',
                    },

                    '&:hover': {
                        color: primaryColor
                    }
                },
            }
        }),
    })
};
