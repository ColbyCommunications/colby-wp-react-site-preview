<?php
/**
 * Plugin Name: Colby Site Preview
 * Description: A site preview component and WordPress shortcode
 * Author: John Watkins, Colby Communications
 */

function enqueue_site_preview_scripts() {
	global $post;

	if ( has_shortcode( $post->post_content, 'site-preview' ) ) {
		$min = PROD === true ? '.min' : '';
		$dist = plugin_dir_url( __FILE__ ) . 'dist';

		$package_json = json_decode( file_get_contents( __DIR__ . '/package.json' ) )
		?: (object) [
			'version' => '1.0.1',
		];

		wp_enqueue_script(
			'site-preview', "$dist/colby-wp-react-site-preview$min.js",
			[ 'react', 'react-dom', 'prop-types' ],
			$package_json->version,
			true
		);
	}
}

add_action( 'wp_enqueue_scripts', 'enqueue_site_preview_scripts' );

function render_site_preview_shortcode( $atts ) {
	if ( ! $atts['site-id'] ) {
		return '';
	}

	return "
<div
  data-site-preview
  data-site-id=\"{$atts['site-id']}\">
	<div class='animated-ellipsis-container'>
		<div class='animated-ellipsis'>
			<span>.</span><span>.</span><span>.</span>
		</div>
	</div>
</div>
";
}


add_action(
	'init', function() {
		add_shortcode( 'site-preview', 'render_site_preview_shortcode' );
	}
);

function handle_site_preview_rest_route_request( $request ) {
	$params = $request->get_params();

	if ( ! $params['site-id'] ) {
		return [
			'error' => 'No site ID provided.',
		];
	}

	$saved_response = get_transient( str_replace( ',', '', "preview{$params['site-id']}" ) );

	if ( $saved_response ) {
		return new WP_REST_Response(
			is_serialized( $saved_response )
			 ? unserialize( $saved_response )
			: $saved_response
		);
	}

	$response = [];

	foreach ( explode( ',', $params['site-id'] ) as $site_id ) {

		switch_to_blog( $site_id );

		$page_on_front = get_option( 'page_on_front' );

		if ( ! $page_on_front ) {
			return [
				'error' => 'No page on front set.',
			];
		}

		$data = [];

		$data['siteName'] = get_bloginfo( 'name' );
		$data['siteUrl'] = get_bloginfo( 'url' );
		$data['featuredImage'] = wp_get_attachment_image_src(
			get_post_thumbnail_id( $page_on_front ),
			'hero'
		);
		$data['siteMenu'] = wp_get_nav_menu_items( 'Site Menu' );
		$data['description'] = get_bloginfo( 'description' );

		$response[] = $data;
	}

	restore_current_blog();

	set_transient(
		str_replace( ',', '', "preview{$params['site-id']}" ),
		$response,
		60 * 60
	);

	return new WP_REST_Response( $response );
}

function register_site_preview_rest_route() {
	register_rest_route(
		'colby', 'site-preview', [
			'methods' => 'GET',
			'callback' => 'handle_site_preview_rest_route_request',
		]
	);
}

add_action( 'rest_api_init', 'register_site_preview_rest_route' );
