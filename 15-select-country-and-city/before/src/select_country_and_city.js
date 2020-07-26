import React from 'react';
import { useState } from 'react';

const SelectCountry = (props) => {
  const {countries, selectedCountry, replaceCountry} = props

  return (
      <>
        <p>Selected Country: {selectedCountry}</p>

        <select defaultValue={""}  onChange={(e) => replaceCountry(e.target.value)}>
          <option key={0} disabled value=""> Please select a country</option>
          {countries.map((country, index) => (
              <option key={index+1} value={country}>{country}</option>
          ))}
        </select>
      </>
  );
};

const SelectCity = (props) => {

  const {cities, selectedCity, setSelectedCity} = props;

  return (
      <>
        <p>Selected City: {selectedCity}</p>

        <select defaultValue={""}
             onChange={(e) => setSelectedCity(e.target.value)}>
          <option key={0} disabled value="" > Please select a city</option>
          {cities.map((city, index) => (
              <option key={index+1} value={city}>{city}</option>
          ))}
        </select>
      </>
  );
};

export default function SelectCountryAndCity(props) {
  const { countriesAndCities } = props;
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  const [count, setCount] = useState(0)

  const countries = Object.keys(countriesAndCities)
  const cities = countriesAndCities[selectedCountry]

  function replaceCountry(country)
  {
    // debugger
    setSelectedCountry(country);
    setSelectedCity(null)
    setCount(x => x + 1)
  }

  return (
      <div>
    <SelectCountry
      countries={countries}
      selectedCountry={selectedCountry}
      replaceCountry={replaceCountry}
    />

        {cities &&
        <SelectCity key={count}
            cities={cities}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
        />
        }

      </div>
  );
}

