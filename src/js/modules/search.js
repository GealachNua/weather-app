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
    const { lat, lng } = await getLatLng(address);
    console.log("Here is the result: ");
    console.log(await getWeatherData(lat, lng));

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