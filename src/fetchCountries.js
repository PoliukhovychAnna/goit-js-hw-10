import { Notify } from 'notiflix/build/notiflix-notify-aio';
const URL = 'https://restcountries.com/v3.1/name/';
// const END_POINT_NAME = 'name/';
// const END_POINT_LANGUAGE = 'lang/'; //{currency}
// const END_POINT_CAPITAL = 'capital/';
const searchBox = document.querySelector('#search-box');
console.log(searchBox);

searchBox.addEventListener('input', fetchCountries);

export function fetchCountries(name) {
  return fetch(`URL${name}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status)
      }
      return response.json()
  });
}
