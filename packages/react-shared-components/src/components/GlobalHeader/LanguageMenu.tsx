import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Menu, Dropdown, Button } from 'antd';
import { LOCALES } from '../../locales';
import { CHANGE_LANGUAGE } from '../../constants/constants';

export const LanguageMenu = () => {
    const [language, setLanguage] = React.useState('ENG');
    const [locale, setLocale] = React.useState(LOCALES.EN_US);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch({
            type: CHANGE_LANGUAGE,
            payload: locale,
        });
    }, [locale]);

    const handleLanguage = (e: any) => {
        const lang = e.currentTarget && e.currentTarget.innerText;
        if (
            lang === 'ENG' ||
            lang === 'ZHCN' ||
            lang === 'ZHTW' ||
            lang === 'PTBR' ||
            lang === 'IDID'
        ) {
            setLanguage(lang);
            lang === 'ENG' && setLocale(LOCALES.EN_US);
            setLocale(LOCALES.EN_US);
            lang === 'ZHCN' && setLocale(LOCALES.ZH_CN);
            lang === 'ZHTW' && setLocale(LOCALES.ZH_TW);
            lang === 'PTBR' && setLocale(LOCALES.PT_BR);
            lang === 'IDID' && setLocale(LOCALES.ID_ID);
        }
    };

    const menu = (
        <Menu>
            <Menu.Item>
                <a rel="noopener noreferrer" onClick={e => handleLanguage(e)}>
                    ENG
                </a>
            </Menu.Item>
            <Menu.Item>
                <a rel="noopener noreferrer" onClick={e => handleLanguage(e)}>
                    ZHCN
                </a>
            </Menu.Item>
            <Menu.Item>
                <a rel="noopener noreferrer" onClick={e => handleLanguage(e)}>
                    ZHTW
                </a>
            </Menu.Item>
            <Menu.Item>
                <a rel="noopener noreferrer" onClick={e => handleLanguage(e)}>
                    PTBR
                </a>
            </Menu.Item>
            <Menu.Item>
                <a rel="noopener noreferrer" onClick={e => handleLanguage(e)}>
                    IDID
                </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} placement="bottomRight">
            <Button className="lang-btn">{language}</Button>
        </Dropdown>
    );
}
