/* =========================================
   MARYS LENCERÍA CR
   TIENDA VIRTUAL, CARRITO Y FORMULARIO
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // DATOS PRINCIPALES
    const botonMenu = document.querySelector("#boton-menu");
    const navegacion = document.querySelector("#navegacion-principal");
    const botonBienvenida = document.querySelector("#boton-bienvenida");

    const botonAbrirCarrito = document.querySelector("#abrir-carrito");
    const botonCerrarCarrito = document.querySelector("#cerrar-carrito");
    const botonVaciarCarrito = document.querySelector("#vaciar-carrito");
    const botonFinalizarCompra = document.querySelector("#finalizar-compra");

    const productosCarrito = document.querySelector("#productos-carrito");
    const contadorCarrito = document.querySelector("#contador-carrito");
    const subtotalCarrito = document.querySelector("#subtotal-carrito");
    const totalCarrito = document.querySelector("#total-carrito");
    const seccionCarrito = document.querySelector("#carrito");

    const TELEFONO_WHATSAPP = "50663638746";
    const CLAVE_CARRITO = "marys_carrito";


    // =========================================
    // FORMATO DE PRECIOS
    // =========================================

    const formatoPrecio = (precio) => {

        return new Intl.NumberFormat("es-CR", {
            style: "currency",
            currency: "CRC",
            maximumFractionDigits: 0
        }).format(precio);

    };


    // =========================================
    // MENÚ MÓVIL
    // =========================================

    if (botonMenu && navegacion) {

        const cerrarMenu = () => {

            navegacion.classList.remove("activo");

            botonMenu.setAttribute("aria-expanded", "false");
            botonMenu.setAttribute("aria-label", "Abrir menú");

            botonMenu.textContent = "☰";

        };

        botonMenu.addEventListener("click", () => {

            const abierto = navegacion.classList.toggle("activo");

            botonMenu.setAttribute("aria-expanded", String(abierto));

            botonMenu.setAttribute(
                "aria-label",
                abierto ? "Cerrar menú" : "Abrir menú"
            );

            botonMenu.textContent = abierto ? "✕" : "☰";

        });

        navegacion.querySelectorAll("a").forEach((enlace) => {

            enlace.addEventListener("click", cerrarMenu);

        });

        document.addEventListener("keydown", (evento) => {

            if (evento.key === "Escape") {
                cerrarMenu();
            }

        });

    }


    // =========================================
    // BOTÓN DE BIENVENIDA
    // =========================================

    if (botonBienvenida) {

        botonBienvenida.addEventListener("click", () => {

            alert(
                "¡Bienvenida a MARYS LENCERÍA CR! ♡\n\n" +
                "Desde 2017 celebramos tu esencia, feminidad y confianza.\n\n" +
                "Gracias por formar parte de nuestra historia."
            );

        });

    }


    // =========================================
    // RECUPERAR CARRITO GUARDADO
    // =========================================

    let carrito = [];

    try {

        const carritoGuardado = localStorage.getItem(CLAVE_CARRITO);

        carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

        if (!Array.isArray(carrito)) {
            carrito = [];
        }

    } catch (error) {

        carrito = [];

    }


    // =========================================
    // GUARDAR CARRITO
    // =========================================

    const guardarCarrito = () => {

        localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));

    };


    // =========================================
    // MOSTRAR Y OCULTAR CARRITO
    // =========================================

    const abrirCarrito = () => {

        if (!seccionCarrito) return;

        seccionCarrito.classList.add("activo");

        seccionCarrito.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    };

    const cerrarCarrito = () => {

        if (!seccionCarrito) return;

        seccionCarrito.classList.remove("activo");

    };

    if (botonAbrirCarrito) {

        botonAbrirCarrito.addEventListener("click", abrirCarrito);

    }

    if (botonCerrarCarrito) {

        botonCerrarCarrito.addEventListener("click", cerrarCarrito);

    }


    // =========================================
    // ACTUALIZAR CARRITO
    // =========================================

    const actualizarCarrito = () => {

        if (!productosCarrito) return;

        productosCarrito.innerHTML = "";

        let cantidadTotal = 0;
        let subtotal = 0;

        if (carrito.length === 0) {

            productosCarrito.innerHTML = `
                <p class="carrito-vacio">
                    Tu carrito está esperando tus favoritos. ♡
                </p>
            `;

        } else {

            carrito.forEach((producto, indice) => {

                const totalProducto = producto.precio * producto.cantidad;

                cantidadTotal += producto.cantidad;
                subtotal += totalProducto;

                const elemento = document.createElement("article");

                elemento.className = "producto-en-carrito";

                const imagen = document.createElement("img");
                imagen.src = producto.imagen;
                imagen.alt = producto.nombre;
                imagen.loading = "lazy";

                const informacion = document.createElement("div");
                informacion.className = "detalle-producto-carrito";

                const nombre = document.createElement("h3");
                nombre.textContent = producto.nombre;

                const talla = document.createElement("p");
                talla.textContent = "Talla: " + producto.talla;

                const precio = document.createElement("p");
                precio.textContent = formatoPrecio(producto.precio);

                const controles = document.createElement("div");
                controles.className = "controles-cantidad";

                const botonRestar = document.createElement("button");
                botonRestar.type = "button";
                botonRestar.textContent = "−";
                botonRestar.setAttribute("aria-label", "Reducir cantidad");

                botonRestar.addEventListener("click", () => {

                    cambiarCantidad(indice, -1);

                });

                const cantidad = document.createElement("span");
                cantidad.textContent = producto.cantidad;

                const botonSumar = document.createElement("button");
                botonSumar.type = "button";
                botonSumar.textContent = "+";
                botonSumar.setAttribute("aria-label", "Aumentar cantidad");

                botonSumar.addEventListener("click", () => {

                    cambiarCantidad(indice, 1);

                });

                controles.append(
                    botonRestar,
                    cantidad,
                    botonSumar
                );

                const total = document.createElement("p");
                total.className = "total-producto-carrito";
                total.textContent = formatoPrecio(totalProducto);

                const botonEliminar = document.createElement("button");
                botonEliminar.type = "button";
                botonEliminar.className = "boton-eliminar";
                botonEliminar.textContent = "Eliminar";

                botonEliminar.addEventListener("click", () => {

                    eliminarProducto(indice);

                });

                informacion.append(
                    nombre,
                    talla,
                    precio,
                    controles,
                    total,
                    botonEliminar
                );

                elemento.append(imagen, informacion);

                productosCarrito.appendChild(elemento);

            });

        }

        if (contadorCarrito) {
            contadorCarrito.textContent = cantidadTotal;
        }

        if (subtotalCarrito) {
            subtotalCarrito.textContent = formatoPrecio(subtotal);
        }

        if (totalCarrito) {
            totalCarrito.textContent = formatoPrecio(subtotal);
        }

        if (botonFinalizarCompra) {
            botonFinalizarCompra.disabled = carrito.length === 0;
        }

        if (botonVaciarCarrito) {
            botonVaciarCarrito.disabled = carrito.length === 0;
        }

        guardarCarrito();

    };


    // =========================================
    // AGREGAR PRODUCTOS
    // =========================================

    const agregarProducto = (boton) => {

        const id = boton.dataset.id;
        const nombre = boton.dataset.nombre;
        const precio = Number(boton.dataset.precio);
        const imagen = boton.dataset.imagen;

        const selectorTalla = document.getElementById(boton.dataset.talla);
        const campoCantidad = document.getElementById(boton.dataset.cantidad);

        if (!selectorTalla || !campoCantidad) return;

        const talla = selectorTalla.value;
        const cantidad = Number(campoCantidad.value);

        if (!talla) {

            alert("Por favor, selecciona una talla antes de continuar.");

            selectorTalla.focus();

            return false;

        }

        if (!Number.isInteger(cantidad) || cantidad < 1) {

            alert("Selecciona una cantidad válida.");

            campoCantidad.focus();

            return false;

        }

        const productoExistente = carrito.find((producto) => {

            return producto.id === id && producto.talla === talla;

        });

        if (productoExistente) {

            productoExistente.cantidad += cantidad;

        } else {

            carrito.push({
                id,
                nombre,
                precio,
                imagen,
                talla,
                cantidad
            });

        }

        actualizarCarrito();

        return true;

    };


    document.querySelectorAll(".boton-agregar").forEach((boton) => {

        boton.addEventListener("click", () => {

            const agregado = agregarProducto(boton);

            if (agregado) {

                alert("¡Producto agregado a tu carrito! ♡");

            }

        });

    });


    // =========================================
    // COMPRAR AHORA
    // =========================================

    document.querySelectorAll(".boton-comprar").forEach((boton) => {

        boton.addEventListener("click", () => {

            const id = boton.dataset.id;

            const botonAgregar = document.querySelector(
                `.boton-agregar[data-id="${id}"]`
            );

            if (!botonAgregar) return;

            const agregado = agregarProducto(botonAgregar);

            if (agregado) {

                abrirCarrito();

            }

        });

    });


    // =========================================
    // MODIFICAR CANTIDADES
    // =========================================

    const cambiarCantidad = (indice, cambio) => {

        if (!carrito[indice]) return;

        carrito[indice].cantidad += cambio;

        if (carrito[indice].cantidad <= 0) {

            carrito.splice(indice, 1);

        }

        actualizarCarrito();

    };


    // =========================================
    // ELIMINAR PRODUCTOS
    // =========================================

    const eliminarProducto = (indice) => {

        carrito.splice(indice, 1);

        actualizarCarrito();

    };


    // =========================================
    // VACIAR CARRITO
    // =========================================

    if (botonVaciarCarrito) {

        botonVaciarCarrito.addEventListener("click", () => {

            if (carrito.length === 0) return;

            const confirmar = confirm(
                "¿Estás segura de que deseas vaciar tu carrito?"
            );

            if (confirmar) {

                carrito = [];

                actualizarCarrito();

            }

        });

    }


    // =========================================
    // FINALIZAR PEDIDO POR WHATSAPP
    // =========================================

    if (botonFinalizarCompra) {

        botonFinalizarCompra.addEventListener("click", () => {

            if (carrito.length === 0) {

                alert("Tu carrito está vacío.");

                return;

            }

            let mensaje = "¡Hola, MARYS LENCERÍA CR! ♡\n";
            mensaje += "Me gustaría realizar el siguiente pedido:\n\n";

            let total = 0;

            carrito.forEach((producto) => {

                const subtotal = producto.precio * producto.cantidad;

                total += subtotal;

                mensaje += "• " + producto.nombre + "\n";
                mensaje += "  Talla: " + producto.talla + "\n";
                mensaje += "  Cantidad: " + producto.cantidad + "\n";
                mensaje += "  Precio: " + formatoPrecio(producto.precio) + "\n";
                mensaje += "  Subtotal: " + formatoPrecio(subtotal) + "\n\n";

            });

            mensaje += "TOTAL: " + formatoPrecio(total) + "\n\n";
            mensaje += "Quisiera confirmar disponibilidad y coordinar el envío. ¡Gracias!";

            const enlace = "https://wa.me/" +
                TELEFONO_WHATSAPP +
                "?text=" +
                encodeURIComponent(mensaje);

            window.open(enlace, "_blank", "noopener,noreferrer");

        });

    }


    // =========================================
    // FORMULARIO DE CONTACTO
    // =========================================

    const formularioContacto = document.querySelector("#formulario-contacto");
    const mensajeFormulario = document.querySelector("#mensaje-formulario");

    if (formularioContacto) {

        formularioContacto.addEventListener("submit", (evento) => {

            evento.preventDefault();

            if (!formularioContacto.checkValidity()) {

                formularioContacto.reportValidity();

                return;

            }

            const datos = new FormData(formularioContacto);

            const nombre = datos.get("nombre").trim();
            const correo = datos.get("correo").trim();
            const telefono = datos.get("telefono").trim();
            const asunto = datos.get("asunto");
            const mensajeUsuario = datos.get("mensaje").trim();

            let mensaje = "¡Hola, MARYS LENCERÍA CR! ♡\n\n";

            mensaje += "Me gustaría comunicarme con ustedes.\n\n";

            mensaje += "DATOS DE CONTACTO\n";
            mensaje += "Nombre: " + nombre + "\n";
            mensaje += "Correo electrónico: " + correo + "\n";
            mensaje += "Teléfono: " + (telefono || "No indicado") + "\n\n";

            mensaje += "MOTIVO DE CONTACTO\n";
            mensaje += asunto + "\n\n";

            mensaje += "MENSAJE\n";
            mensaje += mensajeUsuario + "\n\n";

            mensaje += "Gracias por su atención. ♡";

            const enlace = "https://wa.me/" +
                TELEFONO_WHATSAPP +
                "?text=" +
                encodeURIComponent(mensaje);

            if (mensajeFormulario) {

                mensajeFormulario.textContent =
                    "Se abrirá WhatsApp para que puedas revisar y enviar tu mensaje.";

                mensajeFormulario.classList.add("visible");

            }

            window.open(enlace, "_blank", "noopener,noreferrer");

        });

    }


    // =========================================
    // INICIAR CARRITO
    // =========================================

    actualizarCarrito();


    // =========================================
    // MENSAJE DE CONSOLA
    // =========================================

    console.log(
        "MARYS LENCERÍA CR: tienda, carrito y formulario funcionando. ♡"
    );

});
