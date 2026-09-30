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
    document.getElementById(
        "formularioCliente"
    );


const mensaje =
    document.getElementById(
        "mensajeFormulario"
    );


if (formulario) {

    formulario.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* Mensaje mientras carga */

            mensaje.innerHTML =
                "⏳ Registrando tus datos...";


            mensaje.style.color =
                "#008bd3";


            /* Obtener información */

            const datos =
                new FormData(formulario);


            try {


                /*
                   Enviar información
                   a Google Apps Script
                */

                const respuesta =
                    await fetch(
                        URL_APPS_SCRIPT,
                        {
                            method: "POST",
                            body: datos
                        }
                    );


                const resultado =
                    await respuesta.json();


                /* Registro exitoso */

                if (
                    resultado.resultado ===
                    "exito"
                ) {

                    mensaje.innerHTML =
                        "🎉 ¡Registro exitoso! " +
                        "Revisa tu correo. " +
                        "¡Bienvenido a Team Car Wash! 🚗💦";


                    mensaje.style.color =
                        "#008a4b";


                    formulario.reset();


                }


                /* Error */
else {

    mensaje.innerHTML =
        "❌ Error: " +
        (resultado.mensaje || "No se pudo completar el registro.");

    mensaje.style.color =
        "#d93025";

}


            }

            catch (error) {

                console.error(error);


                mensaje.innerHTML =
                    "❌ Ocurrió un problema " +
                    "al conectar con el servidor. " +
                    "Verifica la configuración " +
                    "de Google Apps Script.";


                mensaje.style.color =
                    "#d93025";

            }

        }
    );

}
