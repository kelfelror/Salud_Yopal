const citaForm = document.getElementById("citaForm");

if (citaForm) {

    citaForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        // =========================
        // OBTENER USUARIO ACTUAL
        // =========================

        const usuarioActual =
            JSON.parse(sessionStorage.getItem("usuario"));

        if (!usuarioActual) {
            alert("Debes iniciar sesión para solicitar una cita.");
            window.location.href = "login.html";
            return;
        }

        // =========================
        // OBTENER DATOS DE LA CITA
        // =========================

        const cita = {

            eps:
                document.getElementById("eps").value,

            especialidad:
                document.getElementById("especialidad").value,

            medico:
                document.getElementById("medico").value,

            fecha:
                document.getElementById("fecha").value,

            hora:
                document.getElementById("hora").value,

            estado:
                document.getElementById("estado").value
        };

        try {

            // =========================
            // ENVIAR CITA AL BACKEND
            // =========================

            const respuesta = await fetch(
                `/api/citas?usuarioId=${usuarioActual.id}`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(cita)
                }
            );

            // =========================
            // COMPROBAR RESPUESTA
            // =========================

            if (!respuesta.ok) {

                const error = await respuesta.text();

                throw new Error(error);
            }

            // =========================
            // OBTENER CITA CREADA
            // =========================

            const citaCreada =
                await respuesta.json();

            // =========================
            // MOSTRAR INFORMACIÓN
            // =========================

            document.getElementById(
                "numeroCita"
            ).textContent =
                citaCreada.id;

            document.getElementById(
                "resumenPaciente"
            ).textContent =
                citaCreada.usuario.nombre;

            document.getElementById(
                "resumenEps"
            ).textContent =
                citaCreada.eps;

            document.getElementById(
                "resumenEspecialidad"
            ).textContent =
                citaCreada.especialidad;

            document.getElementById(
                "resumenMedico"
            ).textContent =
                citaCreada.medico;

            document.getElementById(
                "resumenFecha"
            ).textContent =
                citaCreada.fecha;

            document.getElementById(
                "resumenHora"
            ).textContent =
                citaCreada.hora.substring(0, 5);

            document.getElementById(
                "resumenEstado"
            ).textContent =
                citaCreada.estado;

            // =========================
            // MOSTRAR MENSAJE DE ÉXITO
            // =========================

            document.getElementById(
                "formularioCita"
            ).style.display = "none";

            document.getElementById(
                "mensajeExito"
            ).style.display = "block";

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        } catch (error) {

            console.error(error);

            alert(
                "No se pudo crear la cita: " +
                error.message
            );
        }
    });
}



// =========================
// CARGAR MIS CITAS
// =========================

const listaCitas = document.getElementById("listaCitas");

if (listaCitas) {

    cargarCitas();

}


async function cargarCitas() {

    try {

        // Obtener usuario actual
        const usuarioActual =
            JSON.parse(sessionStorage.getItem("usuario"));

        if (!usuarioActual) {
            listaCitas.innerHTML = `
                <p class="loading">
                    Debes iniciar sesión para ver tus citas.
                </p>
            `;
            return;
        }

        const respuesta =
            await fetch(
                `/api/citas/usuario/${usuarioActual.id}`
            );


        if (!respuesta.ok) {

            throw new Error(
                "No se pudieron cargar las citas"
            );

        }


        const citas =
            await respuesta.json();


        mostrarCitas(citas);


    } catch (error) {

        console.error(error);

        listaCitas.innerHTML = `
            <p class="loading">
                No se pudieron cargar las citas.
            </p>
        `;

    }

}


function mostrarCitas(citas) {

    const sinCitas =
        document.getElementById("sinCitas");


    if (citas.length === 0) {

        listaCitas.style.display = "none";

        sinCitas.style.display = "block";

        return;

    }


    sinCitas.style.display = "none";

    listaCitas.style.display = "block";


    listaCitas.innerHTML = "";


    citas.forEach(function (cita) {

        const tarjeta =
            document.createElement("div");


        tarjeta.classList.add(
            "appointment-card"
        );


        tarjeta.innerHTML = `

            <h3>
                ${cita.especialidad}
            </h3>

            <div class="appointment-info">

                <p>
                    <strong>Paciente:</strong>
                    ${cita.usuario.nombre}
                </p>

                <p>
                    <strong>EPS:</strong>
                    ${cita.eps}
                </p>

                <p>
                    <strong>Médico:</strong>
                    ${cita.medico}
                </p>

                <p>
                    <strong>Fecha:</strong>
                    ${cita.fecha}
                </p>

                <p>
                    <strong>Hora:</strong>
                    ${cita.hora.substring(0, 5)}
                </p>

            </div>

<span class="appointment-status">
    ${cita.estado}
</span>

<div class="appointment-actions">

    <button
        class="btn-modificar"
        data-id="${cita.id}">
        Modificar cita
    </button>

    <button
        class="btn-cancelar"
        data-id="${cita.id}">
        Cancelar cita
    </button>

</div>

        `;


        listaCitas.appendChild(tarjeta);

    });

}

// Usuario actual
const usuarioActual = JSON.parse(sessionStorage.getItem("usuario"));

if (usuarioActual) {
    const nombreUsuario = document.getElementById("nombreUsuario");
    const cedulaUsuario = document.getElementById("cedulaUsuario");

    if (nombreUsuario) {
        nombreUsuario.textContent = usuarioActual.nombre;
    }

    if (cedulaUsuario) {
        cedulaUsuario.textContent = usuarioActual.cedula;
    }
}

// Login
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const correo = document.getElementById("correo").value;
        const password = document.getElementById("password").value;
        const mensajeLogin = document.getElementById("mensajeLogin");

        try {
            const respuesta = await fetch("/api/usuarios/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    correo: correo,
                    password: password
                })
            });

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                mensajeLogin.textContent = datos;
                mensajeLogin.className = "login-message error";
                return;
            }

            // Guardar usuario actual
            sessionStorage.setItem("usuario", JSON.stringify(datos));

            mensajeLogin.textContent = "Inicio de sesión exitoso.";
            mensajeLogin.className = "login-message success";

            // Ir a la página principal
            setTimeout(() => {
                window.location.href = "index.html";
            }, 800);

        } catch (error) {
            console.error(error);

            mensajeLogin.textContent =
                "No se pudo conectar con el servidor.";
            mensajeLogin.className = "login-message error";
        }
    });
}

// =========================
// REGISTRO DE USUARIO
// =========================

const registroForm =
    document.getElementById("registroForm");

if (registroForm) {

    registroForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const usuario = {

                nombre:
                    document.getElementById("nombre").value,

                cedula:
                    document.getElementById("cedula").value,

                telefono:
                    document.getElementById("telefono").value,

                direccion:
                    document.getElementById("direccion").value,

                correo:
                    document.getElementById("correo").value,

                password:
                    document.getElementById("password").value
            };


            const mensajeRegistro =
                document.getElementById(
                    "mensajeRegistro"
                );


            try {

                const respuesta =
                    await fetch(
                        "/api/usuarios/registro",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(usuario)
                        }
                    );


                const datos =
                    await respuesta.json();


                if (!respuesta.ok) {

                    mensajeRegistro.textContent =
                        datos;

                    mensajeRegistro.className =
                        "login-message error";

                    return;
                }


                mensajeRegistro.textContent =
                    "Cuenta creada correctamente.";

                mensajeRegistro.className =
                    "login-message success";


                setTimeout(function () {

                    window.location.href =
                        "login.html";

                }, 1000);


            } catch (error) {

                console.error(error);

                mensajeRegistro.textContent =
                    "No se pudo conectar con el servidor.";

                mensajeRegistro.className =
                    "login-message error";
            }

        }
    );

}

// =========================
// CERRAR SESIÓN
// =========================

const cerrarSesion =
    document.getElementById("cerrarSesion");

if (cerrarSesion) {

    cerrarSesion.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            // Eliminar usuario actual
            sessionStorage.removeItem("usuario");

            // Volver al login
            window.location.href = "login.html";
        }
    );

}

// =========================
// PROTEGER PÁGINA DE CITAS
// =========================

if (window.location.pathname.endsWith("solicitar-cita.html")) {

    const usuarioActual =
        JSON.parse(sessionStorage.getItem("usuario"));

    if (!usuarioActual) {
        window.location.href = "login.html";
    }
}

// =========================
// MENÚ SEGÚN SESIÓN
// =========================

const menuPrincipal =
    document.getElementById("menuPrincipal");

if (menuPrincipal) {

    const usuarioActual =
        JSON.parse(sessionStorage.getItem("usuario"));

    const cerrarSesion =
        document.getElementById("cerrarSesion");


    if (usuarioActual) {

        // Usuario con sesión iniciada
        menuPrincipal.innerHTML = `
            <a href="index.html">Inicio</a>
            <a href="solicitar-cita.html">Solicitar cita</a>
            <a href="mis-citas.html">Mis citas</a>
            <a href="#" id="cerrarSesion">Cerrar sesión</a>
        `;

    } else {

        // Usuario sin sesión
        menuPrincipal.innerHTML = `
            <a href="index.html">Inicio</a>
            <a href="login.html">Iniciar sesión</a>
            <a href="registro.html">Crear cuenta</a>
        `;
    }
}

// =========================
// EVENTO CERRAR SESIÓN
// =========================

document.addEventListener("click", async function (event) {

    if (!event.target.classList.contains("btn-modificar")) {
        return;
    }

    const citaId = event.target.dataset.id;

    try {

        const respuesta = await fetch(`/api/citas/${citaId}`);

        if (!respuesta.ok) {
            throw new Error("No se pudo obtener la cita.");
        }

        const cita = await respuesta.json();

        // Guardar ID de la cita
        document.getElementById("editarCitaId").value = cita.id;

        // Cargar datos actuales
        document.getElementById("editarEps").value = cita.eps;
        document.getElementById("editarEspecialidad").value = cita.especialidad;
        document.getElementById("editarMedico").value = cita.medico;
        document.getElementById("editarFecha").value = cita.fecha;
        document.getElementById("editarHora").value =
            cita.hora.substring(0, 5);

        // Mostrar formulario
        document.getElementById("formularioEdicion").style.display = "block";

        // Ocultar lista mientras se edita
        document.getElementById("listaCitas").style.display = "none";

        // Subir al formulario
        document.getElementById("formularioEdicion")
            .scrollIntoView({
                behavior: "smooth"
            });

    } catch (error) {

        console.error(error);

        alert("No se pudo cargar la información de la cita.");
    }

});

const btnCancelarEdicion = document.getElementById("btnCancelarEdicion");

if (btnCancelarEdicion) {

    btnCancelarEdicion.addEventListener("click", function () {

        document.getElementById("formularioEdicion").style.display = "none";

        document.getElementById("listaCitas").style.display = "block";

    });

}

document.addEventListener("click", async function (event) {

    if (!event.target.classList.contains("btn-cancelar")) {
        return;
    }

    const citaId = event.target.dataset.id;
    const usuarioActual = JSON.parse(sessionStorage.getItem("usuario"));

    if (!usuarioActual) {
        alert("Debes iniciar sesión.");
        return;
    }

    const confirmar = confirm(
        "¿Estás seguro de que deseas cancelar esta cita?"
    );

    if (!confirmar) {
        return;
    }

    try {

        const respuesta = await fetch(
            `/api/citas/${citaId}?usuarioId=${usuarioActual.id}`,
            {
                method: "DELETE"
            }
        );

        if (!respuesta.ok) {
            throw new Error("No se pudo cancelar la cita.");
        }

        cargarCitas();

    } catch (error) {

        console.error(error);

        alert("No se pudo cancelar la cita.");
    }

});