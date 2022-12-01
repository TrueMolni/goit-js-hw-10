export function fetchCountries(name) {
  fetch(`${URL}/${name}`).then(resp =>
    resp.json().then(data => {
      console.log(data);
    })
  );
}

const URL = 'https://restcountries.com/v2/name?fields=capital';
