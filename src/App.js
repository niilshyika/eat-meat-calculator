import React, { useState, useRef } from "react";
import Media from "react-media";
import Select from "react-select";
import "./App.css";
import Card from './components/card';
import LifeExpentancy from './components/life-expentancy';
import LangPopup from './components/lang-popup';
import Aside from './components/aside'
import { round, useOutsideClick } from './utils';
import countries from "./final.json";
import {
  BOVIE_MEAT,
  PIG_MEAT,
  POULTRY_MEAT,
  LOCALIZATION,
} from "./constants.js";
import cowIcon from "./imgs/cow.svg";
import pigIcon from "./imgs/pig.svg";
import chickenIcon from "./imgs/chicken.svg";
import redCowIcon from "./imgs/cow-red.svg";
import redPigIcon from "./imgs/pig-red.svg";
import redChickenIcon from "./imgs/chicken-red.svg";

const options = countries.map((country) => ({
  ...country,
  label: country.country,
  value: country.country,
}));

const calculateMeatValue = (country, consumptionType, meatConstant, age) => {
  return round(
    (country[consumptionType] /
      meatConstant.usefulMass /
      meatConstant.averageMass) *
      age,
    1
  )
}

const App = () => {
  const [currentCountry, setCountry] = useState(null);
  const [age, setAge] = useState(null);
  const [localization, setLocalization] = useState("EN");
  const [isLangPopup, setLangPopup] = useState(false);
  const [isAside, setAside] = useState(false);

  let restAge = 0,
    eatenBovine = 0,
    eatenPig = 0,
    eatenPoultry = 0,
    savedBovine = 0,
    savedPig = 0,
    savedPoultry = 0;

  if (currentCountry) {
    const { a, b, c } = currentCountry;
    restAge = round(a + (Math.sqrt((age - b) ** 2 + c) - age) / 2, 1);

    eatenBovine = calculateMeatValue(currentCountry, 'bovineConsumption', BOVIE_MEAT, age);
    eatenPig = calculateMeatValue(currentCountry, 'pigConsumption', PIG_MEAT, age);
    eatenPoultry = calculateMeatValue(currentCountry, 'poultryConsumption', POULTRY_MEAT, age);
    savedBovine = calculateMeatValue(currentCountry, 'bovineConsumption', BOVIE_MEAT, restAge);
    savedPig = calculateMeatValue(currentCountry, 'pigConsumption', PIG_MEAT, restAge); 
    savedPoultry = calculateMeatValue(currentCountry, 'poultryConsumption', POULTRY_MEAT, restAge); 
  }

  let cards = [
    { icon: cowIcon, redIcon: redCowIcon, eaten: eatenBovine, canBeSaved: savedBovine },
    { icon: pigIcon, redIcon: redPigIcon, eaten: eatenPig, canBeSaved: savedPig },
    { icon: chickenIcon, redIcon: redChickenIcon, eaten: eatenPoultry, canBeSaved: savedPoultry },
  ];

  let currentLocalization = LOCALIZATION[localization];
  let localizationKeys = Object.keys(LOCALIZATION)

  let selectStyles = {
    control: (styles) => ({
      ...styles,
      border: '3px solid #92C367',
      background: 'transparent',
      outline: 'none'
    }),
  };

  const selectLang = (lang) => {
    setLangPopup(false);
    setLocalization(lang);
  }

  return (
    <Media query={{ maxWidth: 567 }}>
        {isMobile => (
          <div className="App">
            {/* <div className={`aside-wrapper ${isAside ? 'aside-wrapper--visible': ''}`}>
            </div> */}
            {isMobile && <Aside
              isVisible={isAside}
              closeHandler={() => setAside(false)}
              activeLang={localization}
              langs={localizationKeys}
              langHandler={selectLang}
            />}
            
            <header>
              {isMobile && <div onClick={() => setAside(true)} className="header_aside-button">
                <div className="header_aside-line"></div>
              </div>}
              <div className="header_title">Vegan calculator</div>
              {!isMobile && <div className="header_local-block">
                <div
                  className="header_local-button"
                  onClick={() => setLangPopup(true)}
                >
                  {localization}
                </div>
                {isLangPopup && <LangPopup
                  items={localizationKeys}
                  onSelectLang={selectLang}
                  active={localization}
                />}
              </div>}
            </header>

            <div className="filter-container">
              <div className="input-container country-input">
                <label>
                  <div className="input-label">{currentLocalization.country}</div>
                  <Select
                    defaultValue={currentCountry}
                    onChange={setCountry}
                    options={options}
                    styles={selectStyles}
                    placeholder={currentLocalization.enterCountry}
                  />
                </label>
              </div>
              <div className="input-container input-container--age">
                <label>
                  <div className="input-label">{currentLocalization.age}</div>
                  <input
                    className="age-input"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    type="number"
                    placeholder={currentLocalization.enterAge}
                  ></input>
                </label>
              </div>
              { !isMobile && <LifeExpentancy
                restAge={restAge}
                localization={currentLocalization}
              /> }
            </div>
            {isMobile && (
              <div className="life-container">
                 <LifeExpentancy restAge={restAge} localization={currentLocalization} />
              </div>
            )}

            <div className="cards-container">
              <div className="cards-rows">
                <div className="cards-row">
                  <div className="cards-title">
                    {currentLocalization.alreadyEaten}
                  </div>
                  <div className="cards">
                    {cards &&
                      cards.map(({ redIcon, eaten }) => (
                        <Card icon={redIcon} isEaten amount={eaten} />
                      ))}
                  </div>
                </div>

                <div className="cards-row cards-row--right">
                  <div className="cards-title">
                    {currentLocalization.canBeSaved}
                  </div>
                  <div className="cards">
                    {cards &&
                      cards.map(({ icon, canBeSaved }) => (
                        <Card icon={icon} amount={canBeSaved} />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
       )}
    </Media>
  );
};

export default App;
