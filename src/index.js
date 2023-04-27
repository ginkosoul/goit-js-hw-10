import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './js/fetchCountries';
import './css/styles.css';
const debounce = require('lodash.debounce');

Notify.init({
    fontSize: '13px',
    clickToClose: true,
  });

const DEBOUNCE_DELAY = 300;
const onInputDebounce = debounce(onInput, DEBOUNCE_DELAY);

const refs = {
    searchBox: document.getElementById('search-box'),
    countryList: document.querySelector('.country-list'),
    contryInfo: document.querySelector('.country-info')
}

refs.searchBox.addEventListener('input', onInputDebounce);

function onInput(e){
    const value = e.target.value;
    if (value){
        console.log(value);
        const name = value.trim();
        fetchCountries(name).then((r) => {
            if (r.length > 10){
                Notify.info("Too many matches found. Please enter a more specific name.")
                return
            }else if(r.length === 1){
                refs.countryList.innerHTML = ''
                refs.contryInfo.innerHTML = makeMarkupCountryInfo(r[0])
            }else{
                refs.countryList.innerHTML = makeMarkupList(r)
                refs.contryInfo.innerHTML = ''
            }
        })
        .catch(e => {
            Notify.failure('Oops, there is no country with that name')
        });
    }else {
        refs.countryList.innerHTML = ''
        refs.contryInfo.innerHTML = ''
    }
}

function makeMarkupList(arr){
    return arr.map(makeMarkupListElement).join('')
}

function makeMarkupListElement({name: {official},flags:{svg}}){
    // const {capital, name: {official},flags:{svg},languages} = obj;
    // console.log(capital.join(' '),official,svg, Object.values(languages).join(', '));
    return `
<li>    
    <img src = "${svg}" alt="${official} flag" width="24" height="24"/>
    <b>${official}</b>
</li>`
}

function makeMarkupCountryInfo({capital, name: {official}, flags:{svg}, languages, population}){
    return `
<span>
    <img src = "${svg}" alt="${official} flag" width="24" height="24"/>
    <h2>${official}</h2>
</span>
<p><b>Capital: </b>${capital.join(' ')}</p>
<p><b>Population: </b>${population}</p>
<p><b>Languages: </b>${Object.values(languages).join(', ')}</p>`
}





// fetch('https://httpstat.us/404')
//     .then(function(){
//       console.log('200 OK');
//     }).catch(function(){
//       console.console.log('404 Not Found');
//     })

// console.log(searchBox);

// try {
//     const url = `https://restcountries.com/v3.1/name/xfgfds?fields=name.official,capital,population,flags.svg,languages`;
//     const response = await fetch(url);
//     console.log(response);
//   } catch (error) {
//     // DOMException: The user aborted a request.
//     console.log('Error: ', error)
//   }