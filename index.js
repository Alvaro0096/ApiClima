//KEY PERSONAL
const myApiKey = '85812df68546b272fcaa70610402a638';

//FETCH DE API
const ubicacion = posicion => {
    const {latitude, longitude} = posicion.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=es&appid=${myApiKey}`)
        .then(response => response.json())
        .then(datos => datosDeClima(datos))
        .catch(error => console.log(error))
}

//OBJETO CON LOS DATOS A UTILIZAR
const datosDeClima = datos => {
    const climaInfo = {
        region: `Barrio: ${datos.name}`,
        temperatura: `Temperatura: ${datos.main.temp} °C`,
        clima: `Clima: ${datos.weather[0].description}`.toUpperCase(),
        humedad: `Humedad: ${datos.main.humidity}%`,
        presion: `Presion: ${datos.main.pressure} hPa`,
        viento: `Viento: ${datos.wind.speed} m/s`,
        fecha: 'Día: ' + fechaActual(),
    }

    Object.keys(climaInfo).forEach(key => {
        modificarTexto(key, climaInfo[key]);
    });

    //MODIFICACION DE ICONOS
    const iconos = () => {
        let iconoClima = document.getElementById('iconoAnimado');
        let letras = document.querySelector('.fuente');
        switch (datos.weather[0].main) {
            case 'Thunderstorm':
                iconoClima.src='animated/thunder.svg';
                document.body.style.backgroundImage = 'url(background/Storm-Skies.jpg)';
                letras.style.color = '#fff';
                break;
            case 'Drizzle':
                iconoClima.src='animated/rain-4.svg';
                document.body.style.backgroundImage = 'url(background/Drizzle-Skies.jpg)';
                letras.style.color = '#000';
                break;
            case 'Rain':
                iconoClima.src='animated/rain-7.svg';
                document.body.style.backgroundImage = 'url(background/Rain-Skies.jpg)';
                letras.style.color = '#fff';
                break;
            case 'Snow':
                iconoClima.src='animated/snowy-6.svg';
                document.body.style.backgroundImage = 'url(background/Snow-Skies.jpg)';
                letras.style.color = '#000';
                break;
            case 'Clear':
                iconoClima.src='animated/day.svg';
                document.body.style.backgroundImage = 'url(background/Sunny-Skies.jpg)';
                letras.style.color = '#000';
                break;
            case 'Clouds':
                iconoClima.src='animated/cloudy.svg';
                document.body.style.backgroundImage = 'url(background/Cloud-Skies.jpg)';
                letras.style.color = '#000';
                break;
        }
    }
    //LLAMADA DE FUNCIONES
    iconos();
    animacionCarga();
}

//MODIFICAR TEXTO CON KEYS
const modificarTexto = (elemento, texto) => {
    document.getElementById(elemento).textContent = texto;
}

//OBTENER FECHA ACTUAL
const fechaActual = () => {
    let fechaAct = new Date();
    return `${fechaAct.getDate()}/${( '0' + (fechaAct.getMonth() + 1)).slice(-2)}/${fechaAct.getFullYear()}`;
}

//PERMITIR LOCALIZACION
const carga = () => {
    navigator.geolocation.getCurrentPosition(ubicacion);
}

//TERMINAR ANIMACION CUANDO FINALIZE LA CARGA DE DATOS
const animacionCarga = () => {
    let loader = document.getElementById('loader');
    let contenedor = document.getElementById('container');

    loader.style.display = 'none';
    contenedor.style.display = 'grid';
}