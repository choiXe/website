import React from "react";
import "./navigation/NavMenu.scss";

const Footer = () => {
  var line1 = "대표: 김휘원 | 문의: ";
  var line2 = "본 서비스는 투자판단에 참고용으로만 사용하실 수 있으며,";
  var line3 =
    "모든 투자판단은 투자자 본인의 책임으로 투자결과에 대하여 법적 책임을 지지 않습니다.";
  var line4 = "© 2021 choiXe, Inc. All Rights Reserverd";

  return (
    <div style={{ marginTop: "2%" }}>
      <div
        style={{
          textAlign: "center",
          paddingTop: "30px",
          paddingBottom: "60px",
          marginTop: "4rem",
          fontSize: "13px",
          color: "#888",
        }}
      >
        <div>
          {line1}
          <a
            href="mailto:help@choixe.app"
            style={{ color: "#292E49", textDecoration: "none" }}
          >
            help@choixe.app
          </a>
        </div>
        <div style={{ paddingTop: "20px" }}>{line2}</div>
        <div style={{ paddingTop: "3px" }}>{line3}</div>
        <div style={{ paddingTop: "20px" }}>{line4}</div>
      </div>
    </div>
  );
};

export default Footer;
