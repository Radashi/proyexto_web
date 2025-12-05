/* ================== CÓDIGO PARA EL TEST =========================== */

document.addEventListener('DOMContentLoaded', () => {
    
    const pantallaInicio = document.getElementById('pantalla-inicio');
    
    if (!pantallaInicio) return; 

    const preguntas = [
        {
            pregunta: "¿Quién es el fundador de la escudería?",
            opciones: ["Enzo Ferrari", "Dino Ferrari", "Piero Ferrari", "Luigi Ferrari"],
            correcta: 0 // La posición 0 es "Enzo Ferrari"
        },
        {
            pregunta: "¿En qué año ganó Kimi Räikkönen su campeonato?",
            opciones: ["2005", "2008", "2007", "2010"],
            correcta: 2 // 2007
        },
        {
            pregunta: "¿Cuál es el apodo de los fans de Ferrari?",
            opciones: ["Ferraristas", "Tifosi", "Rossos", "Cavallinos"],
            correcta: 1 // Tifosi
        },
        {
            pregunta: "¿Qué piloto tiene más títulos con Ferrari?",
            opciones: ["Niki Lauda", "Juan M. Fangio", "Sebastian Vettel", "Michael Schumacher"],
            correcta: 3 // Schumacher
        },
        {
            pregunta: "¿Cómo se llama el circuito propiedad de Ferrari?",
            opciones: ["Monza", "Imola", "Fiorano", "Mugello"],
            correcta: 2 // Fiorano
        }
    ];
    let preguntaActual = 0;
    let puntaje = 0;

    const pantallaJuego = document.getElementById('pantalla-juego');
    const pantallaFinal = document.getElementById('pantalla-final');
    const btnComenzar = document.getElementById('btn-comenzar');
    const btnSiguiente = document.getElementById('btn-siguiente');
    const btnReiniciar = document.getElementById('btn-reiniciar');
    
    const textoPregunta = document.getElementById('pregunta-texto');
    const contenedorOpciones = document.getElementById('contenedor-opciones');
    const barraProgreso = document.getElementById('progreso-relleno');

    btnComenzar.addEventListener('click', () => {
        pantallaInicio.classList.add('oculto');
        pantallaJuego.classList.remove('oculto');
        mostrarPregunta();
    });

    function mostrarPregunta() {
        resetearEstado();
        let actual = preguntas[preguntaActual];
        textoPregunta.innerText = actual.pregunta;

        actual.opciones.forEach((opcion, index) => {
            const boton = document.createElement('button');
            boton.innerText = opcion;
            boton.classList.add('btn-opcion');
            if (index === actual.correcta) {
                boton.dataset.esCorrecto = true;
            }
            boton.addEventListener('click', seleccionarRespuesta);
            contenedorOpciones.appendChild(boton);
        });

        let porcentaje = ((preguntaActual) / preguntas.length) * 100;
        barraProgreso.style.width = porcentaje + "%";
    }

    function resetearEstado() {
        btnSiguiente.classList.add('oculto');
        while (contenedorOpciones.firstChild) {
            contenedorOpciones.removeChild(contenedorOpciones.firstChild);
        }
    }

    function seleccionarRespuesta(e) {
        const botonSeleccionado = e.target;
        const esCorrecto = botonSeleccionado.dataset.esCorrecto === "true";

        if (esCorrecto) {
            botonSeleccionado.classList.add('correcto');
            puntaje++;
        } else {
            botonSeleccionado.classList.add('incorrecto');
        }

        Array.from(contenedorOpciones.children).forEach(boton => {
            if (boton.dataset.esCorrecto === "true") {
                boton.classList.add('correcto');
            }
            boton.disabled = true; 
        });
        btnSiguiente.classList.remove('oculto');
    }

    btnSiguiente.addEventListener('click', () => {
        preguntaActual++;
        if (preguntaActual < preguntas.length) {
            mostrarPregunta();
        } else {
            mostrarResultados();
        }
    });

    function mostrarResultados() {
        pantallaJuego.classList.add('oculto');
        pantallaFinal.classList.remove('oculto');
        
        document.getElementById('puntaje-final').innerText = puntaje + " / " + preguntas.length;
        
        const mensaje = document.getElementById('mensaje-final');
        if (puntaje === 5) {
            mensaje.innerText = "¡Increíble! Eres un verdadero Tifosi de corazón.";
        } else if (puntaje >= 3) {
            mensaje.innerText = "¡Muy bien! Sabes bastante sobre Ferrari.";
        } else {
            mensaje.innerText = "Te falta un poco de historia.";
        }
    }

    btnReiniciar.addEventListener('click', () => {
        puntaje = 0;
        preguntaActual = 0;
        pantallaFinal.classList.add('oculto');
        pantallaInicio.classList.remove('oculto');
    });

});

/* ===================== formulario ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    
    const formFans = document.getElementById('form-fans');

    if (formFans) {
        
        formFans.addEventListener('submit', function(evento) {
            evento.preventDefault();
            
            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const edad = document.getElementById('edad');
            const pais = document.getElementById('pais');
            const terminos = document.getElementById('terminos');

            if (nombre.value.trim() === "") {
                alert("El campo Nombre no puede estar vacío.");
                nombre.focus();
                return;
            }
            if (!isNaN(nombre.value)) {
                alert("El nombre no puede ser un número. Por favor escribe un nombre real.");
                nombre.value = ""; 
                nombre.focus();
                return;
            }

            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(email.value)) {
                alert("Por favor ingresa un correo electrónico válido.");
                email.focus();
                return;
            }

            if (edad.value === "" || parseInt(edad.value) < 10) {
                alert("Debes ingresar una edad válida (mínimo 10 años).");
                edad.focus();
                return;
            }

            if (pais.value === "") {
                alert("Debes seleccionar un país de la lista.");
                pais.focus();
                return;
            }

            if (!terminos.checked) {
                alert("Es obligatorio aceptar los términos y condiciones para unirte al club.");
                return;
            }

            alert("Bienvenido a la Scuderia Ferrari Club. Tu registro ha sido enviado.");
            
            formFans.reset();
            
            const mensajeExito = document.getElementById('mensaje-exito');
            if(mensajeExito) mensajeExito.classList.remove('oculto');
        });
    }
});