import React, { useState, useEffect } from "react";
import './Clock.scss'

interface ClockState {
  hours: number;
  minutes: number;
  seconds: number;
}

const Clock = () => {

  const [time, setTime] = useState<ClockState>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const {hours, minutes, seconds} = time

  useEffect(() => {

    const fetchTime = async () => {
        /* const fetchTime = async () => {
      try {
        const response = await fetch('https://api.example.com/time');
        const data = await response.json();
        const { hours, minutes, seconds } = data;
        setTime({ hours, minutes, seconds });
      } catch (error) {
        console.error('Ошибка при получении времени', error);
      }
    }; */
      const data = new Date();
      setTime({
        hours: data.getHours(),
        minutes: data.getMinutes(),
        seconds: data.getSeconds(),
      })
    };

    const timer = setInterval(fetchTime, 1000); 

    return () => {
      clearInterval(timer); 
    };
  }, []);

  return (
      <div className="clock-container">
      <div className="clock">
        <div className="hour-hand" style={{ transform: `rotate(${((hours % 12) * 30) + minutes  * 0.5}deg)` }} />
        <div className="minute-hand" style={{ transform: `rotate(${minutes * 6 + seconds * 0.1}deg)` }} />
        <div className="second-hand" style={{ transform: `rotate(${seconds * 6}deg)` }} />
        <div className="center-circle" />
      </div>
      <div className="digital-clock">{`${hours < 10 ? '0' : ''}${hours}`}:{`${minutes < 10 ? '0' : ''}${minutes}`}:{`${seconds < 10 ? '0' : ''}${seconds}`}</div>
    </div>
  );
};

export default Clock;
