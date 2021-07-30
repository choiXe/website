import React from 'react';

import { slicer } from '../tools/formatter';

import './NewsList.scss';

const NewsInfo = ({ data }) => {
  return (
    <div className="news-item">
      <div id="date">{data.date}</div>
      <div id="news">
        <a
          href={data.link}
          rel="noreferrer"
          target="_blank"
          className="news-title"
        >
          {slicer(data.title, 60)}
        </a>
        <div className="news-description">{data.description}</div>
      </div>
      <div id="mobile">
        <a
          href={data.link}
          rel="noreferrer"
          target="_blank"
          className="news-title mobile"
        >
          {slicer(data.title, 60)}
        </a>
        <div id="date-mobile">{data.date}</div>
        <div className="news-description mobile">{data.description}</div>
      </div>
    </div>
  );
};

const NewsList = ({ dataSet }) => {
  return (
    <>
      {dataSet.map((data) => (
        <NewsInfo key={data.link} data={data} />
      ))}
    </>
  );
};

export default NewsList;
