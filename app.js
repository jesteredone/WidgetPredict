// CONFIGURACIÓN: Tu amigo debe completar estos dos datos
const miCanal = "creador"; 
const oAuthToken = "oauth:ESCRIBE_AQUÍ_EL_TOKEN"; 

const contenedor = document.getElementById("contenedor-apuesta");
const barraSi = document.getElementById("progreso-si");
const barraNo = document.getElementById("progreso-no");
const textoSi = document.getElementById("porcentaje-si");
const textoNo = document.getElementById("porcentaje-no");
const puntosSiCont = document.getElementById("puntos-si");
const puntosNoCont = document.getElementById("puntos-no");
const tituloH2 = document.getElementById("titulo");

// Función para actualizar las barras y números visualmente
function actualizarDuelo(puntosSi, puntosNo) {
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
}

// SECCIÓN DE EVENTOS REALES DE TWITCH
// Este evento se dispara cada vez que alguien apuesta o inicia una predicción
ComfyJS.onPrediction = ( (event) => {
    // Hace visible el widget
    contenedor.classList.remove("oculto");
    contenedor.classList.add("mostrar");
    
    // Actualiza el título con el nombre de la predicción de Twitch
    tituloH2.innerText = event.title.toUpperCase();
    
    // Captura los puntos de las dos opciones
    const puntosSi = event.outcomes[0].channel_points || 0;
    const puntosNo = event.outcomes[1].channel_points || 0;
    
    actualizarDuelo(puntosSi, puntosNo);
});

// Este evento se dispara cuando la predicción termina (se cierran apuestas)
ComfyJS.onPredictionEnd = ( (event) => {
    // Espera 10 segundos y luego oculta el widget
    setTimeout(() => {
        contenedor.classList.add("oculto");
        contenedor.classList.remove("mostrar");
    }, 10000);
});

// Inicialización de la conexión con Token de seguridad
if(miCanal !== "creador" && oAuthToken !== "") {
    ComfyJS.Init(miCanal, oAuthToken); 
}

// Mantenemos la simulación manual por si quieres probar el diseño haciendo clic
document.body.addEventListener("click", () => {
    contenedor.classList.toggle("mostrar");
    contenedor.classList.toggle("oculto");
    actualizarDuelo(Math.floor(Math.random() * 10000), Math.floor(Math.random() * 10000));
});
