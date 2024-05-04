import { useState, useEffect } from "preact/hooks";

const getActualTime = () => {
  const date = new Date();
  return (
    (date.getHours() < 10 ? "0" : "") +
    date.getHours() +
    ":" +
    (date.getMinutes() < 10 ? "0" : "") +
    date.getMinutes()
  );
};

const useTime = () => {
  const [value, setTime] = useState(getActualTime());
  const [stop, setStop] = useState(false);

  const stopTime = () => {
    setStop(true);
  };

  const resumeTime = () => {
    setStop(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!stop) {
        setTime(getActualTime());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return { value, stopTime, resumeTime };
};

export default useTime;
