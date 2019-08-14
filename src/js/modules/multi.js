import { getIcon, toCelFah } from '../utils/utils'

let weatherList = [];
let unit = "us";

// cache the DOM
const $wlist = document.querySelector('.wlist');

export const setMultiWeather = newList => {
    weatherList = newList;
    render();
}

const getDayOfWeek = dayIndex => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[dayIndex];
}

const render = _ => {
    let markup = "";
    for (let i = 0; i < 5; i++) {
        const highTemp = weatherList[i].temperatureHigh;
        const lowTemp = weatherList[i].temperatureLow;
        // * 1000 to get miliseconds 
        const currentDayIndex = new Date(weatherList[i].time * 1000).getDay();
        markup += `
            <div class="wlist__item>
                <img src="${getIcon(weatherList[i].icom)}" class="wlist__icon">
                <div class="wlist__range">
                ${toCelFah(highTemp, unit)}/${toCelFah(lowTemp, unit)}
                </div>
                <div class="wlist__day>
                ${getDayOfWeek(currentDayIndex)}
                </div>
            </div>    
            `
    }
    $wlist.innerHTML = markup;
}