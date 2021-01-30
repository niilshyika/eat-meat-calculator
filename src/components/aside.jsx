import React, { useRef } from 'react';
import { useOutsideClick } from '../utils';
import closeIcon from '../imgs/close-icon2.svg';
import telegram from '../imgs/telegram.svg';
import vk from '../imgs/vk.svg';

const siteUrl='https://niilshyika.github.io/eat-meat-calculator/';
const tgShareLink = `https://t.me/share/url?url=${siteUrl}`;
const vkShareLink = `http://vk.com/share.php?url=${siteUrl}`;

const Aside = ({ isVisible, closeHandler, langs, activeLang, langHandler }) => {
  const asideRef = useRef();

  useOutsideClick(asideRef, () => {
    isVisible && closeHandler();
  });

  return (
    <div ref={ asideRef } className={`aside ${ isVisible ? 'aside--visible': '' }`}>
      <div class="aside_close" onClick={ closeHandler }>
        <img src={ closeIcon } alt="close" />
      </div>

      <div className="aside__lang-wrapper">
        {langs.map(lang => (
          <div
            className={`aside__lang-button ${lang === activeLang ? 'aside__lang-button--active' : ''}`} 
            onClick={() => {
              langHandler(lang);
              closeHandler();
            }}
          >{lang}</div>

        ))}
      </div>

      <div className="aside__share-buttons">
        <a href={tgShareLink} target="_blank">
          <img src={telegram} />
        </a>

        <a href={vkShareLink} target="_blank">
          <img src={vk} />
        </a>
      </div>

    </div>
  )
}

export default Aside;