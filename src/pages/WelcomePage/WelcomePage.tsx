import React, { createRef, useEffect, useState } from "react";
import s from "./WelcomePage.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addAutoGeolocation,
  addAutoGeoToGeolocation,
} from "../../store/slices/geolocationSlice";
import CitySelect from "../../components/CitySelect/CitySelect";

function WelcomePage() {
  function getTime() {
    const timeNow = new Date();
    const hours =
      timeNow.getHours() < 10 ? `0${timeNow.getHours()}` : timeNow.getHours();
    const minutes =
      timeNow.getMinutes() < 10
        ? `0${timeNow.getMinutes()}`
        : timeNow.getMinutes();
    return { hours, minutes };
  }

  const dispatch = useAppDispatch();
  const [time, setTime] = useState(getTime());
  const [modalStatus, setModalStatus] = useState<boolean>(true);

  const modalRef = createRef<HTMLDivElement>();

  const autoGeolocationCity = useAppSelector(
    (state) => state.geolocation.autoGeolocation.city
  );

  const autoGeolocationConfirmed = () => {
    dispatch(addAutoGeoToGeolocation());

    if (modalRef.current) {
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.classList.remove(s.modalWindow_closed);
        }
      }, 300);

      modalRef.current.classList.remove(s.modalWindow_opened);
      modalRef.current.classList.add(s.modalWindow_closed);
    }
    setTimeout(() => {
      setModalStatus(false);
    }, 1000);
  };

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_GEOLOCATIONDB_KEY;
    const fetchData = () => {
      return fetch(`https://geolocation-db.com/json/${API_KEY}`)
        .then((responce) => responce.json())
        .then((data) => {
          const { latitude, longitude, city } = data;
          dispatch(addAutoGeolocation({ latitude, longitude, city }));
        });
    };
    fetchData();
    setInterval(() => {
      setTime(getTime());
    }, 1000);
  }, [dispatch]);

  return (
    <div className={s.welcomePage}>
      {modalStatus ? (
        <div
          ref={modalRef}
          className={`${s.modalWindow} ${s.modalWindow_opened}`}
        >
          <div className={s.modalWindow__title}>
            Are you from{" "}
            <span style={{ fontWeight: 700, textDecoration: "underline" }}>
              {autoGeolocationCity}
            </span>
            ?
          </div>
          <button
            type="button"
            onClick={() => autoGeolocationConfirmed()}
            className={s.modalWindow__btn}
          >
            Yes, I&apos;m from <span>{autoGeolocationCity}</span>
          </button>
          <div className={s.modalWindow__separator}>
            <hr />
            <span>or</span>
            <hr />
          </div>
          <div className={s.modalWindowSelect}>
            <CitySelect />
          </div>
        </div>
      ) : null}
      <div className={s.welcomePage__time}>
        {time.hours}:{time.minutes}
      </div>
    </div>
  );
}

export default WelcomePage;
