const miCanal = "creador"; 

const contenedor = document.getElementById("contenedor-apuesta");
const barraSi = document.getElementById("progreso-si");
const barraNo = document.getElementById("progreso-no");
const textoSi = document.getElementById("porcentaje-si");
const textoNo = document.getElementById("porcentaje-no");
const puntosSiCont = document.getElementById("puntos-si");
const puntosNoCont = document.getElementById("puntos-no");
const bandoSiPuntos = document.getElementById("bando-si-puntos");
const bandoNoPuntos = document.getElementById("bando-no-puntos");
const timerHtml = document.getElementById("tiempo");
const labelOpcionSi = document.getElementById("texto-opcion-si");
const labelOpcionNo = document.getElementById("texto-opcion-no");

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

function limpiarResultados() {
    [barraSi, barraNo, bandoSiPuntos, bandoNoPuntos].forEach(el => el.classList.remove("ganador", "perdedor"));
}

// Lógica de Twitch (Solo se activará en el OBS de "creador")
ComfyJS.Init(miCanal);

// (Opcional: Si quieres probarlo tú, toca la pantalla)
document.body.addEventListener("click", () => {
    limpiarResultados();
    contenedor.className = "mostrar";
    actualizarDuelo(5000, 2000);
});
