/* =========================================
   TEAM CAR WASH
   JAVASCRIPT
========================================= */


/* =========================================
   MENÚ PARA CELULAR
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function () {

        navLinks.classList.toggle("active");

    });


    const links = navLinks.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

        });

    });

}


/* =========================================
   FORMULARIO DE FIDELIZACIÓN
========================================= */

const formulario =
    document.getElementById("formularioCliente");

const mensaje =
    document.getElementById("mensajeFormulario");


if (formulario) {

    formulario.addEventListener("submit", function () {

        if (mensaje) {

            mensaje.innerHTML =
                "⏳ Registrando tus datos...";

            mensaje.style.color =
                "#008bd3";

        }

    });

}


/* =========================================
   RESPUESTA DE GOOGLE APPS SCRIPT
========================================= */

window.addEventListener("message", function (event) {

    const datos = event.data;


    if (!datos || !datos.estado) {
        return;
    }


    if (!mensaje) {
        return;
    }


    /* REGISTRO EXITOSO */

    if (datos.estado === "exito") {

        mensaje.innerHTML =
            "✅ ¡Registro realizado correctamente! Revisa tu correo.";

        mensaje.style.color =
            "#00a86b";


        formulario.reset();

    }


    /* REGISTRO CON ERROR */

    if (datos.estado === "error") {

        mensaje.innerHTML =
            "❌ No pudimos registrar tus datos. Intenta nuevamente.";

        mensaje.style.color =
            "#e53935";

        console.error(
            "Error de Google Apps Script:",
            datos.mensaje
        );

    }

});
