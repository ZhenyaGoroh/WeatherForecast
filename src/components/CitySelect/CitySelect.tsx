import React, { useEffect, useState } from "react";
import s from "./CitySelect.module.scss";
// import { cities } from 'cities.json';

interface Country {
  iso2: string;
  iso3: string;
  countryL: string;
  cities: string[];
}

function CitySelect() {
  const [cityName, setCityName] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>();
  const [cities, setCities] = useState<string[]>([]);

  // const setCitiesFunc = (str: string) => {
  //   const arr = [];
  //   if (str.length > 3) {
  //     for (const key in countries) {
  //       countries[key].cities.map((el) =>
  //         el.startsWith(str) ? arr.push(el) : null
  //       );
  //     }
  //   }
  //   console.log(arr);
  // };

  useEffect(() => {
    const fetchData = () => {
      const API_KEY = import.meta.env.VITE_GEODB_CITIES_KEY;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
      };

      fetch(
        "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&namePrefix=Babruysk",
        options
      )
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
    };
    fetchData();
  }, []);

  return (
    <div className={s.citySelect}>
      <input
        type="text"
        value={cityName}
        onChange={(e) => {
          setCityName(e.target.value);
          // setCitiesFunc(cityName);
          // console.log(cities);
        }}
        className={s.citySelect__input}
      />
      {cityName.length > 3 && <div>{cityName}</div>}
    </div>
  );
}

export default CitySelect;
