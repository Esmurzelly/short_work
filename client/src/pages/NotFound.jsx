import React from 'react'
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className='flex flex-col flex-1'>{t("Page_is_not_found")}</div>
  )
}
 