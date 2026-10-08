// ==========================================
// BATTLE WORD EDUCATION - LÓGICA DE JUEGO Y BANCO DE PREGUNTAS EXTENDIDO
// ==========================================

const gameState = {
    pantallaActual: 1,
    bandoSeleccionado: "13 Colonias", // Default
    puntuacion: 0,
    provinciasTomadas: 0,
    provinciasPerdidas: 0,
    recursos: 100,
    apoyoPopular: 50,
    preguntaActualIndex: 0,
    bancoActivo: [],
    logros: {
        conocedor: false,
        defensor: false,
        experto: false
    }
};

// ==========================================
// BANCO DE PREGUNTAS - 13 COLONIAS (PATRIOTAS)
// ==========================================
const preguntas13Colonias = [
    {
        anio: 1773,
        pregunta: "¿Qué protesta patriota contra los impuestos británicos al té ocurrió en el puerto de Boston en diciembre de 1773?",
        opciones: [
            "A. El Motín del Té (Boston Tea Party)",
            "B. La Masacre de Boston",
            "C. La Batalla de Bunker Hill",
            "D. El Congreso Continental"
        ],
        correcta: 0,
        explicacion: "Los colonos arrojaron cargamentos de té al mar en protesta por la Ley del Té y los impuestos sin representación."
    },
    {
        anio: 1775,
        pregunta: "¿Qué enfrentamientos armados de abril de 1775 en Massachusetts iniciaron formalmente la Guerra de Independencia?",
        opciones: [
            "A. Las Batallas de Lexington y Concord",
            "B. La Batalla de Yorktown",
            "C. La Toma de Fort Ticonderoga",
            "D. El Sitio de Quebec"
        ],
        correcta: 0,
        explicacion: "Conocidos como 'el disparo escuchado en todo el mundo', dieron inicio al conflicto armado."
    },
    {
        anio: 1776,
        pregunta: "¿Qué influyente folleto publicado por Thomas Paine a inicios de 1776 motivó a los colonos a buscar la independencia total?",
        opciones: [
            "A. Sentido Común (Common Sense)",
            "B. Los Artículos de la Confederación",
            "C. La Carta de Derechos",
            "D. El Contrato Social"
        ],
        correcta: 0,
        explicacion: "Paine argumentó en lenguaje sencillo por qué las colonias debían romper lazos con la corona británica."
    },
    {
        anio: 1776,
        pregunta: "¿En qué fecha histórica aprobó el Segundo Congreso Continental la Declaración de Independencia redactada por Thomas Jefferson?",
        opciones: [
            "A. 4 de julio de 1776",
            "B. 16 de diciembre de 1773",
            "C. 3 de septiembre de 1783",
            "D. 19 de abril de 1775"
        ],
        correcta: 0,
        explicacion: "Proclamó solemnemente la creación de una nueva nación soberana independiente de Gran Bretaña."
    },
    {
        anio: 1777,
        pregunta: "¿Qué importante victoria patriota en octubre de 1777 convenció a Francia de unirse formalmente a la guerra como aliada?",
        opciones: [
            "A. La Batalla de Saratoga",
            "B. La Batalla de Trenton",
            "C. La Batalla de Long Island",
            "D. La Batalla de Monmouth"
        ],
        correcta: 0,
        explicacion: "La rendición de las fuerzas británicas en Saratoga demostró que los colonos podían ganar la guerra."
    },
    {
        anio: 1781,
        pregunta: "¿En qué batalla decisiva de 1781 las fuerzas franco-americanas del general Washington sitiaron y rindieron al general Cornwallis?",
        opciones: [
            "A. La Batalla de Yorktown",
            "B. La Batalla de Princeton",
            "C. La Batalla de Brandywine",
            "D. La Batalla de Camden"
        ],
        correcta: 0,
        explicacion: "Fue la última gran batalla de la guerra terrestre, asegurando el triunfo independista."
    }
];

// ==========================================
// BANCO DE PREGUNTAS - REINO UNIDO (BRITÁNICOS)
// ==========================================
const preguntasReinoUnido = [
    {
        anio: 1774,
        pregunta: "Como respuesta al Motín del Té, ¿qué leyes aprobó el Parlamento británico para restablecer el orden e imponer autoridad en Massachusetts?",
        opciones: [
            "A. Las Leyes Coercitivas (o 'Intolerables')",
            "B. La Ley del Timbre (Stamp Act)",
            "C. Las Leyes Declaratorias",
            "D. El Tratado de París"
        ],
        correcta: 0,
        explicacion: "Buscaban castigar a la colonia de Massachusetts y cerrar el puerto de Boston hasta pagar por el té."
    },
    {
        anio: 1775,
        pregunta: "En junio de 1775, la armada y las tropas británicas capturaron una posición táctica cerca de Boston en la sangrienta Batalla de...",
        opciones: [
            "A. Bunker Hill (Breed's Hill)",
            "B. Valley Forge",
            "C. Cowpens",
            "D. Germantown"
        ],
        correcta: 0,
        explicacion: "Aunque los británicos sufrieron graves bajas, lograron tomar las alturas estratégicas de la península."
    },
    {
        anio: 1776,
        pregunta: "En agosto de 1776, las fuerzas británicas al mando del general William Howe derrotaron a Washington y tomaron el control estratégico de...",
        opciones: [
            "A. Nueva York (Long Island)",
            "B. Filadelfia",
            "C. Charleston",
            "D. Savannah"
        ],
        correcta: 0,
        explicacion: "Esta importante victoria le dio a la corona británica una sólida base de operaciones durante gran parte de la guerra."
    },
    {
        anio: 1777,
        pregunta: "¿Qué importante capital colonial y sede del Congreso Continental fue capturada por las fuerzas de la Corona en septiembre de 1777?",
        opciones: [
            "A. Filadelfia",
            "B. Boston",
            "C. Baltimore",
            "D. Richmond"
        ],
        correcta: 0,
        explicacion: "El general Howe ocupó la ciudad tras triunfar en la Batalla de Brandywine."
    },
    {
        anio: 1780,
        pregunta: "Durante la campaña británica en el Sur, ¿qué puerto clave cayó bajo control de la Corona tras un exitoso sitio militar en mayo de 1780?",
        opciones: [
            "A. Charleston",
            "B. Norfolk",
            "C. Wilmington",
            "D. Providence"
        ],
        correcta: 0,
        explicacion: "Fue una de las mayores capturas de tropas coloniales por parte del ejército británico durante el conflicto."
    },
    {
        anio: 1783,
        pregunta: "¿Qué tratado oficial firmado en 1783 puso fin a las hostilidades y reconoció la independencia de las Trece Colonias?",
        opciones: [
            "A. El Tratado de París (1783)",
            "B. La Paz de Versalles",
            "C. El Tratado de Gante",
            "D. El Pacto de Utrecht"
        ],
        correcta: 0,
        explicacion: "Marcó la conclusión formal del conflicto y la redefinición de fronteras internacionales."
    }
];

// ==========================================
// FUNCIONES DE NAVEGACIÓN Y FLUJO
// ==========================================

function cambiarPantalla(numero) {
    gameState.pantallaActual = numero;
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    
    let strID = typeof numero === 'string' ? `pantalla-${numero}` : `pantalla-${numero}`;
    const target = document.getElementById(strID);
                   
    if (target) {
        target.classList.add('active');
    }

    if (numero === 11) {
        actualizarMapa();
    }
}

function iniciarCargaJuego() {
    cambiarPantalla(2);
    let bar = document.getElementById('bar-carga-inicial');
    let width = 0;
    let interval = setInterval(() => {
        width += 25;
        bar.style.width = width + '%';
        if (width >= 100) {
            clearInterval(interval);
            cambiarPantalla(3);
        }
    }, 150);
}

function seleccionarBando(bando) {
    gameState.bandoSeleccionado = bando;
    document.querySelectorAll('.faction-card').forEach(c => c.classList.remove('selected'));
    
    if (bando === 'Reino Unido') {
        document.getElementById('card-uk').classList.add('selected');
        gameState.bancoActivo = [...preguntasReinoUnido];
    } else {
        document.getElementById('card-13').classList.add('selected');
        gameState.bancoActivo = [...preguntas13Colonias];
    }
    
    document.getElementById('btn-continuar-bando').style.display = 'inline-block';
}

function confirmarBando() {
    cambiarPantalla(5);
    let bar = document.getElementById('bar-carga-mision');
    let width = 0;
    let interval = setInterval(() => {
        width += 25;
        bar.style.width = width + '%';
        if (width >= 100) {
            clearInterval(interval);
            cambiarPantalla(6);
        }
    }, 150);
}

function iniciarCuestionario() {
    gameState.preguntaActualIndex = 0;
    cargarPreguntaActual();
}

function cargarPreguntaActual() {
    const qData = gameState.bancoActivo[gameState.preguntaActualIndex];
    if (!qData) {
        evaluarFinal();
        return;
    }

    // Usamos de forma dinámica la Pantalla 7 para mostrar el cuestionario
    cambiarPantalla(7);

    const txtElem = document.getElementById('txt-pregunta-7');
    const container = document.getElementById('opciones-7');
    const anioElem = document.getElementById('txt-anio-mapa');

    if (anioElem) anioElem.innerText = qData.anio;
    if (txtElem) txtElem.innerText = `[AÑO ${qData.anio}] ${qData.pregunta}`;
    
    if (container) {
        container.innerHTML = "";
        qData.opciones.forEach((opc, i) => {
            const btn = document.createElement('button');
            btn.className = 'btn-option';
            btn.innerText = opc;
            btn.onclick = () => responder(i, qData.correcta, qData.explicacion);
            container.appendChild(btn);
        });
    }
}

function responder(seleccion, correcta, explicacion) {
    const esCorrecto = (seleccion === correcta);
    
    if (esCorrecto) {
        gameState.puntuacion += 100;
        gameState.provinciasTomadas += 1;
        gameState.recursos += 50;
        gameState.apoyoPopular = Math.min(100, gameState.apoyoPopular + 15);
        document.getElementById('titulo-resultado').innerText = "¡DECISIÓN CORRECTA!";
        document.getElementById('puntos-obtenidos').innerText = "+100 PUNTOS | +1 RECURSO TERRITORIAL";
    } else {
        gameState.provinciasPerdidas += 1;
        gameState.apoyoPopular = Math.max(0, gameState.apoyoPopular - 10);
        document.getElementById('titulo-resultado').innerText = "¡FALLO TÁCTICO / INCORRECTO!";
        document.getElementById('puntos-obtenidos').innerText = "+0 PUNTOS | FRONTERA DEBILITADA";
    }

    cambiarPantalla(9);
}

function continuarTrasResultado() {
    if (document.getElementById('titulo-resultado').innerText.includes("CORRECTA")) {
        cambiarPantalla("11a");
    } else {
        cambiarPantalla("11b");
    }

    gameState.preguntaActualIndex++;
}

function siguienteTurno() {
    if (gameState.preguntaActualIndex < gameState.bancoActivo.length) {
        cargarPreguntaActual();
    } else {
        evaluarFinal();
    }
}

function actualizarMapa() {
    document.getElementById('txt-bando-mapa').innerText = gameState.bandoSeleccionado;
    document.getElementById('txt-provincias-ganadas').innerText = `TOMASTE: ${gameState.provinciasTomadas} PROVINCIAS`;
    document.getElementById('txt-provincias-perdidas').innerText = `PERDISTE: ${gameState.provinciasPerdidas} PROVINCIAS`;
    document.getElementById('txt-recursos').innerText = `RECURSOS: ${gameState.recursos}`;
    document.getElementById('txt-apoyo').innerText = `APOYO POPULAR: ${gameState.apoyoPopular}%`;

    const mapTerritories = document.getElementById('map-territories');
    if (mapTerritories) {
        mapTerritories.innerHTML = "";

        // Generación dinámica de provincias según el desempeño
        for (let i = 1; i <= 6; i++) {
            const div = document.createElement('div');
            div.className = 'provincia';
            if (i <= gameState.provinciasTomadas) {
                div.innerText = `Provincia ${i}\n(${gameState.bandoSeleccionado})`;
            } else {
                div.className += ' enemiga';
                div.innerText = `Provincia ${i}\n(Frontera Enemiga)`;
            }
            mapTerritories.appendChild(div);
        }
    }

    verificarLogros();
}

function verificarLogros() {
    if (gameState.provinciasTomadas >= 1) {
        gameState.logros.defensor = true;
        const el = document.getElementById('logro-2');
        if (el) el.classList.add('desbloqueado');
    }
    if (gameState.puntuacion >= 300) {
        gameState.logros.conocedor = true;
        gameState.logros.experto = true;
        const l1 = document.getElementById('logro-1');
        const l3 = document.getElementById('logro-3');
        if (l1) l1.classList.add('desbloqueado');
        if (l3) l3.classList.add('desbloqueado');
    }
}

function evaluarFinal() {
    cambiarPantalla(12);
    const bandFinal = document.getElementById('bandera-final');
    if (gameState.provinciasTomadas >= gameState.provinciasPerdidas) {
        document.getElementById('titulo-final').innerText = "¡VICTORIA Y DOMINIO TÁCTICO!";
        document.getElementById('mensaje-final').innerText = `¡HAS LLEVADO A LAS ${gameState.bandoSeleccionado.toUpperCase()} A UN FINAL HISTÓRICO FAVORABLE!`;
        if (bandFinal) bandFinal.innerText = gameState.bandoSeleccionado === "Reino Unido" ? "🇬🇧" : "🇺🇸";
    } else {
        document.getElementById('titulo-final').innerText = "DERROTA O RESULTADO ALTERNATIVO";
        document.getElementById('mensaje-final').innerText = "EL CONTROL TERRITORIAL Y EL APOYO POPULAR SE HAN PERDIDO. ¡INTÉNTALO DE NUEVO!";
        if (bandFinal) bandFinal.innerText = "⚔️";
    }
}

function reiniciarJuego() {
    gameState.puntuacion = 0;
    gameState.provinciasTomadas = 0;
    gameState.provinciasPerdidas = 0;
    gameState.recursos = 100;
    gameState.apoyoPopular = 50;
    gameState.preguntaActualIndex = 0;
    cambiarPantalla(1);
}

window.onload = () => {
    // Banco por defecto inicial
    gameState.bancoActivo = [...preguntas13Colonias];
    cambiarPantalla(1);
};