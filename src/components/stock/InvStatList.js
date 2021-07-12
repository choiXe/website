import React from 'react';
import './InvStatList.scss';

const InvStatInfo = ({ data }) => {
  const month = parseInt(data.date.split("-")[1]);
  const day = parseInt(data.date.split("-")[2]);

  const invColor = data.inKR.individual.includes("+") ? 'red' : 'blue';
  const invForeign = data.inKR.foreign.includes("+") ? 'red' : 'blue';
  const invInst = data.inKR.institutions.includes("+") ? 'red' : 'blue';

  return (
    <div className="invstat-item">
      <div>
        {month.toString() + "." + day.toString()}
      </div>
      <div className={invColor}>
        {data.inKR.individual}
      </div>
      <div className={invForeign}>
        {data.inKR.foreign}
      </div>
      <div className={invInst}>
        {data.inKR.institutions}
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