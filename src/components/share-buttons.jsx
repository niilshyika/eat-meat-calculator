import React from 'react';

const ShareButtons = ({items}) => (
  <div className="aside__share-buttons">
    {items.map(item => (
      <a href={item.link} target="_blank">
        <img className="share-button" src={item.icon} />
      </a>
    ))}
  </div>
);

export default ShareButtons;