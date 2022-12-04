export function fetchCountries(name) {
  return fetch(`${URL}${name}${filterUrl}`).then(resp =>
    resp.json().then(data => data)
  );
}

const URL = 'https://restcountries.com/v3.1/name/';

const filterUrl = '?fields=name,capital,population,flags,languages';
