import React from 'react';
import './InvStatList.scss';

const InvStatInfo = ({ data }) => {
  const month = parseInt(data.date.split("-")[1]);
  const day = parseInt(data.date.split("-")[2]);

  const invColor = data.inKR.individual.includes("+") ? 'green' : 'red';
  const invForeign = data.inKR.foreign.includes("+") ? 'green' : 'red';
  const invInst = data.inKR.institutions.includes("+") ? 'green' : 'red';

  return (
    <div className="invstat-item">
      <div>
        {month.toString() + "." + day.toString()}
      </div>
      <div style={{color: invColor}}>
        {data.inKR.individual}
      </div>
      <div style={{color: invForeign}}>
        {data.inKR.foreign}
      </div>
      <div style={{color: invInst}}>
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
