import { setCurrentWeather } from './current';
import { setMultiWeather } from './multi';
import { fahToKel } from '../utils/utils'

let address = "Nieuw Vennep";

// cache DOM; BEM style
const $searchForm = document.querySelector(".search__form");
const $searchInput = document.querySelector(".search__input");
const $searchCity = document.querySelector(".search__city");
const $spinnerWrapper = document.querySelector(".spinner-wrapper");

const GEOCODE_KEY = "tbd";
const DARK_SKY_KEY ="1234";
// Use https://cors-anywhere.herokuapp.com/ in front of webaddress to act as proxy server.
const CORS = "https://cors-anywhere.herokuapp.com/";

export const initSearch = () => {
    console.log("Hi this is search module speaking");
    bindSearchEvents();
    updateWeather(address);
}; 

const bindSearchEvents = () => {
    $searchForm.addEventListener("submit", e => {
        e.preventDefault();
        $searchInput.classList.toggle("search__input--open");
        $searchInput.focus();
        if ($searchInput.value === "" ) return;
        address = $searchInput.value;
        $searchInput.value = "";
        updateWeather(address);
        render();
    });
}; 

const updateWeather = async (query) => {
    $spinnerWrapper.classList.toggle("spinner-wrapper--active");
    const { lat, lng } = await getLatLng(address);
    const weatherData = await getWeatherData(lat, lng);
    $spinnerWrapper.classList.toggle("spinner-wrapper--active");
    
    const weatherCurrent = weatherData.currently;
    weatherCurrent.temperature = fahToKel(weatherCurrent.temperature);
    setCurrentWeather(weatherCurrent);

    const weatherMulti = weatherData.daily.data.map(elem => {
        elem.temperatureHigh = fahToKel(elem.temperatureHigh);
        elem.temperatureLow = fahToKel(elem.temperatureLow);
        return elem;
    });

    // Add properties to weatherMulti since its data uses different properties. This causes missing data when displaying multi als current in the app.
    weatherMulti[0].temperature = weatherCurrent.temperature;
    weatherMulti[0].summary = weatherCurrent.summary;

    setMultiWeather(weatherMulti);
}

const getWeatherData = async (query) => {
    const reqLink = `${CORS}/https://api.darksky.net/forecast/${DARK_SKY_KEY}/${lat},${lng}`;
    const fetchData = await fetch(reqLink);
    const parsed = await fetchData.json();
    return parsed;
}

// Get lat long from Google Geocoding API.
const getLatLng = async (query) => {
    const reqLink =
        `https://maps.googleapis.com/maps/api/geocode/json?address=4{query}&key=${GEOCODE_KEY}`;
    const fetchData = await fetch(reqLink);
    const parsed = await fetchData.json();
    const latLng = {
        lat: parsed[0].geometry.location.lat,
        lng: parsed[0].geometry.location.lng
    };
    return latLng;
};

const render = () => {
    $searchCity.innerHTML = address;
}