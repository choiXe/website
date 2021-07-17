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
    if (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return num;
    }
  };

  const marketInfo = (index) => {
    const color = index.changeRate > 0 ? '#e21414' : '#246ded';
    return (
      <>
        <p style={{ color: color }}>{numbWithCommas(index.tradePrice)}</p>
        <p style={{ color: color }}>{index.changePrice}</p>
        <p style={{ color: color }}>{index.changeRate}%</p>
      </>
    );
  };

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
            <div key={index.symbolCode}>
              <p>
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
            <p>
              <img src={us} alt="us" /> {data.global[5].name}
            </p>
            {marketInfo(data.global[5])}
          </div>
          <div>
            <p>
              <img src={us} alt="us" /> {data.global[6].name}
            </p>
            {marketInfo(data.global[6])}
          </div>
          <div>
            <p>
              <img src={us} alt="us" /> {data.global[7].name}
            </p>
            {marketInfo(data.global[7])}
          </div>
          <div>
            <p>
              <img src={china} alt="cn" /> {data.global[0].name}
            </p>
            {marketInfo(data.global[0])}
          </div>
          <div>
            <p>
              <img src={japan} alt="jp" /> {data.global[1].name}
            </p>
            {marketInfo(data.global[1])}
          </div>
          <div>
            <p>
              <img src={hongkong} alt="hk" /> {data.global[2].name}
            </p>
            {marketInfo(data.global[2])}
          </div>
          <div>
            <p>
              <img src={germany} alt="gr" /> {data.global[3].name}
            </p>
            {marketInfo(data.global[3])}
          </div>
          <div>
            <p>
              <img src={uk} alt="uk" /> {data.global[4].name}
            </p>
            {marketInfo(data.global[4])}
          </div>
        </div>
      </div>
    </>
  );
};

export default StockMarket;
