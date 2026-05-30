// CONFIGURACIÓN
const miCanal = "creador"; 
const oAuthToken = "oauth:PEGA_AQUI_EL_TOKEN_DE_LA_FOTO"; 

// Referencias a los elementos visuales
const contenedor = document.getElementById("contenedor-apuesta");
const barraSi = document.getElementById("progreso-si");
const barraNo = document.getElementById("progreso-no");
const textoSi = document.getElementById("porcentaje-si");
const textoNo = document.getElementById("porcentaje-no");
const puntosSiCont = document.getElementById("puntos-si");
const puntosNoCont = document.getElementById("puntos-no");
const tituloH2 = document.getElementById("titulo");

// Función para mover las barras y actualizar porcentajes
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

// ESCUCHADOR DE EVENTOS DE TWITCH
ComfyJS.onPrediction = ( (event) => {
    // Cuando hay una predicción, mostramos el widget
    contenedor.classList.remove("oculto");
    contenedor.classList.add("mostrar");
    
    tituloH2.innerText = event.title.toUpperCase();
    
    const puntosSi = event.outcomes[0].channel_points || 0;
    const puntosNo = event.outcomes[1].channel_points || 0;
    
    actualizarDuelo(puntosSi, puntosNo);
});

// Ocultar widget al finalizar (10 segundos después)
ComfyJS.onPredictionEnd = ( (event) => {
    setTimeout(() => {
        contenedor.classList.add("oculto");
        contenedor.classList.remove("mostrar");
    }, 10000); 
});

// INICIALIZACIÓN
if(miCanal !== "creador" && oAuthToken !== "oauth:PEGA_AQUI_EL_TOKEN_DE_LA_FOTO") {
    ComfyJS.Init(miCanal, oAuthToken);
}

// PRUEBA MANUAL: Si haces clic en cualquier parte de la página, se activa una prueba
document.body.addEventListener("click", () => {
    contenedor.classList.toggle("mostrar");
    contenedor.classList.toggle("oculto");
    actualizarDuelo(Math.floor(Math.random() * 5000), Math.floor(Math.random() * 5000));
});
