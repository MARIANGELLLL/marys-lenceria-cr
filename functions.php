<?php
/**
 * MARYS LENCERÍA CR
 * Funciones del tema hijo
 */

if (!defined('ABSPATH')) {
    exit;
}

// Cargar estilos y fuentes
function marys_lenceria_cr_child_styles() {

    // Fuentes de Google
    wp_enqueue_style(
        'marys-google-fonts',
        'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Playfair+Display:wght@400;500;600;700&display=swap',
        array(),
        null
    );

    // Estilos del tema padre
    wp_enqueue_style(
        'marys-parent-style',
        get_template_directory_uri() . '/style.css'
    );

    // Estilos del tema hijo
    wp_enqueue_style(
        'marys-child-style',
        get_stylesheet_uri(),
        array('marys-parent-style', 'marys-google-fonts'),
        wp_get_theme()->get('Version')
    );

    // Estilos personalizados
    wp_enqueue_style(
        'marys-custom-style',
        get_stylesheet_directory_uri() . '/assets/css/style.css',
        array('marys-child-style'),
        '1.0.1'
    );
}

add_action('wp_enqueue_scripts', 'marys_lenceria_cr_child_styles');

// Cargar JavaScript principal
function marys_lenceria_cr_child_scripts() {

    wp_enqueue_script(
        'marys-child-script',
        get_stylesheet_directory_uri() . '/assets/js/script.js',
        array(),
        '1.0.0',
        true
    );
}

add_action('wp_enqueue_scripts', 'marys_lenceria_cr_child_scripts');
