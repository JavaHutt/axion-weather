const API_KEY = '7102c032dfc82cbe484875a41e5ac1a5';
const COORDS_IZHEVSK = '56.8666,53.2094'
const proxy = 'https://cors-anywhere.herokuapp.com/';

const getForecast = () => {
    return axios.get(`${proxy}https://api.darksky.net/forecast/${API_KEY}/${COORDS_IZHEVSK}?&exclude=[minutely,hourly,flags]&lang=ru&units=si`);
}
const deployHTML = params => {
    axios.post('saveHTML.php', params);
}
