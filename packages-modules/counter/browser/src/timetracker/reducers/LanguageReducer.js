import en_vocabulary from '../locales/en';
import ru_vocabulary from '../locales/ru';
import de_vocabulary from '../locales/de';
import uk_vocabulary from '../locales/uk';
import it_vocabulary from '../locales/it';

import * as types from '../actions/LanguageActions';

const initialState = {
    languages: [
        {
            short: 'ru',
            long: 'Русский',
        },
        {
            short: 'en',
            long: 'English',
        },
        {
            short: 'de',
            long: 'Deutsch',
        },
        {
            short: 'uk',
            long: 'Українська',
        },
        {
            short: 'it',
            long: 'Italiano',
        },
    ],
    vocabulary: en_vocabulary,
};

const setVocabulary = lang => {
    if (lang === 'en') return en_vocabulary;
    if (lang === 'ru') return ru_vocabulary;
    if (lang === 'de') return de_vocabulary;
    if (lang === 'uk') return uk_vocabulary;
    if (lang === 'it') return it_vocabulary;
    return en_vocabulary;
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.SET_LANGUAGE: {
            return {
                ...state,
                vocabulary: setVocabulary(payload),
            };
        }

        default: {
            state.languages.sort((a, b) => {
                if (a.long < b.long) {
                    return -1;
                }
                if (a.long > b.long) {
                    return 1;
                }
                return 0;
            });
            return state;
        }
    }
};
