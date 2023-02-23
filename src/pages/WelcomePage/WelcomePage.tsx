import React, { useEffect, useState } from "react";
import s from "./WelcomePage.module.scss";

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
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    setInterval(() => {
      setTime(getTime());
    }, 1000);
  }, []);

  return (
    <div className={s.welcomePage}>
      <div className={s.welcomePage__time}>
        {time.hours}:{time.minutes}
      </div>
    </div>
  );
}

export default WelcomePage;
