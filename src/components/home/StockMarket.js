import React from 'react';

import './StockMarket.scss';

import china from '../../images/china.png';
import germany from '../../images/germany.png';
import hongkong from '../../images/hongkong.png';
import japan from '../../images/japan.png';
import korea from '../../images/korea.png';
import uk from '../../images/uk.png';
import us from '../../images/us.png';

const StockMarket = ({ data }) => {
  const numbWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const marketInfo = (index) => {
    const color = index.changeRate >= 0 ? '#e21414' : '#246ded';
    return (
      <>
        <p style={{ color: color }}>{numbWithCommas(index.tradePrice)}</p>
        <p style={{ color: color }}>
          {index.changePrice > 0 ? '+' + index.changePrice : index.changePrice}
        </p>
        <p style={{ color: color }}>
          {index.changeRate > 0 ? '+' + index.changeRate : index.changeRate}%
        </p>
      </>
    );
  };

  let globalIndicator = {};
  for (let i = 0; i < data.global.length; i++) {
    globalIndicator[data.global[i].name] = data.global[i];
  }

  return (
    <>
      <div className="index korea">
        <h4>국내증시</h4>
        <div id="market-title">
          <div></div>
          <div>현재가</div>
          <div>변동</div>
          <div>변동률</div>
        </div>
        <div className="market-table">
          {data.kr.map((index) => (
            <div key={index.name}>
              <p className="market-title">
                <img src={korea} alt="kr" /> {index.name}
              </p>
              {marketInfo(index)}
            </div>
          ))}
        </div>
      </div>
      <div className="index global">
        <h4>해외증시</h4>
        <div className="market-table">
          <div>
            <p className="market-title">
              <img src={us} alt="us" /> 다우 산업
            </p>
            {marketInfo(globalIndicator['다우 산업'])}
          </div>
          <div>
            <p className="market-title">
              <img src={us} alt="us" /> 나스닥 종합
            </p>
            {marketInfo(globalIndicator['나스닥 종합'])}
          </div>
          <div>
            <p className="market-title">
              <img src={us} alt="us" /> S&P 500
            </p>
            {marketInfo(globalIndicator['S&P 500'])}
          </div>
          <div>
            <p className="market-title">
              <img src={china} alt="cn" /> 상해 종합
            </p>
            {marketInfo(globalIndicator['상해 종합'])}
          </div>
          <div>
            <p className="market-title">
              <img src={japan} alt="jp" /> 니케이 225
            </p>
            {marketInfo(globalIndicator['니케이 225'])}
          </div>
          <div>
            <p className="market-title">
              <img src={hongkong} alt="hk" /> HSI
            </p>
            {marketInfo(globalIndicator['HSI'])}
          </div>
          <div>
            <p className="market-title">
              <img src={germany} alt="gr" /> DAX
            </p>
            {marketInfo(globalIndicator['DAX'])}
          </div>
          <div>
            <p className="market-title">
              <img src={uk} alt="uk" /> FTSE 100
            </p>
            {marketInfo(globalIndicator['FTSE 100'])}
          </div>
        </div>
      </div>
    </>
  );
};

export default StockMarket;
