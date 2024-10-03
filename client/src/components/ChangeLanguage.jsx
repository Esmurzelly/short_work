import React from 'react'
import { useTranslation } from 'react-i18next';

export default function ChangeLanguage() {
    const { i18n } = useTranslation();

    const changeLanguage = language => {
        i18n.changeLanguage(language);
    };

    return (
        <div className='flex items-center gap-2'>
            <span onClick={() => changeLanguage("ru")} className="cursor-pointer w-5">RU</span>
            <span onClick={() => changeLanguage("en")} className="cursor-pointer w-5">EN</span>
            <span onClick={() => changeLanguage("de")} className="cursor-pointer w-5">DE</span>
        </div>
    )
}
