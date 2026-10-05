const STORAGE_KEY = "teamCarWashClients";
const WASHES_KEY = "teamCarWashWashes";


// ========================================
// DATOS
// ========================================

function getClients() {

    return JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
    );

}


function saveClients(clients) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(clients)
    );

}


function cleanPhone(phone) {

    return String(phone || "")
        .replace(/\D/g, "");

}


function formatDate(date) {

    return new Date(
        date + "T12:00:00"
    ).toLocaleDateString(
        "es-CO",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


function dateISO(date) {

    return new Date(date)
        .toISOString()
        .slice(0, 10);

}


function addDays(date, days) {

    const result = new Date(
        date + "T12:00:00"
    );

    result.setDate(
        result.getDate() + Number(days)
    );

    return result;

}


function daysSince(date) {

    const start = new Date(
        date + "T12:00:00"
    );

    const now = new Date();

    now.setHours(12, 0, 0, 0);

    return Math.max(
        0,
        Math.floor(
            (now - start) / 86400000
        )
    );

}


// ========================================
// CLIENTES DEMO
// ========================================

function createDemoClients() {

    if (getClients().length > 0) {
        return;
    }


    const today = new Date();


    const clients = [

        {
            id: crypto.randomUUID(),

            nombre: "Juan Pérez",

            telefono: "3001234567",

            vehiculo: "Automóvil",

            ultimoLavado:
                dateISO(
                    addDays(
                        dateISO(today),
                        -15
                    )
                ),

            frecuencia: 15,

            visitas: 3

        },


        {
            id: crypto.randomUUID(),

            nombre: "María López",

            telefono: "3017654321",

            vehiculo: "Camioneta",

            ultimoLavado:
                dateISO(
                    addDays(
                        dateISO(today),
                        -4
                    )
                ),

            frecuencia: 30,

            visitas: 5

        },


        {
            id: crypto.randomUUID(),

            nombre: "Carlos Díaz",

            telefono: "3105557788",

            vehiculo: "Automóvil",

            ultimoLavado:
                dateISO(
                    addDays(
                        dateISO(today),
                        -56
                    )
                ),

            frecuencia: 30,

            visitas: 2

        }

    ];


    saveClients(clients);


    if (
        !localStorage.getItem(WASHES_KEY)
    ) {

        localStorage.setItem(
            WASHES_KEY,
            "12"
        );

    }

}


createDemoClients();


// ========================================
// REGISTRO DEL CLIENTE
// ========================================

const clientForm =
    document.getElementById(
        "clientForm"
    );


if (clientForm) {

    clientForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const data =
                Object.fromEntries(
                    new FormData(clientForm)
                );


            const phone =
                cleanPhone(
                    data.telefono
                );


            const clients =
                getClients();


            const existing =
                clients.find(
                    client =>
                        cleanPhone(
                            client.telefono
                        ) === phone
                );


            const nextDate =
                addDays(
                    data.ultimoLavado,
                    data.frecuencia
                );


            const client = {

                id:
                    existing?.id ||
                    crypto.randomUUID(),

                nombre:
                    data.nombre,

                telefono:
                    phone,

                vehiculo:
                    data.vehiculo,

                ultimoLavado:
                    data.ultimoLavado,

                frecuencia:
                    Number(
                        data.frecuencia
                    ),

                visitas:
                    existing?.visitas || 0

            };


            if (existing) {

                Object.assign(
                    existing,
                    client
                );

            } else {

                clients.push(client);

            }


            saveClients(clients);


            const message =
                document.getElementById(
                    "formMessage"
                );


            message.innerHTML = `
                <p style="color:#159a69">
                    ✅ Registro exitoso.
                    <br>
                    Tu próximo servicio recomendado es:
                    <strong>
                        ${formatDate(
                            dateISO(nextDate)
                        )}
                    </strong>
                </p>
            `;


            const heroDate =
                document.getElementById(
                    "heroDate"
                );


            if (heroDate) {

                heroDate.textContent =
                    formatDate(
                        dateISO(nextDate)
                    );

            }

        }
    );

}


// ========================================
// BOTONES DE SERVICIOS
// ========================================

document
    .querySelectorAll(".service-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const service =
                    button.dataset.service;


                document
                    .getElementById("registro")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });


                setTimeout(
                    () => {

                        alert(
                            `Has elegido el servicio ${service}. Completa el formulario para continuar.`
                        );

                    },
                    500
                );

            }
        );

    });


// ========================================
// PORTAL VIP
// ========================================

const vipSearch =
    document.getElementById(
        "vipSearch"
    );


if (vipSearch) {

    vipSearch.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const phone =
                cleanPhone(
                    document.getElementById(
                        "vipPhone"
                    ).value
                );


            const client =
                getClients().find(
                    client =>
                        cleanPhone(
                            client.telefono
                        ) === phone
                );


            const result =
                document.getElementById(
                    "vipResult"
                );


            const error =
                document.getElementById(
                    "vipError"
                );


            if (!client) {

                result.classList.add(
                    "hidden"
                );


                error.innerHTML = `
                    No encontramos ese número.
                    <br><br>
                    Prueba con:
                    <strong>3001234567</strong>,
                    <strong>3017654321</strong>
                    o
                    <strong>3105557788</strong>.
                `;

                return;

            }


            error.textContent = "";

            result.classList.remove(
                "hidden"
            );


            renderVIP(client);

        }
    );

}


function renderVIP(client) {

    document.getElementById(
        "vipName"
    ).textContent =
        client.nombre;


    document.getElementById(
        "vipVehicle"
    ).textContent =
        `${client.vehiculo} · ${client.telefono}`;


    document.getElementById(
        "lastWash"
    ).textContent =
        formatDate(
            client.ultimoLavado
        );


    const days =
        daysSince(
            client.ultimoLavado
        );


    document.getElementById(
        "daysPassed"
    ).textContent =
        `Han pasado ${days} días.`;


    const next =
        addDays(
            client.ultimoLavado,
            client.frecuencia
        );


    document.getElementById(
        "nextWash"
    ).textContent =
        formatDate(
            dateISO(next)
        );


    const visits =
        Number(
            client.visitas || 0
        );


    const progress =
        visits % 5 === 0 &&
        visits > 0
            ? 5
            : visits % 5;


    document.getElementById(
        "progressText"
    ).textContent =
        `${progress}/5 lavados`;


    document.getElementById(
        "progressBar"
    ).style.width =
        `${progress * 20}%`;


    document.getElementById(
        "progressMessage"
    ).textContent =
        progress === 5
            ? "🎁 ¡Beneficio desbloqueado!"
            : `Te faltan ${5 - progress} lavados para tu próximo beneficio.`;


    let status;

    if (
        days >=
        Number(client.frecuencia) + 15
    ) {

        status = {
            text: "Urgente",
            class: "status red"
        };

    }

    else if (
        days >=
        Number(client.frecuencia)
    ) {

        status = {
            text: "Pendiente",
            class: "status yellow"
        };

    }

    else {

        status = {
            text: "Al día",
            class: "status green"
        };

    }


    const statusElement =
        document.getElementById(
            "vipStatus"
        );


    statusElement.textContent =
        status.text;


    statusElement.className =
        status.class;


    let recommendation;


    if (
        days >=
        Number(client.frecuencia) + 15
    ) {

        recommendation =
            "Tu lavado está bastante atrasado. Te recomendamos agendar una visita pronto.";

    }

    else if (
        days >=
        Number(client.frecuencia)
    ) {

        recommendation =
            "Ya llegó el momento recomendado para tu próximo lavado. ¡Puedes reservar tu cita!";

    }

    else {

        recommendation =
            `Vas muy bien. Tu próxima fecha recomendada es ${formatDate(
                dateISO(next)
            )}.`;

    }


    document.getElementById(
        "recommendation"
    ).textContent =
        recommendation;

}


// ========================================
// MODAL DE CITA
// ========================================

const bookingModal =
    document.getElementById(
        "bookingModal"
    );


document
    .getElementById(
        "openBooking"
    )
    ?.addEventListener(
        "click",
        () => {

            bookingModal.classList.remove(
                "hidden"
            );

        }
    );


document
    .getElementById(
        "closeBooking"
    )
    ?.addEventListener(
        "click",
        () => {

            bookingModal.classList.add(
                "hidden"
            );

        }
    );


document
    .getElementById(
        "bookingForm"
    )
    ?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            document.getElementById(
                "bookingMessage"
            ).innerHTML = `
                <p style="color:#159a69">
                    ✅ Solicitud enviada correctamente.
                    <br>
                    El negocio puede confirmar tu turno.
                </p>
            `;

        }
    );


// ========================================
// DASHBOARD
// ========================================

function statusClient(client) {

    const days =
        daysSince(
            client.ultimoLavado
        );


    if (
        days >=
        Number(client.frecuencia) + 15
    ) {

        return {
            text: "Urgente",
            class: "red"
        };

    }


    if (
        days >=
        Number(client.frecuencia)
    ) {

        return {
            text: "Pendiente",
            class: "yellow"
        };

    }


    return {
        text: "Al día",
        class: "green"
    };

}


function renderAdmin(
    search = ""
) {

    const table =
        document.getElementById(
            "clientTable"
        );


    if (!table) {
        return;
    }


    const clients =
        getClients().filter(
            client =>
                `${client.nombre} ${client.telefono}`
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );


    table.innerHTML =
        clients.map(
            client => {

                const status =
                    statusClient(
                        client
                    );


                const whatsappMessage =
                    encodeURIComponent(
                        `Hola ${client.nombre} 👋 Somos Team Car Wash 🚗. Han pasado ${daysSince(client.ultimoLavado)} días desde tu último lavado. ¿Te gustaría agendar nuevamente tu servicio?`
                    );


                return `

                <tr>

                    <td>
                        <strong>
                            ${client.nombre}
                        </strong>
                        <br>
                        <small>
                            ${client.vehiculo}
                        </small>
                    </td>


                    <td>
                        ${client.telefono}
                    </td>


                    <td>
                        ${formatDate(
                            client.ultimoLavado
                        )}
                    </td>


                    <td>
                        ${daysSince(
                            client.ultimoLavado
                        )}
                    </td>


                    <td>
                        ${client.visitas}
                    </td>


                    <td>

                        <span
                            class="status ${status.class}">

                            ${status.text}

                        </span>

                    </td>


                    <td>

                        <a
                            class="action whatsapp"
                            target="_blank"
                            href="https://wa.me/57${client.telefono}?text=${whatsappMessage}">

                            WhatsApp

                        </a>


                        <button
                            class="action wash"
                            onclick="markWash('${client.id}')">

                            Lavó Hoy

                        </button>

                    </td>

                </tr>

                `;

            }
        ).join("");


    updateMetrics();

}


function updateMetrics() {

    const clients =
        getClients();


    const pending =
        clients.filter(
            client =>
                statusClient(client).text
                !== "Al día"
        ).length;


    const retained =
        clients.filter(
            client =>
                Number(client.visitas) > 1
        ).length;


    document.getElementById(
        "metricClients"
    ).textContent =
        clients.length;


    document.getElementById(
        "metricPending"
    ).textContent =
        pending;


    document.getElementById(
        "metricWashes"
    ).textContent =
        localStorage.getItem(
            WASHES_KEY
        ) || 0;


    document.getElementById(
        "metricRetention"
    ).textContent =
        clients.length
            ? Math.round(
                retained /
                clients.length *
                100
            ) + "%"
            : "0%";

}


// ========================================
// BOTÓN "LAVÓ HOY"
// ========================================

window.markWash =
function(id) {

    const clients =
        getClients();


    const client =
        clients.find(
            client =>
                client.id === id
        );


    if (!client) {
        return;
    }


    client.ultimoLavado =
        dateISO(
            new Date()
        );


    client.visitas =
        Number(
            client.visitas || 0
        ) + 1;


    saveClients(
        clients
    );


    const washes =
        Number(
            localStorage.getItem(
                WASHES_KEY
            ) || 0
        );


    localStorage.setItem(
        WASHES_KEY,
        washes + 1
    );


    renderAdmin();


    alert(
        `✅ ${client.nombre} registró un lavado hoy.\n\nVisitas: ${client.visitas}`
    );

};


// ========================================
// BUSCADOR ADMIN
// ========================================

const adminSearch =
    document.getElementById(
        "adminSearch"
    );


if (adminSearch) {

    renderAdmin();


    adminSearch.addEventListener(
        "input",
        event => {

            renderAdmin(
                event.target.value
            );

        }
    );

}


// ========================================
// RESET DEMO
// ========================================

document
    .getElementById(
        "clearDemo"
    )
    ?.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                STORAGE_KEY
            );


            localStorage.removeItem(
                WASHES_KEY
            );


            createDemoClients();


            renderAdmin();


            alert(
                "Demo restablecida."
            );

        }
    );
