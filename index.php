<?php
/**
 * MARYS LENCERÍA CR
 * Plantilla principal del tema hijo
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main">

    <?php
    if (have_posts()) :

        while (have_posts()) :
            the_post();
            ?>

            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

                <h1><?php the_title(); ?></h1>

                <div class="entry-content">
                    <?php the_content(); ?>
                </div>

            </article>

            <?php
        endwhile;

    else :
        ?>

        <p>No hay contenido disponible.</p>

    <?php endif; ?>

</main>

<?php
get_footer();