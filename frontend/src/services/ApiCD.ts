import dayjs from "dayjs";

const set = () => {
  localStorage.setItem("api-cd", dayjs().add(1, "minutes").toJSON());
};

const isOnCD = () => {
  let date = dayjs(localStorage.getItem("api-cd"));
  if (date.isAfter(dayjs())) {
    return date.diff(dayjs(), "seconds");
  }
  return null;
};

export const ApiCD = {
  set,
  isOnCD,
};
