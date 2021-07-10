import React from 'react';
import './NewsList.scss';

const NewsInfo = ({ data }) => {
  const newsName = data.title.length > 60 
      ? data.title.slice(0, 60) + "..." 
      : data.title;

  return (
    <div className="news-item">
      <div>
        {data.date}
      </div>
      <div>
        <a href={data.link} rel="noreferrer" target="_blank">{newsName}</a>
      </div>
    </div>
  )
}

const NewsList = ({ dataSet }) => {
  return (
    <>
      {dataSet.map(data => (
        <NewsInfo key={data.link} data={data} />
      ))}
    </>
  )
}

export default NewsList;
