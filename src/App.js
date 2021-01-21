import React, { useState } from "react";
import Select from "react-select";
import "./App.css";
import countries from "./final.json";
import { BOVIE_MEAT, PIG_MEAT, POULTRY_MEAT } from "./constants.js";
import manIcon from "./imgs/man.svg";
import cowIcon from "./imgs/cow.svg";
import pigIcon from "./imgs/pig.svg";
import chickenIcon from "./imgs/chicken.svg";

function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

const options = countries.map((country) => ({
  ...country,
  label: country.country,
  value: country.country,
}));


const LifeExpentancy = ({ restAge }) => <div className="life-block">
  <label>
    <div className="input-label">Rest of life</div>
    <div className="life-block_wrapper">
      <img src={manIcon} className="life-block_icon" />
      {restAge ? <div className="life-block_amount">{restAge}</div> : null}
    </div>
  </label>
</div>;

const Card = ({isEaten, icon, amount}) => {
  return <div className="card">
    <img src={icon} className="card_icon" />
    <div className={`card_amount ${ !isEaten ? 'card_amount--green' : null }`}>{amount}</div>
  </div>
}

const App = () => {
  const [currentCountry, setCountry] = useState(null);
  const [age, setAge] = useState(null);

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

    eatenBovine = round(
      (currentCountry.bovineConsumption /
        BOVIE_MEAT.usefulMass /
        BOVIE_MEAT.averageMass) *
        age,
      1
    );
    eatenPig = round(
      (currentCountry.pigConsumption /
        PIG_MEAT.usefulMass /
        PIG_MEAT.averageMass) *
        age,
      1
    );
    eatenPoultry = round(
      (currentCountry.poultryConsumption /
        POULTRY_MEAT.usefulMass /
        POULTRY_MEAT.averageMass) *
        age,
      1
    );

    savedBovine = round(
      (currentCountry.bovineConsumption /
        BOVIE_MEAT.usefulMass /
        BOVIE_MEAT.averageMass) *
        restAge,
      1
    );
    savedPig = round(
      (currentCountry.pigConsumption /
        PIG_MEAT.usefulMass /
        PIG_MEAT.averageMass) *
        restAge,
      1
    );
    savedPoultry = round(
      (currentCountry.poultryConsumption /
        POULTRY_MEAT.usefulMass /
        POULTRY_MEAT.averageMass) *
        restAge,
      1
    );
  }

  let cards = [
    { icon: cowIcon, eaten: eatenBovine, canBeSaved: savedBovine},
    { icon: pigIcon, eaten: eatenPig, canBeSaved: savedPig},
    { icon: chickenIcon, eaten: eatenPoultry, canBeSaved: savedPoultry},
  ];

  let selectStyles = {
    control: (styles) => ({
      ...styles,
      // backgroundColor: 'black',
      border: "3px solid #92C367",
    }),
  };

  return (
    <div className="App">
      <header>
        <div className="header_title">Vegan calculator</div>
        <div className="header_local-button"></div>
      </header>

      <div className="filter-container">
        <div className="input-container country-input">
          <label>
            <div className="input-label">Введите страну</div>
            <Select
              defaultValue={currentCountry}
              onChange={setCountry}
              options={options}
              styles={selectStyles}
              placeholder={"Select your country"}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            <div className="input-label">Введите возраст</div>
            <input
              className="age-input"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
              placeholder="Enter your age"
            ></input>
          </label>
        </div>
      <LifeExpentancy restAge={ restAge } />
      </div>

      <div>
        <div>Already</div>
        <div className="cards"> 
          {cards && cards.map(({icon, eaten}) => <Card icon={icon} isEaten amount={eaten} />)}
        </div>
      </div>
      
      <div>
        <div>Can be Saved</div>
        <div className="cards"> 
          {cards && cards.map(({icon, canBeSaved}) => <Card icon={icon} amount={canBeSaved} />)}
        </div>
      </div>

      
    </div>
  );
};

export default App;
