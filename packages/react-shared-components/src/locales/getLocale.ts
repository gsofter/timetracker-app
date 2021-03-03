import * as en from  './en-US';
import * as id from  './id-ID';
import * as pt from  './pt-BR';
import * as zhcn from  './zh-CN';
import * as zhtw from  './zh-TW';
import { LOCALES } from './constants';



export default {
    [LOCALES.EN_US]: {
        ...en,
    },
    [LOCALES.ID_ID]: {
        ...id,
    },
    [LOCALES.PT_BR]: {
        ...pt,
    },
    [LOCALES.ZH_CN]: {
        ...zhcn,
    },
    [LOCALES.ZH_TW]: {
        ...zhtw,
    },
  };