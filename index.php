<?php
/**
 * Plugin Name: Colby Site Preview
 * Description: A site preview component and WordPress shortcode
 * Author: John Watkins, Colby Communications
 */

/**
 * Enqueues plugin scripts and styles if the shortcode is on the page.
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
			[ 'prop-types' ],
			$package_json->version,
			true
		);
	}
}

/**
 * Renders the site preview shortcode from the required site-id $attribute.
 *
 * @param array $atts The shortcode attributes.
 * @return string The output.
 */
function render_site_preview_shortcode( $atts = [] ) {
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

/**
 * Gets all site-related data used in the preview.
 *
 * @param int|string $site_id The site ID.
 * @return array The site data.
 */
function assemble_site_preview_data( $site_id ) {
	switch_to_blog( $site_id );

	$page_on_front = get_option( 'page_on_front' );

	if ( ! $page_on_front ) {
		return [];
	}

	return [
		'siteName' => get_bloginfo( 'name' ),
		'siteUrl' => get_bloginfo( 'url' ),
		'featuredImage' => wp_get_attachment_image_src(
			get_post_thumbnail_id( $page_on_front ),
			'medium-hero'
		),
		'siteMenu' => wp_get_nav_menu_items( 'Site Menu' ),
		'description' => get_bloginfo( 'description' ),
	];
}

/**
 * Handles the REST request.
 *
 * @param WP_REST_Request $request The request object.
 * @return WP_REST_Response The response object.
 */
function handle_site_preview_rest_route_request( WP_REST_Request $request ) {
	$params = $request->get_params();
	$params['site-id'] = str_replace( ' ', '', $params['site-id'] );

	if ( ! $params['site-id'] ) {
		return new WP_REST_Response(
			[
				'error' => 'No site ID provided.',
			],
			412
		);
	}

	if ( empty( $_GET['clear-preview-cache'] ) ) {
		$saved_response = get_transient( str_replace( ',', '', "preview{$params['site-id']}" ) );
		if ( $saved_response ) {
			return new WP_REST_Response(
				is_serialized( $saved_response )
				? unserialize( $saved_response )
				: $saved_response
			);
		}
	}

	$response = array_map( 'assemble_site_preview_data', explode( ',', $params['site-id'] ) );

	restore_current_blog();

	set_transient( str_replace( ',', '', "preview{$params['site-id']}" ), $response, 60 * 60 * 1000 );

	return new WP_REST_Response(
		$response,
		200,
		[
			'Cache-Control' => 'public, max-age=' . (string) ( 60 * 60 * 1000 ),
		]
	);
}

/**
 * Registers the rest endpoint for site preview data.
 */
function register_site_preview_rest_route() {
	register_rest_route(
		'colby', 'site-preview', [
			'methods' => 'GET',
			'callback' => 'handle_site_preview_rest_route_request',
		]
	);
}

/**
 * Renders global Javascript variables.
 */
function render_site_preview_footer_globals() {
	if ( array_key_exists( 'footer_javascript' , $GLOBALS['wp_filter'] ) ) {
		add_filter(
			'footer_javascript_window_globals', function( $globals ) {
				$globals['SITE_PREVIEW_REST_URL'] = esc_url( get_rest_url( null, 'colby/site-preview' ) );
				return $globals;
			}
		);
	} else {
		add_action(
			'wp_footer', function() {
				ob_start();
				?>
<script>
window.SITE_PREVIEW_REST_URL = '<?php echo esc_url( get_rest_url( null, 'colby/site-preview' ) ); ?>';
</script>
			<?php
				echo ob_get_clean();
			}
		);
	}
}

add_action(
	'init', function() {
		/**
		 * [site-preview]
		 *
		 * Renders a preview of another site consisting of a the front page featured image and navigation.
		 * ##### Attributes #####
		 * `site-id` _(required)_ A site ID or a comma-separated list of site IDs.
		 */
		add_shortcode( 'site-preview', 'render_site_preview_shortcode' );
	}
);
add_action( 'template_redirect', 'render_site_preview_footer_globals' );
add_action( 'rest_api_init', 'register_site_preview_rest_route' );
add_action( 'wp_enqueue_scripts', 'enqueue_site_preview_scripts' );
