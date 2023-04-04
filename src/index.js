import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import API from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

searchBox.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(event) {
  event.preventDefault();
  const inputValue = event.target.value;

  if (!inputValue.trim()) {
    return;
  }

  API.fetchCountries(inputValue.trim())
    .then(country => {
      if (country.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }

      if (country.length >= 2 && country.length <= 10) {
        renderListCountry(country);
      }

      if (country.length === 1) {
        renderCardCountry(country);
      }
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
  countryList.innerHTML = '';
}
function renderListCountry(countryValues) {
  const markup = countryValues
    .map(({ name, flags }) => {
      return `
      <li class="main-info">
        <img src="${flags.svg}"
        alt="Flag"
        />
        <p class="name-country"> ${name.official}</p>
      </li>
      `;
    })
    .join('');

  countryList.innerHTML = markup;
}

function renderCardCountry(countryValues) {
  const markup = countryValues
    .map(({ name, capital, population, flags, languages }) => {
      return `
      <div class="main-info">
        <img src="${flags.svg}"
        alt="Flag"
        />
        <p class="name"> ${name.official}</p>
      </div>
      <div>
        <p><b>Capital</b>: ${capital}</p>
        <p><b>Population</b>: ${population}</p>
        <p><b>Languages</b>: ${Object.values(languages).join(', ')}</p>
      </div>
      `;
    })
    .join('');

  countryInfo.innerHTML = markup;
}
