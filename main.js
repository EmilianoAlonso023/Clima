const api_key='95f9a8b5c6654d7c672e2eea9a125391'

const fetchData = position => {
    const {latitude, longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${api_key}`)
    .then(response => response.json())
    .then(data => setWeatherData(data))
   
}
const setWeatherData = data => {
    console.log(data);
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature:data.main.temp,
        date: getDate(),
    }

    Object.keys(weatherData).forEach( key => {
        document.getElementById(key).textContent = weatherData[key];

    });

   cleanUp();

}

const cleanUp = () => {
    let container = document.getElementById('container');
    let loader = document.getElementById('loader');

    loader.style.display = 'none';
    container.style.display = 'flex';

}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${ ('0' +(date.getMonth() +1)).slice(-2)}-${date.getFullYear()}`;
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
} 