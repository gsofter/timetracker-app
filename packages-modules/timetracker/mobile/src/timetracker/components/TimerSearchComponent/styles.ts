export const styleSheet = {
    timerSearchComponentStyle: () => ({
        position: 'relative',
        '& .timer-search': {
            display: 'flex',
            alignItems: 'center',
        },
        '& .timer-search__search-input': {
            width: '300px',
            marginRight: '3rem',
        },
        '& .timer-search__date-select': {
            position: 'relative',
            padding: '6px 0',
            display: 'flex',
            alignItems: 'center',
        },
    }),
};
