```javascript
const formulario =
    document.getElementById("formularioCliente");


formulario.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const mensaje =
            document.getElementById(
                "mensajeFormulario"
            );


        mensaje.innerHTML =
            "⏳ Registrando tus datos...";


        const datos =
            new FormData(formulario);


        try {

            const respuesta =
                await fetch(

                    "https://script.google.com/macros/s/AKfycbyp_5BKG_07G-SJBZr0EZjZo2hP5SNNHF2XEr8ng2uJQuQWbDSssx678Wzb3GKtOQjXhQ/exec",

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
                    "Revisa tu correo electrónico. " +
                    "Team Car Wash te ha enviado " +
                    "la confirmación. 🚗💦";


                formulario.reset();


            } else {

                mensaje.innerHTML =

                    "❌ Ocurrió un problema. " +
                    "Intenta nuevamente.";

            }


        } catch (error) {

            console.error(error);


            mensaje.innerHTML =

                "❌ No pudimos enviar el registro. " +
                "Verifica la conexión.";

        }

    }
);
```
