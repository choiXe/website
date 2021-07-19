import React from 'react';
import { useTranslation } from 'react-i18next';

const Setting = () => {
  const { t } = useTranslation();
  return <h1 className="setting">{t('Setting.title')}</h1>;
};

export default Setting;
