import './css/styles.css';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
  queryRef: document.querySelector('#search-box'),
  listRef: document.querySelector('.country-list'),
  infoRef: document.querySelector('.country-info'),
};

function fetchCountries(name) {
  console.log('hello');
}
console.log(refs.queryRef);
console.log(refs.listRef);
console.log(refs.infoRef);

const queryHandle = () => {
  console.log(refs.queryRef.value);
};

refs.queryRef.addEventListener('input', debounce(queryHandle, DEBOUNCE_DELAY));
