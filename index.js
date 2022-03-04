//FETCH DE API
const ubicacion = posicion => {
    const {latitude, longitude} = posicion.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=es&appid=${keyPersonal}`)
        .then(response => response.json())
        .then(datos => datosDeClima(datos))
        .catch(error => console.log(error))
}

//OBJETO CON LOS DATOS A UTILIZAR
const datosDeClima = datos => {
    const climaInfo = {
        region: datos.name,
        temperatura: `Temperatura: ${datos.main.temp} °C`,
        clima: `Clima: ${datos.weather[0].description.toUpperCase()}`,
        humedad: `Humedad: ${datos.main.humidity}%`,
        presion: `Presion: ${datos.main.pressure} hPa`,
        viento: `Viento: ${datos.wind.speed} m/s`,
        fecha: 'Día: ' + fechaActual(),
    }

    Object.keys(climaInfo).forEach(key => {
        modificarTexto(key, climaInfo[key]);
    });

    //OBTENER HORA ACTUAL, AMANECER Y ANOCHECER
    const horaDelDia = () => {
        //HORA ACTUAL
        let horaTimeStamp = datos.dt;
        let horaApi = new Date(horaTimeStamp * 1000);

        //HORA AMANECER
        let amanecerTimeStamp = datos.sys.sunrise;
        let amanecerApi = new Date(amanecerTimeStamp * 1000);

        //HORA ANOCHECER
        let anochecerTimeStamp = datos.sys.sunset;
        let anochecerApi = new Date(anochecerTimeStamp * 1000);

        //SI ES DE DIA...
        if (horaApi >= amanecerApi && horaApi <= anochecerApi) {
            //MODIFICACION DE ICONOS Y BACKGROUND
            const iconos = () => {
                let iconoClima = document.getElementById('iconoAnimado');
                switch (datos.weather[0].main) {
                    case 'Thunderstorm':
                        iconoClima.src='animated/thunder.svg';
                        document.body.style.backgroundImage = 'url(background/day/Storm-Skies.jpg)';
                        break;
                    case 'Drizzle':
                        iconoClima.src='animated/rainy-4.svg';
                        document.body.style.backgroundImage = 'url(background/day/Drizzle-Skies.jpg)';
                        break;
                    case 'Rain':
                        iconoClima.src='animated/rainy-7.svg';
                        document.body.style.backgroundImage = 'url(background/day/Rain-Skies.jpg)';
                        break;
                    case 'Snow':
                        iconoClima.src='animated/snowy-6.svg';
                        document.body.style.backgroundImage = 'url(background/day/Snow-Skies.jpg)';
                        break;
                    case 'Clear':
                        iconoClima.src='animated/day.svg';
                        document.body.style.backgroundImage = 'url(background/day/Sunny-Skies.jpg)';
                        break;
                    case 'Clouds':
                        iconoClima.src='animated/cloudy.svg';
                        document.body.style.backgroundImage = 'url(background/day/Cloud-Skies.jpg)';
                        break;
                }
            }
            iconos();
        }
        
        //SI ES DE NOCHE...
        else {
            //MODIFICACION DE ICONOS Y BACKGROUND
            const iconos = () => {
                let iconoClima = document.getElementById('iconoAnimado');
                switch (datos.weather[0].main) {
                    case 'Thunderstorm':
                        iconoClima.src='animated/thunder.svg';
                        document.body.style.backgroundImage = 'url(background/night/Night-Storm.jpg)';
                        break;
                    case 'Drizzle':
                        iconoClima.src='animated/rainy-4.svg';
                        document.body.style.backgroundImage = 'url(background/night/Night-Drizzle.jpg)';
                        break;
                    case 'Rain':
                        iconoClima.src='animated/rainy-6.svg';
                        document.body.style.backgroundImage = 'url(background/night/Night-Rain.jpg)';
                        break;
                    case 'Snow':
                        iconoClima.src='animated/snowy-6.svg';
                        document.body.style.backgroundImage = 'url(background/night/Night-Snow.png)';
                        break;
                    case 'Clear':
                        iconoClima.src='animated/night.svg';
                        document.body.style.backgroundImage = 'url(background/night/Night-Skies.jpg)';
                        break;
                    case 'Clouds':
                        iconoClima.src='animated/cloudy-night-3.svg';
                        document.body.style.backgroundImage = 'url(background/night/Night-Cloud.jpg)';
                        break;
                }
            }
            iconos();
        } 
    }
    //LLAMADA DE FUNCIONES
    horaDelDia();
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

const keyPersonal = '85812df68546b272fcaa70610402a638';