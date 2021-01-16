import React, { useState } from "react";
import Select from "react-select";
import "./App.css";
import countries from "./final.json";

console.log(countries);

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

const BOVIE_MEAT = {
  usefulMass: 0.62,
  averageMass: 550
}

const PIG_MEAT = {
  usefulMass: 0.7,
  averageMass: 130
}

const POULTRY_MEAT = {
  usefulMass: 0.71,
  averageMass: 2.6
}

const options = countries.map((country) => ({
  ...country,
  label: country.country,
  value: country.country,
}));

const App = () => {
  const [currentCountry, setCountry] = useState(null);
  const [age, setAge] = useState(12);

  let restAge = 0;
  let eatenBovine = 0;
  let eatenPig = 0;
  let eatenPoultry = 0;
  let savedBovine = 0;
  let savedPig = 0;
  let savedPoultry = 0;
  if (currentCountry) {
    const { a, b, c } = currentCountry;
    restAge = round(a + (Math.sqrt((age - b) ** 2 + c) - age) / 2, 1);
    
    eatenBovine = round(currentCountry.bovineConsumption / BOVIE_MEAT.usefulMass / BOVIE_MEAT.averageMass * age, 1);
    eatenPig = round(currentCountry.pigConsumption / PIG_MEAT.usefulMass / PIG_MEAT.averageMass * age, 1);
    eatenPoultry = round(currentCountry.poultryConsumption / POULTRY_MEAT.usefulMass / POULTRY_MEAT.averageMass * age, 1);

    savedBovine = round(currentCountry.bovineConsumption / BOVIE_MEAT.usefulMass / BOVIE_MEAT.averageMass * restAge, 1);
    savedPig = round(currentCountry.pigConsumption / PIG_MEAT.usefulMass / PIG_MEAT.averageMass * restAge, 1);
    savedPoultry = round(currentCountry.poultryConsumption / POULTRY_MEAT.usefulMass / POULTRY_MEAT.averageMass * restAge, 1);
  }

  return (
    <div className="App">
      <header>Форма рассчёта съеденных зверушек</header>
      <div className="filter-container">
        <div className="input-container country-input">
          <label>
            <div className="input-label">Введите страну</div>
            <Select
              defaultValue={currentCountry}
              onChange={setCountry}
              options={options}
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
            ></input>
          </label>
        </div>
      </div>
      {restAge ? (
        <div>Оставшееся число лет (Remaining Life expectancy): {restAge}</div>
      ) : null}

      <div>Уже съедено(alredy eaten):</div>
      { eatenBovine ? <div>Коровы (Cows): { eatenBovine }</div> : null }
      { eatenPig ? <div>Свиньи (Pigs): { eatenPig }</div> : null }
      { eatenPoultry ? <div>Домашние птицы (Poultry): { eatenPoultry }</div> : null }

      <div>будут съедены \ могут быть спасены(will be eaten \ can be saved):</div>
      { savedBovine ? <div>Коровы (Cows): { savedBovine }</div> : null }
      { savedPig ? <div>Свиньи (Pigs): { savedPig }</div> : null }
      { savedPoultry ? <div>Домашние птицы (Poultry): { savedPoultry }</div> : null }
    </div>
  );
};

export default App;
