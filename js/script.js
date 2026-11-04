/* =====================================
   MARYS LENCERÍA CR
   DÍA 15 - JAVASCRIPT Y CONFIRMACIÓN
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. ELEMENTOS DEL SITIO
    // =====================================

    const botonMenu = document.querySelector("#boton-menu");
    const navegacion = document.querySelector("#navegacion-principal");

    const botonBienvenida = document.querySelector("#boton-bienvenida");

    const formulario = document.querySelector("#formulario-contacto");
    const mensajeFormulario = document.querySelector("#mensaje-formulario");


    // =====================================
    // 2. MENÚ MÓVIL
    // =====================================

    if (botonMenu && navegacion) {

        botonMenu.addEventListener("click", () => {

            navegacion.classList.toggle("activo");

            const menuAbierto = navegacion.classList.contains("activo");

            botonMenu.setAttribute("aria-expanded", String(menuAbierto));

            botonMenu.setAttribute(
                "aria-label",
                menuAbierto ? "Cerrar menú" : "Abrir menú"
            );

            botonMenu.textContent = menuAbierto ? "✕" : "☰";

        });

        const enlacesMenu = navegacion.querySelectorAll("a");

        enlacesMenu.forEach((enlace) => {

            enlace.addEventListener("click", () => {

                navegacion.classList.remove("activo");

                botonMenu.setAttribute("aria-expanded", "false");
                botonMenu.setAttribute("aria-label", "Abrir menú");

                botonMenu.textContent = "☰";

            });

        });

    }


    // =====================================
    // 3. BOTÓN DE BIENVENIDA
    // =====================================

    if (botonBienvenida) {

        botonBienvenida.addEventListener("click", () => {

            alert("¡Bienvenida a MARYS LENCERÍA CR! Gracias por visitarnos.");

        });

    }


    // =====================================
    // 4. VALIDACIÓN DEL FORMULARIO
    // =====================================

    if (formulario) {

        formulario.addEventListener("submit", (evento) => {

            evento.preventDefault();

            const nombre = document.querySelector("#nombre");
            const correo = document.querySelector("#correo");
            const mensaje = document.querySelector("#mensaje");

            // Validar espacios vacíos

            nombre.setCustomValidity(
                nombre.value.trim()
                    ? ""
                    : "Escribe tu nombre completo."
            );

            mensaje.setCustomValidity(
                mensaje.value.trim()
                    ? ""
                    : "Escribe tu consulta."
            );

            // Comprobar los campos

            if (!formulario.checkValidity()) {

                formulario.reportValidity();

                if (mensajeFormulario) {
                    mensajeFormulario.textContent = "";
                }

                return;

            }

            // =====================================
            // 5. MENSAJE VISUAL DE VALIDACIÓN
            // =====================================

            if (mensajeFormulario) {

                mensajeFormulario.textContent =
                    "¡Gracias! Tus datos están completos y son válidos. " +
                    "Pronto podrás enviarnos tu consulta desde este formulario.";

                mensajeFormulario.classList.add("visible");

            }

            console.log("Formulario validado correctamente.");

        });


        // Limpiar errores cuando el cliente escribe

        formulario.querySelectorAll("input, textarea").forEach((campo) => {

            campo.addEventListener("input", () => {

                campo.setCustomValidity("");

            });

        });

    }


    // =====================================
    // 6. MENSAJE EN CONSOLA
    // =====================================

    console.log(
        "MARYS LENCERÍA CR: JavaScript funcionando correctamente."
    );

});