import React, { useEffect, useState } from "react";
import s from "./CitySelect.module.scss";

interface CitiesData {
  city: string;
  country: string;
  countryCode: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
  region: string;
  regionCode: string;
  type: string;
  wikiDataId: string;
}

function CitySelect() {
  const [cityName, setCityName] = useState<string>("");
  const [citiesData, setCitiesData] = useState<CitiesData[]>();

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_GEODB_CITIES_KEY;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    };
    const getData = setTimeout(() => {
      // console.log(cityName);
      if (cityName.length > 3) {
        fetch(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&minPopulation=10000&sort=-population&namePrefix=${cityName}`,
          options
        )
          .then((response) => response.json())
          .then((data) => setCitiesData(data.data))

          .catch((err) => console.error(err));
      } else {
        setCitiesData([]);
      }

      // console.log(citiesData);
    }, 2000);

    return () => clearTimeout(getData);
  }, [cityName]);

  const citiesDiv = citiesData?.map((city) =>
    city.type === "CITY" ? <div key={city.id}>{city.name}</div> : null
  );

  return (
    <div className={s.citySelect}>
      <input
        type="text"
        value={cityName}
        onChange={(e) => {
          setCityName(e.target.value);

          // console.log(cityName);
        }}
        className={s.citySelect__input}
      />

      <div>{citiesDiv}</div>
    </div>
  );
}

export default CitySelect;
