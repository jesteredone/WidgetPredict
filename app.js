const miCanal = "creador"; 
const oAuthToken = "oauth:PEGA_AQUI_EL_TOKEN_DE_LA_FOTO"; 

const contenedor = document.getElementById("contenedor-apuesta");
const barraSi = document.getElementById("progreso-si");
const barraNo = document.getElementById("progreso-no");
const textoSi = document.getElementById("porcentaje-si");
const textoNo = document.getElementById("porcentaje-no");
const puntosSiCont = document.getElementById("puntos-si");
const puntosNoCont = document.getElementById("puntos-no");
const tituloH2 = document.getElementById("titulo");
const nombreOpcion1 = document.getElementById("nombre-opcion-1");
const nombreOpcion2 = document.getElementById("nombre-opcion-2");
const timerDisplay = document.getElementById("timer-display");

let intervaloTiempo;

function actualizarDuelo(puntosSi, puntosNo, nombre1, nombre2) {
    const total = puntosSi + puntosNo;
    let porcSi = 50, porcNo = 50;

    if (total > 0) {
        porcSi = Math.round((puntosSi / total) * 100);
        porcNo = 100 - porcSi;
    }
    
    barraSi.style.width = porcSi + "%";
    barraNo.style.width = porcNo + "%";
    textoSi.innerText = porcSi + "%";
    textoNo.innerText = porcNo + "%";
    puntosSiCont.innerText = puntosSi.toLocaleString() + " PTS";
    puntosNoCont.innerText = puntosNo.toLocaleString() + " PTS";

    // Aquí cambiamos los nombres Si/No por los reales
    if(nombre1) nombreOpcion1.innerText = nombre1.toUpperCase();
    if(nombre2) nombreOpcion2.innerText = nombre2.toUpperCase();
}

function iniciarCuentaAtras(segundos) {
    clearInterval(intervaloTiempo);
    let tiempoRestante = segundos;
    
    timerDisplay.innerText = `QUEDAN: ${tiempoRestante}S`;
    
    intervaloTiempo = setInterval(() => {
        tiempoRestante--;
        timerDisplay.innerText = `QUEDAN: ${tiempoRestante}S`;
        if (tiempoRestante <= 0) {
            clearInterval(intervaloTiempo);
            timerDisplay.innerText = "TIEMPO AGOTADO";
        }
    }, 1000);
}

ComfyJS.onPrediction = ( (event) => {
    contenedor.classList.remove("oculto");
    contenedor.classList.add("mostrar");
    
    tituloH2.innerText = event.title.toUpperCase();
    
    const puntosSi = event.outcomes[0].channel_points || 0;
    const puntosNo = event.outcomes[1].channel_points || 0;
    const nombre1 = event.outcomes[0].title;
    const nombre2 = event.outcomes[1].title;
    
    actualizarDuelo(puntosSi, puntosNo, nombre1, nombre2);
    
    // Inicia el cronómetro con el tiempo que Twitch envía
    if(event.prediction_window_seconds) {
        iniciarCuentaAtras(event.prediction_window_seconds);
    }
});

ComfyJS.onPredictionEnd = ( (event) => {
    clearInterval(intervaloTiempo);
    setTimeout(() => {
        contenedor.classList.add("oculto");
        contenedor.classList.remove("mostrar");
    }, 10000); 
});

if(miCanal === "creador" && oAuthToken !== "oauth:PEGA_AQUI_EL_TOKEN_DE_LA_FOTO") {
    ComfyJS.Init(miCanal, oAuthToken);
}

// PRUEBA MANUAL: Ahora incluye nombres y tiempo simulado
document.body.addEventListener("click", () => {
    contenedor.classList.toggle("mostrar");
    contenedor.classList.toggle("oculto");
    actualizarDuelo(
        Math.floor(Math.random() * 5000), 
        Math.floor(Math.random() * 5000),
        "TEAM CALIENTE", 
        "TEAM FRÍO"
    );
    iniciarCuentaAtras(60);
});
