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
   GOOGLE APPS SCRIPT
========================================= */

const URL_APPS_SCRIPT =
    "https://script.google.com/macros/s/AKfycbzgTMdUj4cSlr6B-kvCzwlLcOo_u2rY8rZeLVRg_37ydKL81Xfi5Lk9RT8lR1WeaZIozA/exec";


/* =========================================
   FORMULARIO
========================================= */

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


            mensaje.innerHTML =
                "⏳ Registrando tus datos...";

            mensaje.style.color =
                "#008bd3";


            const datos =
                new FormData(formulario);


            try {

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

                else {

                    mensaje.innerHTML =
                        "❌ Error al registrar. " +
                        (resultado.mensaje || "");

                    mensaje.style.color =
                        "#d93025";

                }


            }

            catch (error) {

                console.error(error);


                mensaje.innerHTML =
                    "❌ No se pudo conectar " +
                    "con Team Car Wash.";

                mensaje.style.color =
                    "#d93025";

            }

        }
    );

}
