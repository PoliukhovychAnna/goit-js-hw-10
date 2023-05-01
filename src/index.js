import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(() => {
    const requestField = searchBox.value.trim()
    if (!requestField) {
       countryList.innerHTML = '';
       countryInfo.innerHTML = '';
    }
    
    if (requestField) {
        fetchCountries(requestField)
          .then(countries => checkResult(countries))
          .catch(error => Notify.failure(error.message));
    }}, DEBOUNCE_DELAY));


function checkResult(countries) {
    if (countries.length > 10) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (countries.length > 1 && countries.length < 10) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        renderListOfCountries(countries)
    } else {
        countryList.innerHTML = '';
        renderCountryCard(countries)
    }}

function renderListOfCountries(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `<li> <img src="${flags.svg}" alt=" flag of ${name.official}" width="50" height="30"> <p class = "country-name">${name.official}</p></li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function renderCountryCard(country) {
    const markup = country.map(({ name, flags, population, languages, capital }) => {
        return `<li> <img src="${flags.svg}" alt="flag of ${
          name.official
        }" width="200" height="120"> <h2>${
          name.official
        }</h2> <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages).join(', ')}</p></li>`;
    }).join('')
    countryInfo.innerHTML = markup;
}

