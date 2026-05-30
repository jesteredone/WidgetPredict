const miCanal = "TU_USUARIO_DE_TWITCH"; 

const contenedor = document.getElementById("contenedor-apuesta");
const barraSi = document.getElementById("progreso-si");
const barraNo = document.getElementById("progreso-no");
const textoSi = document.getElementById("porcentaje-si");
const textoNo = document.getElementById("porcentaje-no");
const puntosSiCont = document.getElementById("puntos-si");
const puntosNoCont = document.getElementById("puntos-no");

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

// Inicializar ComfyJS
if(miCanal !== "TU_USUARIO_DE_TWITCH") {
    ComfyJS.Init(miCanal);
}

// Simulación de prueba al hacer clic en el widget dentro de OBS
document.body.addEventListener("click", () => {
    contenedor.classList.toggle("mostrar");
    contenedor.classList.toggle("oculto");
    actualizarDuelo(Math.floor(Math.random() * 10000), Math.floor(Math.random() * 10000));
});
