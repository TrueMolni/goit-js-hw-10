import './css/styles.css';
import { fetchCountries } from './fetchCountries';

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
let items = [];
const filterUrl =
  'https://restcountries.com/v2/name?fields=name,capital,population,flags,languages';

const options = {
  //      name[official], // - повна назва країни
  //   capital, // - столиця
  //   population,  // - населення
  //   flags[svg], // - посилання на зображення прапора
  //   languages, // - масив мов
};

const render = () => {
  console.log(items);
};
const refs = {
  queryRef: document.querySelector('#search-box'),
  listRef: document.querySelector('.country-list'),
  infoRef: document.querySelector('.country-info'),
};

const queryHandle = () => {
  console.log(refs.queryRef.value);
  items = fetchCountries(refs.queryRef.value);
  render();
};

refs.queryRef.addEventListener('input', debounce(queryHandle, DEBOUNCE_DELAY));

const getItemTemplate = () => `<li></li>`;
