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
        <a href={data.link}>{newsName}</a>
      </div>
    </div>
  )
}

const NewsList = ({ dataSet }) => {
  return (
    <>
      {dataSet.map(data => (
        <NewsInfo key={data.date} data={data} />
      ))}
    </>
  )
}

export default NewsList;
