import React, { useRef } from 'react';
import { useOutsideClick } from '../utils';
import ShareButtons from './share-buttons';
import closeIcon from '../imgs/close-icon2.svg';

const Aside = ({ isVisible, closeHandler, langs, activeLang, langHandler, shareButtons }) => {
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

      <ShareButtons items={ shareButtons } />
    </div>
  )
}

export default Aside;