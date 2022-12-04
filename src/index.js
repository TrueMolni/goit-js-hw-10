import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;
let userQuery = '';
let items = [];

const refs = {
  queryRef: document.querySelector('#search-box'),
  listRef: document.querySelector('.country-list'),
  infoRef: document.querySelector('.country-info'),
};

const render = () => {
  console.log(items);

  refs.listRef.innerHTML = '';
  refs.infoRef.innerHTML = '';
};

const queryHandle = event => {
  userQuery = event.target.value.trim();
  if (userQuery === '') {
    render();
    return;
  }

  fetchCountries(userQuery)
    .then(data => {
      items = data;
      render();

      if (!items[0].flags) {
        throw new Error();
      }

      if (items.length > 10) {
        return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }

      if (items.length === 1) {
        createInfo();
      } else if (items.length >= 1 && items.length <= 10) {
        createList();
      }
    })
    .catch(ifError);
};

refs.queryRef.addEventListener('input', debounce(queryHandle, DEBOUNCE_DELAY));

const getItemTemplate = ({ flags, name }) =>
  `
  <li>
    <img src=${flags.svg} alt="flag" />
    <p>${name.official}</p>
  </li>
</ul>
`;

const getInfoTemplate = ({ name, population, capital, flags }) => {
  const lang = Object.values(items[0].languages).join(', ');
  return `
<div>
  <img src=${flags.svg} alt="" />
  <h1>${name.official}</h1>
  <h2>Population: ${population}</h2>
  <h2>Capital: ${capital}</h2>
  <h2>Languages: ${lang}</h2>
</div>
`;
};

function createList() {
  const markup = items.map(getItemTemplate);
  render();
  refs.listRef.insertAdjacentHTML('beforeend', markup.join(''));
}

function createInfo() {
  const markup = items.map(getInfoTemplate);
  render();
  refs.infoRef.insertAdjacentHTML('beforeend', markup.join(''));
}

function ifError() {
  render();
  Notify.failure('Oops, there is no country with that name.');
}
