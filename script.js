/* =========================================
   TEAM CAR WASH
   JAVASCRIPT
========================================= */


/* =========================================
   MENÚ PARA CELULAR
========================================= */

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");


if (menuBtn && navLinks) {

    menuBtn.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle(
                "active"
            );

        }
    );


    const links =
        navLinks.querySelectorAll("a");


    links.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                navLinks.classList.remove(
                    "active"
                );

            }
        );

    });

}


/* =========================================
   FORMULARIO
========================================= */


/*
   IMPORTANTE:

   Aquí debes colocar la URL de tu
   Google Apps Script.

   Ejemplo:

   const URL_APPS_SCRIPT =
   "https://script.google.com/macros/s/XXXXXXXX/exec";

*/

const URL_APPS_SCRIPT =
    "https://script.google.com/macros/s/AKfycbyp_5BKG_07G-SJBZr0EZjZo2hP5SNNHF2XEr8ng2uJQuQWbDSssx678Wzb3GKtOQjXhQ/exec";


const formulario =
    document.getElementById("formularioCliente");

const mensaje =
    document.getElementById("mensajeFormulario");

if (formulario) {

    formulario.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            mensaje.innerHTML =
                "⏳ Registrando tus datos...";

            mensaje.style.color =
                "#008bd3";

            const datos =
                new FormData(formulario);

            fetch(URL_APPS_SCRIPT, {
                method: "POST",
                mode: "no-cors",
                body: datos
            })
            .then(function () {

                mensaje.innerHTML =
                    "🎉 ¡Datos enviados! Estamos registrando tu información.";

                mensaje.style.color =
                    "#008a4b";

                formulario.reset();

            })
            .catch(function (error) {

                console.error(error);

                mensaje.innerHTML =
                    "❌ No se pudo enviar la información.";

                mensaje.style.color =
                    "#d93025";

            });

        }
    );
}
        }
    );

}
