import React from 'react';
import { useTranslation } from 'react-i18next';
import './navigation/NavMenu.scss';

const Footer = () => {
  const { t } = useTranslation();
  var line1 = t('Footer.line1');
  var line2 = t('Footer.line2');
  var line3 = t('Footer.line3');
  var line4 = '© 2021 choiXe, Inc. All Rights Reserverd';

  return (
    <div style={{ marginTop: '2%' }}>
      <div
        style={{
          textAlign: 'center',
          paddingTop: '30px',
          paddingBottom: '60px',
          marginTop: '4rem',
          fontSize: '13px',
          color: '#888'
        }}
      >
        <div>
          {line1}
          <a
            href="mailto:help@choixe.app"
            style={{ color: '#292E49', textDecoration: 'none' }}
          >
            help@choixe.app
          </a>
        </div>
        <div style={{ paddingTop: '20px' }}>{line2}</div>
        <div style={{ paddingTop: '3px' }}>{line3}</div>
        <div style={{ paddingTop: '20px' }}>{line4}</div>
      </div>
    </div>
  );
};

export default Footer;
