<?php
/**
 * Plugin Name: Colby Site Preview
 * Description: A site preview component and WordPress shortcode
 * Author: John Watkins, Colby Communications
 */

add_action( 'wp_enqueue_scripts', function() {
	global $post;

	if ( has_shortcode( $post->post_content, 'site-preview' ) ) {
		$min = PROD === true ? '.min' : '';
		$dist = plugin_dir_url( __FILE__ ) . 'dist';

		$package_json = json_decode( file_get_contents( __DIR__ . '/package.json' ) )
		?: (object) [ 'version' => '1.0.1' ];

		wp_enqueue_script(
			'site-preview', "$dist/colby-wp-react-site-preview$min.js",
			[ 'react', 'react-dom', 'prop-types' ],
			$package_json->version,
			true
		);
	}
}, 10, 1 );



function render_site_preview_shortcode( $atts ) {
	if ( ! $atts['site-id'] ) {
		return '';
	}

	return "
<div
  data-site-preview
  data-site-id=\"{$atts['site-id']}\">
</div>
";
}

function add_site_preview_shortcode() {
	add_shortcode( 'site-preview', 'render_site_preview_shortcode' );
}
add_action( 'init', 'add_site_preview_shortcode' );

add_action( 'rest_api_init', function() {
	register_rest_route( 'colby', 'site-preview', [
		'methods' => 'GET',
		'callback' => function( $request ) {
			$params = $request->get_params();

			if ( ! $params['site-id'] ) {
				return [ 'error' => 'No site ID provided.' ];
			}

			$response = [];

			foreach ( explode( ',', $params['site-id'] ) as $site_id ) {

				switch_to_blog( $site_id );

				$page_on_front = get_option( 'page_on_front' );

				if ( ! $page_on_front ) {
					return [ 'error' => 'No page on front set.' ];
				}

				$data = [];

				$data['siteName'] = get_bloginfo( 'name' );
				$data['siteUrl'] = get_bloginfo( 'url' );
				$data['featuredImage'] = wp_get_attachment_image_src(
					get_post_thumbnail_id( $page_on_front ),
					'hero'
				);
				$data['siteMenu'] = wp_get_nav_menu_items( 'Site Menu' );
				$data['navBackground'] = get_field( 'nav_background_color', 'option' );
				$data['navColor'] = get_field( 'nav_color', 'option' );
				$data['accent'] = get_field( 'accent_color', 'option' );
				$data['accentText'] = get_field( 'accent_text', 'option' );
				$data['description'] = get_bloginfo( 'description' );

				$response[] = $data;
			}

			restore_current_blog();

			return $response;
		},
	] );
} );
