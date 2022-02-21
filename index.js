const myApiKey = '85812df68546b272fcaa70610402a638';

const ubicacion = posicion => {
    const {latitude, longitude} = posicion.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=es&appid=${myApiKey}`)
        .then(response => response.json())
        .then(datos => datosDeClima(datos));
}

const datosDeClima = datos => {
    const climaInfo = {
        region: datos.name,
        pais: datos.sys.country,
        temperatura: `${datos.main.temp} °C`,
        clima: `Clima: ${datos.weather[0].description}`,
        humedad: `Humedad: ${datos.main.humidity}%`,
        presion: `Presion: ${datos.main.pressure} hPa`,
        viento: `Viento: ${datos.wind.speed} m/s`,
        fecha: 'Fecha: ' + fechaActual(),
    }

    Object.keys(climaInfo).forEach(key => {
        modificarTexto(key, climaInfo[key]);
    });
}

const modificarTexto = (elemento, texto) => {
    document.getElementById(elemento).textContent = texto;
}

const fechaActual = () => {
    let fechaAct = new Date();
    return `${fechaAct.getDate()}/${( '0' + (fechaAct.getMonth() + 1)).slice(-2)}/${fechaAct.getFullYear()}`;
}

const carga = () => {
    navigator.geolocation.getCurrentPosition(ubicacion);
}