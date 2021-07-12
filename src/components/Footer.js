import React from 'react';
import './NavMenu.scss';

const Footer = () => {
  var line1 = "© 2021 CHOIXE CORP. ALL RIGHTS RESERVED";
  var line2 = "본 서비스는 투자판단에 참고용으로만 사용하실 수 있으며,";
  var line3 = "모든 투자판단은 투자자 본인의 책임으로 투자결과에 대하여 법적 책임을 지지 않습니다.";

  return (
    <div style={{marginTop: '2%'}}>
      <div style={{
        backgroundColor: '#D3D3D3',
        textAlign: 'center',
        paddingTop: '1%',
        paddingBottom: '1%'}}>
      <div>{line1}</div>
      <div>{line2}</div>
      <div>{line3}</div>
    </div>
    </div>
    
  )
};

export default Footer;
