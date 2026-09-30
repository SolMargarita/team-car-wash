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
   MENSAJE DEL FORMULARIO
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
