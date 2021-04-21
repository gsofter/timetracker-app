export const styleSheet = {
    mainpageStyle: () => ({
        position: 'relative',
        width: '100%',
        '& .main-page': {
            background: '#fff',
            display: 'flex',
            flexDirection: 'column',
            '@media(max-width: 758px)': {
                padding: '0px',
                marginLeft: '-20px',
                marginRight: '-20px',
            },
            fontSize: '1.2rem',
            lineHeight: '1.6rem',
            overflow: 'hidden',
            height: '140vh',
        },
        '& .main-page__list': {
            flexGrow: '1',
            height: '100%',
        },
        '& .main-page__results-title': {
            fontWeight: '600',
            fontSize: '1.8rem',
            lineHeight: '2.5rem',
            color: '#E0E0E0',
            marginBottom: '1.2rem',
            zIndex: '10',
        },
        '& .main-page__day': {
            padding: '1rem',
            paddingLeft: '0px',
            paddingRight: '0px',
            background: '#f0f2f5;',
        },
        '& .main-page__day-header': {
            color: 'rgba(0, 0, 0, 0.85)',
            fontWeight: '600',
            fontSize: '20px',
            lineHeight: '32px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 0.5rem 0 0.5rem',
            margin: '0 0 1rem 0',
        },
        '& .main-page__day-date': {
            fontWeight: '700',
        },
        '& .main-page__lazy-load-spinner': {
            minHeight: '5rem',
            minWidth: '100%',
        },
        '& .mainPage--mobile': {
            padding: '0 1rem 0 1rem',
        },
        '& .main-page--mobile .main-page__day': {
            padding: '1rem 0 1rem 0',
        },
        '& .main-page--mobile .main-page__day--last-child': {
            margin: '0 0 0 0',
        },
        '& .main-page--mobile .main-page__empty-block': {
            minWidth: '100%',
            minHeight: '1rem',
        },
        '& button': {
            cursor: 'pointer',
            border: 'none',
            outline: 'none',
        },
        '& input': {
            outline: 'none',
        },

        '& .task-container': {
            // marginLeft: '-30px',
            // marginRight: '-30px',
        },
    }),
};
