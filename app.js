[span_0](start_span)// CONFIGURACIÓN[span_0](end_span)
const miCanal = "creador"; 
const oAuthToken = "oauth:PEGA_AQUI_EL_TOKEN_DE_LA_FOTO"; 

[span_1](start_span)const contenedor = document.getElementById("contenedor-apuesta");[span_1](end_span)
[span_2](start_span)const barraSi = document.getElementById("progreso-si");[span_2](end_span)
[span_3](start_span)const barraNo = document.getElementById("progreso-no");[span_3](end_span)
[span_4](start_span)const textoSi = document.getElementById("porcentaje-si");[span_4](end_span)
[span_5](start_span)const textoNo = document.getElementById("porcentaje-no");[span_5](end_span)
[span_6](start_span)const puntosSiCont = document.getElementById("puntos-si");[span_6](end_span)
[span_7](start_span)const puntosNoCont = document.getElementById("puntos-no");[span_7](end_span)
[span_8](start_span)const tituloH2 = document.getElementById("titulo");[span_8](end_span)
const nombreOpcion1 = document.getElementById("nombre-opcion-1");
const nombreOpcion2 = document.getElementById("nombre-opcion-2");
const timerDisplay = document.getElementById("timer-display");

let intervaloTiempo;

function actualizarDuelo(puntosSi, puntosNo, nombre1, nombre2) {
    [span_9](start_span)const total = puntosSi + puntosNo;[span_9](end_span)
    [span_10](start_span)let porcSi = 50, porcNo = 50;[span_10](end_span)

    [span_11](start_span)if (total > 0) {[span_11](end_span)
        [span_12](start_span)porcSi = Math.round((puntosSi / total) * 100);[span_12](end_span)
        [span_13](start_span)porcNo = 100 - porcSi;[span_13](end_span)
    }
    
    [span_14](start_span)barraSi.style.width = porcSi + "%";[span_14](end_span)
    [span_15](start_span)barraNo.style.width = porcNo + "%";[span_15](end_span)
    [span_16](start_span)textoSi.innerText = porcSi + "%";[span_16](end_span)
    [span_17](start_span)textoNo.innerText = porcNo + "%";[span_17](end_span)
    [span_18](start_span)puntosSiCont.innerText = puntosSi.toLocaleString() + " PTS";[span_18](end_span)
    [span_19](start_span)puntosNoCont.innerText = puntosNo.toLocaleString() + " PTS";[span_19](end_span)

    // CAMBIO FORZADO DE NOMBRES
    nombreOpcion1.innerText = nombre1 ? nombre1.toUpperCase() : "OPCIÓN A";
    nombreOpcion2.innerText = nombre2 ? nombre2.toUpperCase() : "OPCIÓN B";
}

function iniciarCuentaAtras(segundos) {
    clearInterval(intervaloTiempo);
    let tiempoRestante = segundos;
    timerDisplay.innerText = `QUEDAN: ${tiempoRestante}S`;
    
    intervaloTiempo = setInterval(() => {
        tiempoRestante--;
        if (tiempoRestante <= 0) {
            clearInterval(intervaloTiempo);
            timerDisplay.innerText = "TIEMPO AGOTADO";
        } else {
            timerDisplay.innerText = `QUEDAN: ${tiempoRestante}S`;
        }
    }, 1000);
}

[span_20](start_span)// EVENTOS DE TWITCH[span_20](end_span)
ComfyJS.onPrediction = ( (event) => {
    [span_21](start_span)contenedor.classList.remove("oculto");[span_21](end_span)
    [span_22](start_span)contenedor.classList.add("mostrar");[span_22](end_span)
    [span_23](start_span)tituloH2.innerText = event.title.toUpperCase();[span_23](end_span)
    
    const pSi = event.outcomes[0].channel_points || [span_24](start_span)0;[span_24](end_span)
    const pNo = event.outcomes[1].channel_points || [span_25](start_span)0;[span_25](end_span)
    const n1 = event.outcomes[0].title;
    const n2 = event.outcomes[1].title;
    
    actualizarDuelo(pSi, pNo, n1, n2);
    if(event.prediction_window_seconds) iniciarCuentaAtras(event.prediction_window_seconds);
});

[span_26](start_span)ComfyJS.onPredictionEnd = ( (event) => {[span_26](end_span)
    [span_27](start_span)setTimeout(() => {[span_27](end_span)
        [span_28](start_span)contenedor.classList.add("oculto");[span_28](end_span)
        [span_29](start_span)contenedor.classList.remove("mostrar");[span_29](end_span)
    }, 10000); 
});

[span_30](start_span)if(miCanal === "creador" && oAuthToken !== "oauth:PEGA_AQUI_EL_TOKEN_DE_LA_FOTO") {[span_30](end_span)
    [span_31](start_span)ComfyJS.Init(miCanal, oAuthToken);[span_31](end_span)
}

[span_32](start_span)// CLICK PARA PRUEBA MANUAL[span_32](end_span)
document.body.addEventListener("click", () => {
    [span_33](start_span)contenedor.classList.toggle("mostrar");[span_33](end_span)
    [span_34](start_span)contenedor.classList.toggle("oculto");[span_34](end_span)
    // Pasamos nombres específicos en la prueba
    actualizarDuelo(2500, 7500, "EL CREADOR", "EL CHAT");
    iniciarCuentaAtras(30);
});
