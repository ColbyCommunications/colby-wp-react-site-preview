<?php
/**
 * SitePreview.php
 *
 * @package colbycomms/wp-site-preview
 */

namespace ColbyComms\SitePreview;

/**
 * Main plugin class.
 */
class SitePreview {
	/**
	 * Plugin text domain.
	 *
	 * @var string
	 */
	const TEXT_DOMAIN = 'wp-site-preview';

	/**
	 * Plugin version.
	 *
	 * @var string
	 */
	const VERSION = '2.0.0';

	/**
	 * String preceding this plugin's filter.
	 *
	 * @var string
	 */
	const FILTER_NAMESPACE = 'colbycomms__site_preview__';

	/**
	 * Filter name for whether to enqueue this plugin's style.
	 *
	 * @var string
	 */
	const ENQUEUE_STYLE_FILTER = FILTER_NAMESPACE . 'enqueue_style';

	/**
	 * Filter name for this plugin's dist directory.
	 *
	 * @var string
	 */
	const DIST_DIRECTORY_FILTER = FILTER_NAMESPACE . 'dist_directory';

	/**
	 * Instantiates plugin.
	 */
	public function __construct() {
		add_action(
			'init', function() {
				new Shortcode();
			}
		);

		add_action( 'after_setup_theme', [ __CLASS__, 'add_thumbnail_size' ] );
		add_action( 'wp_enqueue_scripts', [ __CLASS__, 'maybe_enqueue_style' ] );
	}

	/**
	 * Adds the medium-hero image size used in the size preview.
	 *
	 * @return void
	 */
	public static function add_thumbnail_size() {
		if ( ! has_image_size( 'medium-hero' ) ) {
			add_image_size( 'medium-hero', 1300, 528, true );
		}
	}

	/**
	 * Enqueues plugin scripts and styles if the shortcode is on the page.
	 */
	public static function maybe_enqueue_style() {
		if ( apply_filters( self::ENQUEUE_STYLE_FILTER, true ) !== true ) {
			return;
		}

		$min  = defined( 'PROD' ) && PROD === true ? '.min' : '';
		$dist = self::get_dist_directory();

		wp_enqueue_style(
			self::TEXT_DOMAIN,
			"$dist/" . self::TEXT_DOMAIN . "$min.css",
			[],
			self::VERSION
		);
	}

	/**
	 * Gets the plugin's dist/ directory URL, whether this package is installed as a plugin
	 * or in a theme via composer. If the package is in neither of those places and the filter
	 * is not used, this whole thing will fail.
	 *
	 * @return string The URL.
	 */
	public static function get_dist_directory() : string {
		/**
		 * Filters the URL location of the /dist directory.
		 *
		 * @param string The URL.
		 */
		$dist = apply_filters( self::DIST_DIRECTORY_FILTER, '' );

		if ( ! empty( $dist ) ) {
			return $dist;
		}

		if ( file_exists( dirname( __DIR__, 3 ) . '/plugins' ) ) {
			return plugin_dir_url( dirname( __DIR__ ) . '/index.php' ) . '/dist/';
		}

		return get_template_directory_uri() . '/vendor/colbycomms/' . self::TEXT_DOMAIN . '/dist/';
	}
}
