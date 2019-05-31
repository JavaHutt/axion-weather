const root              = document.documentElement;
const body              = document.querySelector('.body');
const time              = document.querySelector('#time');
const temp              = document.querySelector('#temp');
const feelsLike         = document.querySelector('#feelsLike');
const windSpeed         = document.querySelector('#windSpeed');
const cloudCover        = document.querySelector('#cloudCover');
const pressure          = document.querySelector('#pressure');
const humidity          = document.querySelector('#humidity');
const windDirection     = document.querySelector('#windDirection');
const currentIcon       = document.querySelector('.current__top-icon');
const currentCondition  = document.querySelector('.current__condition');
const forecastHeader    = document.querySelector('.forecast__header');
const forecastContainer = document.querySelector('.forecast__container');
const deployment        = document.querySelector('#deployment');

const icons = {
    'clear-day': '<i class="wi wi-day-sunny"></i>',
    'clear-night': '<i class="wi wi-night-clear"></i>',
    'rain': '<i class="wi wi-rain"></i>',
    'snow': '<i class="wi wi-snow"></i>',
    'sleet': '<i class="wi wi-sleet"></i>',
    'wind': '<i class="wi wi-strong-wind"></i>',
    'fog': '<i class="wi wi-fog"></i>',
    'cloudy': '<i class="wi wi-cloudy"></i>',
    'partly-cloudy-day': '<i class="wi wi-day-cloudy"></i>',
    'partly-cloudy-night': '<i class="wi wi-night-alt-partly-cloudy"></i>',
}

const background = {
    'clear-day': 'images/bg/sun.jpeg',
    'clear-night': 'images/bg/sun.jpeg',
    'rain': 'images/bg/rain.png',
    'snow': 'images/bg/snow.jpg',
    'sleet': 'images/bg/snow.jpg',
    'wind': 'images/bg/wind.jpg',
    'fog': 'images/bg/fog.png',
    'cloudy': 'images/bg/clouds.jpg',
    'partly-cloudy-day': 'images/bg/clouds.jpg',
    'partly-cloudy-night': 'images/bg/clouds.jpg',
}

const filters = {
    integer: function(value) {
        return value.toFixed(0);
    },
    decimal: function(value) {
        let result = Number(value.toFixed(1));

        if (result[result.length - 1] != 0) {
            return result;
        } else {
            return result.toFixed(0);
        }
    },
    capitalize: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    percentage: function(value) {
        return (value * 100).toFixed(0);
    },
    mbToMm: function(value) {
        return (value * 0.75006).toFixed(0);
    },
    kphToMs: function(value) {
        return (value * 0.27777777777778).toFixed(1);
    },
    direction: function(value) {
        const north = 'С';
        const east = 'В';
        const south = 'Ю';
        const west = 'З';
        const northeast = 'СВ';
        const southeast = 'ЮВ';
        const southwest = 'ЮЗ';
        const northwest = 'СЗ';

        if ((value >= 337.5 && value <= 360) || (value >= 0 && value < 22.5)) {
            return north;
        }
        if (value >= 22.5 && value < 67.5) {
            return northeast;
        }
        if (value >= 67.5 && value < 112.5) {
            return east;
        }
        if (value >= 112.5 && value < 157.5) {
            return southeast;
        }
        if (value >= 112.5 && value < 202.5) {
            return south;
        }
        if (value >= 202.5 && value < 247.5) {
            return southwest;
        }
        if (value >= 247.5 && value < 292.5) {
            return west;
        }
        if (value >= 292.5 && value < 337.5) {
            return northwest;
        }
    }
}

/**
 * Получение текущей даты в формате "1 января 1970 г."
 * @return {string}
 */
const getCurrentDate = () => {
    const dt      = new Date();
    const date    = dt.getDate();
    const month   = dt.getMonth();
    const year    = dt.getFullYear();
    let result    = '';

    const months = {
        0: 'января',
        1: 'февраля',
        2: 'марта',
        3: 'апреля',
        4: 'мая',
        5: 'июня',
        6: 'июля',
        7: 'августа',
        8: 'сентября',
        9: 'октября',
        10: 'ноября',
        11: 'декабря'
    }

    result = `${date} ${months[month]} ${year} г.`;
    return result;
}

/**
 * Получение строки для прогноза на следующие дни в формате "Понедельник, 1"
 * @param {number} Время в unix-формате
 * @return {string}
 */
const getForecastDate = unix => {
    const dt   = new Date(unix*1000);
    const day  = dt.getDay();
    const date = dt.getDate();
    let result = '';

    const week = {
        0: 'Воскресенье',
        1: 'Понедельник',
        2: 'Вторник',
        3: 'Среда',
        4: 'Четверг',
        5: 'Пятница',
        6: 'Суббота',
    }

    result = `${week[day]}, ${date}`;
    return result;
}

document.addEventListener('DOMContentLoaded', () => {
    time.textContent = getCurrentDate();
    getForecast().then(result => {
        // Текущая погода
        const currently = result.data.currently;

        deployment.style.backgroundImage = `url(${background[currently.icon]})`;
        temp.textContent = filters.decimal(currently.temperature);
        feelsLike.textContent = filters.decimal(currently.apparentTemperature);
        windSpeed.textContent = filters.decimal(currently.windSpeed);
        cloudCover.textContent = filters.percentage(currently.cloudCover);
        pressure.textContent = filters.mbToMm(currently.pressure);
        humidity.textContent = filters.percentage(currently.humidity);
        windDirection.textContent = filters.direction(currently.windBearing);        
        currentIcon.insertAdjacentHTML('beforeend', icons[currently.icon]);
        currentCondition.textContent = currently.summary;
        currently.icon == 'snow' ? root.style.setProperty('--text-color', '#000000') : root.style.setProperty('--text-color', '#ffffff');

        // Прогноз на 7 дней
        forecastHeader.textContent = result.data.daily.summary;
        for (let i = 1; i <= 7; i++) {
            const forecast    = result.data.daily.data[i];
            let time      = getForecastDate(forecast.time);
            let icon      = icons[forecast.icon];
            let temp      = filters.decimal(forecast.temperatureHigh);
            let feelsLike = filters.decimal(forecast.apparentTemperatureHigh);
            let summary   = forecast.summary;

            let html = ` <section class="forecast__item">
                            <time class="forecast__item-time">${time}</time>
                            <div class="forecast__item-icon">${icon}</div>
                            <p><span class="forecast__item-temp">${temp}</span>°<span class="forecast__item-feelslike">${feelsLike}</span>°</p>
                            <p class="forecast__item-condition">${summary}</p>
                        </section>`;

            forecastContainer.insertAdjacentHTML('beforeend', html);
        }
    }).catch(error => {
        console.log(error);
    })
    .finally(() => {
        // const params = new URLSearchParams();

        // params.append('html', deployment.outerHTML);
        // deployHTML(params);
    });
})
