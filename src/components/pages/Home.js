import React, { useState } from "react";
import '../../App.css';
import './Home.css'

function Home() {
  const sectors = ["에너지", "원자재", "산업재", "경기소비재", "필수소비재", "헬스케어", "금융재", "정보기술재", "통신재", "유틸리티", "부동산/리츠"];
  const [mySector, setMySector] = useState();

  const Highlight = ({ active, count, onClick }) => {
    return (
      <div onClick={onClick} className={active ? "active" : "inactive"}>
        {count}
      </div>
    );
  };

  const showSector = () => {
    return (
      <div className="sector-style">
        {sectors.map(t => (
          <Highlight
            key={t}
            count={t}
            active={t === mySector}
            onClick={() => setMySector(t)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="left-container">
        <h3 className="left-title">섹터</h3>
        {showSector()}
      </div>
      <div className="right-container">
        <div className='sector-container'>
          <p>{mySector}</p>
        </div>
        <div className='sector-container' style={{marginTop: '3%'}}>
          <p>Stock list</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
