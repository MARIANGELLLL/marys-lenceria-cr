/**
 * MARYS LENCERÍA CR
 * JavaScript principal
 */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /* MENÚ MÓVIL */

    const botonMenu = document.getElementById("boton-menu");
    const navegacion = document.getElementById("navegacion-principal");

    if (botonMenu && navegacion) {

        botonMenu.addEventListener("click", function () {

            const menuAbierto = navegacion.classList.toggle("activo");

            botonMenu.setAttribute("aria-expanded", String(menuAbierto));
            botonMenu.setAttribute(
                "aria-label",
                menuAbierto ? "Cerrar menú" : "Abrir menú"
            );

            botonMenu.textContent = menuAbierto ? "✕" : "☰";

        });

        const enlaces = navegacion.querySelectorAll("a");

        enlaces.forEach(function (enlace) {

            enlace.addEventListener("click", function () {

                navegacion.classList.remove("activo");

                botonMenu.setAttribute("aria-expanded", "false");
                botonMenu.setAttribute("aria-label", "Abrir menú");

                botonMenu.textContent = "☰";

            });

        });

        document.addEventListener("keydown", function (evento) {

            if (evento.key === "Escape") {

                navegacion.classList.remove("activo");

                botonMenu.setAttribute("aria-expanded", "false");
                botonMenu.setAttribute("aria-label", "Abrir menú");

                botonMenu.textContent = "☰";

            }

        });

    }


    /* BOTÓN DE BIENVENIDA */

    const botonBienvenida = document.getElementById("boton-bienvenida");

    if (botonBienvenida) {

        botonBienvenida.addEventListener("click", function () {

            alert(
                "¡Bienvenida a MARYS LENCERÍA CR! Gracias por visitarnos. 💗"
            );

        });

    }


    /* VALIDACIÓN VISUAL DEL FORMULARIO */

    const formulario = document.getElementById("formulario-contacto");

    if (formulario) {

        formulario.addEventListener("submit", function (evento) {

            const nombre = formulario.querySelector('[name="nombre"]');
            const correo = formulario.querySelector('[name="correo"]');
            const mensaje = formulario.querySelector('[name="mensaje"]');

            if (!nombre || !correo || !mensaje) {
                return;
            }

            if (
                !nombre.value.trim() ||
                !correo.value.trim() ||
                !mensaje.value.trim()
            ) {

                evento.preventDefault();

                alert("Por favor, completa todos los campos.");

                return;

            }

        });

    }


    /* AÑO AUTOMÁTICO DEL PIE DE PÁGINA */

    const anio = document.getElementById("marys-anio");

    if (anio) {
        anio.textContent = new Date().getFullYear();
    }


    console.log("MARYS LENCERÍA CR: JavaScript funcionando correctamente.");

});
