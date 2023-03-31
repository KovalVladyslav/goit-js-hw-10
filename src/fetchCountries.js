const BASE_URL = 'https://restcountries.com/v3.1/name/';
function fetchCountries(countryName) {
  return fetch(
    `${BASE_URL}${countryName}?fields=name,capital,population,flags,languages`
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}

export default { fetchCountries };
