import { FRUITS } from "../data/Data";

export const getSuggestions = (keyword) => {
  const results = FRUITS.filter((fruit) =>
    fruit.toLowerCase().startsWith(keyword.toLowerCase())
  );
  return new Promise((res) => {
    setTimeout(() => res(results), 1000);
  });
};

export const debounce = (fn, delay = 500) => {
  let timerID;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timerID);
    timerID = setTimeout(() => fn.apply(context, args), delay);
  };
};
