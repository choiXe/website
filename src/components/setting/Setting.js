import React from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

const Setting = () => {
  const { t } = useTranslation();
  const handleClick = lang => {
    i18next.changeLanguage(lang);
  };

  return (
    <div>
      <h1 className="setting">{t('Setting.title')}</h1>
      <button onClick={() => handleClick('en')}>English</button>
      <button onClick={() => handleClick('ko')}>Korean</button>
    </div>
  );
};

export default Setting;
