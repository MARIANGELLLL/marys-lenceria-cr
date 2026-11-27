<?php
/**
 * MARYS LENCERÍA CR
 * Funciones principales del tema hijo.
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * CONFIGURACIÓN DEL TEMA
 */
function marys_configuracion_tema() {

    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('woocommerce');

}
add_action('after_setup_theme', 'marys_configuracion_tema');


/**
 * CARGAR ESTILOS Y FUENTES
 */
function marys_cargar_estilos() {

    $version = wp_get_theme()->get('Version');

    wp_enqueue_style(
        'marys-google-fonts',
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap',
        array(),
        null
    );

    wp_enqueue_style(
        'marys-parent-style',
        get_template_directory_uri() . '/style.css',
        array(),
        $version
    );

    wp_enqueue_style(
        'marys-child-style',
        get_stylesheet_uri(),
        array('marys-parent-style'),
        $version
    );

    $css_path = get_stylesheet_directory() . '/assets/css/style.css';

    if (file_exists($css_path)) {
        wp_enqueue_style(
            'marys-custom-style',
            get_stylesheet_directory_uri() . '/assets/css/style.css',
            array('marys-child-style', 'marys-google-fonts'),
            filemtime($css_path)
        );
    }

}
add_action('wp_enqueue_scripts', 'marys_cargar_estilos');


/**
 * CARGAR JAVASCRIPT
 */
function marys_cargar_scripts() {

    $js_path = get_stylesheet_directory() . '/assets/js/script.js';

    if (file_exists($js_path)) {
        wp_enqueue_script(
            'marys-main-script',
            get_stylesheet_directory_uri() . '/assets/js/script.js',
            array(),
            filemtime($js_path),
            true
        );
    }

}
add_action('wp_enqueue_scripts', 'marys_cargar_scripts');


/**
 * BOTONES DE PRODUCTOS WOOCOMMERCE
 * Todos mostrarán COMPRAR.
 */
function marys_texto_boton_comprar($texto, $producto) {

    if (!$producto) {
        return $texto;
    }

    return 'COMPRAR';

}
add_filter('woocommerce_product_add_to_cart_text', 'marys_texto_boton_comprar', 10, 2);


/**
 * TEXTO DEL BOTÓN EN LA PÁGINA DEL PRODUCTO
 */
function marys_texto_boton_producto($texto) {

    return 'COMPRAR';

}
add_filter('woocommerce_product_single_add_to_cart_text', 'marys_texto_boton_producto');


/**
 * SHORTCODE DEL FORMULARIO DE CONTACTO
 * Uso: [marys_contacto]
 */
function marys_formulario_contacto() {

    ob_start();

    if (isset($_GET['marys_contacto'])) {

        $estado = sanitize_key(wp_unslash($_GET['marys_contacto']));

        if ($estado === 'enviado') {
            echo '<p class="mensaje-formulario visible" role="status">¡Gracias! Tu consulta fue enviada correctamente. Pronto nos pondremos en contacto contigo.</p>';
        } elseif ($estado === 'error') {
            echo '<p class="mensaje-formulario visible" role="alert">No fue posible enviar tu consulta. Inténtalo nuevamente.</p>';
        }
    }

    ?>

    <form
        class="formulario-contacto"
        action="<?php echo esc_url(admin_url('admin-post.php')); ?>"
        method="POST"
    >

        <input type="hidden" name="action" value="marys_enviar_contacto">

        <?php wp_nonce_field('marys_formulario_contacto', 'marys_nonce'); ?>

        <div class="campo-formulario">
            <label for="marys-nombre">Nombre completo *</label>
            <input
                type="text"
                id="marys-nombre"
                name="nombre"
                maxlength="100"
                autocomplete="name"
                placeholder="Escribe tu nombre"
                required
            >
        </div>

        <div class="campo-formulario">
            <label for="marys-whatsapp">Número de WhatsApp *</label>
            <input
                type="tel"
                id="marys-whatsapp"
                name="whatsapp"
                maxlength="25"
                autocomplete="tel"
                placeholder="Ej. 8888-8888"
                required
            >
        </div>

        <div class="campo-formulario">
            <label for="marys-correo">Correo electrónico *</label>
            <input
                type="email"
                id="marys-correo"
                name="correo"
                maxlength="150"
                autocomplete="email"
                placeholder="tucorreo@ejemplo.com"
                required
            >
        </div>

        <div class="campo-formulario">
            <label for="marys-motivo">¿En qué podemos ayudarte? *</label>
            <select id="marys-motivo" name="motivo" required>
                <option value="">Selecciona una opción</option>
                <option value="Consulta sobre productos">Consulta sobre productos</option>
                <option value="Disponibilidad de tallas">Disponibilidad de tallas</option>
                <option value="Estado de mi pedido">Estado de mi pedido</option>
                <option value="Información sobre envíos">Información sobre envíos</option>
                <option value="Métodos de pago">Métodos de pago</option>
                <option value="Ayuda con mi compra">Ayuda con mi compra</option>
                <option value="Otra consulta">Otra consulta</option>
            </select>
        </div>

        <div class="campo-formulario">
            <label for="marys-pedido">Número de pedido (opcional)</label>
            <input
                type="text"
                id="marys-pedido"
                name="pedido"
                maxlength="50"
                placeholder="Si ya realizaste una compra"
            >
        </div>

        <div class="campo-formulario">
            <label for="marys-producto">Producto de interés (opcional)</label>
            <input
                type="text"
                id="marys-producto"
                name="producto"
                maxlength="150"
                placeholder="Nombre del producto"
            >
        </div>

        <div class="campo-formulario">
            <label for="marys-mensaje">Cuéntanos cómo podemos ayudarte *</label>
            <textarea
                id="marys-mensaje"
                name="mensaje"
                rows="5"
                maxlength="2000"
                placeholder="Escribe tu consulta aquí..."
                required
            ></textarea>
        </div>

        <div class="campo-formulario marys-privacidad">
            <label>
                <input
                    type="checkbox"
                    name="privacidad"
                    value="1"
                    required
                >
                He leído y acepto la
                <a href="/politica-de-privacidad/" target="_blank" rel="noopener">
                    política de privacidad
                </a>.
            </label>
        </div>

        <div class="marys-campo-oculto" aria-hidden="true">
            <label for="marys-website">No completar este campo</label>
            <input
                type="text"
                id="marys-website"
                name="website"
                tabindex="-1"
                autocomplete="off"
            >
        </div>

        <button type="submit" class="boton boton-principal">
            ENVIAR CONSULTA
        </button>

    </form>

    <?php

    return ob_get_clean();

}
add_shortcode('marys_contacto', 'marys_formulario_contacto');


/**
 * PROCESAR FORMULARIO DE CONTACTO
 */
function marys_procesar_contacto() {

    $pagina = wp_get_referer();

    if (!$pagina) {
        $pagina = home_url('/');
    }

    if (
        !isset($_POST['marys_nonce']) ||
        !wp_verify_nonce(
            sanitize_text_field(wp_unslash($_POST['marys_nonce'])),
            'marys_formulario_contacto'
        )
    ) {
        wp_safe_redirect(add_query_arg('marys_contacto', 'error', $pagina));
        exit;
    }

    // Protección contra spam.
    if (!empty($_POST['website'])) {
        wp_safe_redirect(add_query_arg('marys_contacto', 'enviado', $pagina));
        exit;
    }

    $nombre = isset($_POST['nombre'])
        ? sanitize_text_field(wp_unslash($_POST['nombre']))
        : '';

    $whatsapp = isset($_POST['whatsapp'])
        ? sanitize_text_field(wp_unslash($_POST['whatsapp']))
        : '';

    $correo = isset($_POST['correo'])
        ? sanitize_email(wp_unslash($_POST['correo']))
        : '';

    $motivo = isset($_POST['motivo'])
        ? sanitize_text_field(wp_unslash($_POST['motivo']))
        : '';

    $pedido = isset($_POST['pedido'])
        ? sanitize_text_field(wp_unslash($_POST['pedido']))
        : '';

    $producto = isset($_POST['producto'])
        ? sanitize_text_field(wp_unslash($_POST['producto']))
        : '';

    $mensaje = isset($_POST['mensaje'])
        ? sanitize_textarea_field(wp_unslash($_POST['mensaje']))
        : '';

    $privacidad = isset($_POST['privacidad'])
        && sanitize_text_field(wp_unslash($_POST['privacidad'])) === '1';

    if (
        empty($nombre) ||
        empty($whatsapp) ||
        empty($correo) ||
        empty($motivo) ||
        empty($mensaje) ||
        !$privacidad ||
        !is_email($correo)
    ) {
        wp_safe_redirect(add_query_arg('marys_contacto', 'error', $pagina));
        exit;
    }

    $destinatario = get_option('admin_email');

    $asunto = 'Nueva consulta desde MARYS LENCERÍA CR';

    $contenido = "Nueva consulta recibida desde la página web.\n\n";
    $contenido .= "Nombre: " . $nombre . "\n";
    $contenido .= "WhatsApp: " . $whatsapp . "\n";
    $contenido .= "Correo: " . $correo . "\n";
    $contenido .= "Motivo: " . $motivo . "\n";
    $contenido .= "Número de pedido: " . ($pedido ?: 'No indicado') . "\n";
    $contenido .= "Producto de interés: " . ($producto ?: 'No indicado') . "\n\n";
    $contenido .= "Mensaje:\n" . $mensaje;

    $cabeceras = array(
        'Content-Type: text/plain; charset=UTF-8'
    );

    $enviado = wp_mail(
        $destinatario,
        $asunto,
        $contenido,
        $cabeceras
    );

    $estado = $enviado ? 'enviado' : 'error';

    wp_safe_redirect(add_query_arg('marys_contacto', $estado, $pagina));
    exit;

}

add_action('admin_post_marys_enviar_contacto', 'marys_procesar_contacto');
add_action('admin_post_nopriv_marys_enviar_contacto', 'marys_procesar_contacto');


/**
 * ESTILOS DEL CAMPO ANTISPAM
 */
function marys_estilos_antispam() {

    echo '<style>
        .marys-campo-oculto {
            position: absolute !important;
            width: 1px !important;
            height: 1px !important;
            overflow: hidden !important;
            clip: rect(0, 0, 0, 0) !important;
            white-space: nowrap !important;
        }
    </style>';

}
add_action('wp_head', 'marys_estilos_antispam');
