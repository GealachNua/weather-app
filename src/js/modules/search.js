let address = "Nieuw Vennep";

// cache DOM; BEM style
const $searchForm = document.querySelector(".search__form");
const $searchInput = document.querySelector(".search__input");
const $searchCity = document.querySelector(".search__city");
const $spinnerWrapper = document.querySelector(".spinner-wrapper");
const GEOCODE_KEY = "tbd";

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
        getLatLng(address);
        render();
    });
}; 

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