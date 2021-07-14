import React from 'react';
import './InvStatList.scss';

const InvStatInfo = ({ data }) => {
  let date = parseInt(data.date.split("-")[1]).toString() +
   '.' + parseInt(data.date.split("-")[2]).toString();
  let individual, foreign,  institutions;
  let invColor, invForeign, invInst;

  if (data.inKR == null) {
    invColor = invForeign = invInst = 'red';
    [individual, foreign, institutions] = '---';
    date = '점검중';
  } else {
    individual = data.inKR.individual;
    foreign = data.inKR.foreign;
    institutions = data.inKR.institutions;
    invColor = individual.includes("+") ? 'red' : 'blue';
    invForeign = foreign.includes("+") ? 'red' : 'blue';
    invInst = institutions.includes("+") ? 'red' : 'blue';
  }

  return (
    <div className="invstat-item">
      <div>
        {date}
      </div>
      <div className={invColor}>
        {individual}
      </div>
      <div className={invForeign}>
        {foreign}
      </div>
      <div className={invInst}>
        {institutions}
      </div>
    </div>
  )
}

const InvStatList = ({ dataSet }) => {
  return (
    <>
      {dataSet.map(data => (
        <InvStatInfo key={data.date} data={data} />
      ))}
    </>
  )
}

export default InvStatList;
