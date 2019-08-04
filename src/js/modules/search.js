let address = "Nieuw Vennep";

// cache DOM; BEM style
const $searchForm = document.querySelector(".search__form");
const $searchInput = document.querySelector(".search__input");
const $searchCity = document.querySelector(".search__city");
const $spinnerWrapper = document.querySelector(".spinner-wrapper");

export const initSearch = () => {
    console.log("Hi this is search module speaking");
    bindSearchEvents();
} 

const bindSearchEvents = () => {
    $searchForm.addEventListener("submit", e => {
        e.preventDefault();
        $searchInput.classList.toggle("search__input--open");
        $searchInput.focus();
        if ($searchInput.value === "" ) return;
        address = $searchInput.value;
        $searchInput.value = "";
        render();
    })
} 

const render = () => {
    $searchCity.innerHTML = address;
}