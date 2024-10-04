import React from 'react'
import { useTranslation } from 'react-i18next';

export default function ChangeLanguage() {
    const { i18n } = useTranslation();

    const changeLanguage = language => {
        i18n.changeLanguage(language);
    };

    return (
        <div className='flex items-center gap-2'>
            <span onClick={() => changeLanguage("ru")} className="cursor-pointer text-center rounded-md text-red-600 w-7 text-xl">RU</span>
            <span onClick={() => changeLanguage("en")} className="cursor-pointer text-center rounded-md text-blue-600 w-7 text-xl">EN</span>
            <span onClick={() => changeLanguage("de")} className="cursor-pointer text-center rounded-md text-black w-7 text-xl">DE</span>
        </div>
    )
}
