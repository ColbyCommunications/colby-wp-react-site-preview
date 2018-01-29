<?php
/**
 * Shortcode.php
 *
 * @package colbycomms/wp-site-preview
 */

namespace ColbyComms\SitePreview;

/**
 * Shortcode.
 */
class Shortcode {
	const SHORTCODE_TAG = 'site-preview';

	/**
	 * Hooks the shortcode callback to the tag.
	 */
	public function __construct() {
		add_shortcode( self::SHORTCODE_TAG, [ __CLASS__, 'render_shortcode' ] );
	}

	/**
	 * Gets all site-related data used in the preview.
	 *
	 * @param int|string $site_id The site ID.
	 * @return array The site data.
	 */
	public static function assemble_site_preview_data( $site_id ) : array {
		if ( function_exists( 'switch_to_blog' ) ) {
			switch_to_blog( $site_id );
		}

			$page_on_front = get_option( 'page_on_front' );

		if ( ! $page_on_front ) {
			return [];
		}

		if ( function_exists( 'restore_current_blog' ) ) {
			restore_current_blog();
		}

			return [
				'site_name' => get_bloginfo( 'name' ),
				'site_url' => get_bloginfo( 'url' ),
				'featured_image' => wp_get_attachment_image_src(
					get_post_thumbnail_id( $page_on_front ),
					'medium-hero'
				),
				'site_menu' => wp_get_nav_menu_items( 'Site Menu' ),
				'description' => get_bloginfo( 'description' ),
			];
	}

	/**
	 * Provides the shortcode callback.
	 *
	 * @param array $atts Shortcode attributes.
	 * @return string HTML.
	 */
	public static function render_shortcode( array $atts = [] ) : string {
		$atts['site-id'] = $atts['site-id'] ?? '1';

			return self::render(
				self::assemble_site_preview_data( $atts['side-id'] )
			);
	}

	/**
	 * Renders a single nav item.
	 *
	 * @param object|array $item A nav item object.
	 * @return string HTML.
	 */
	public static function render_nav_item( $item ) : string {
		$item = is_array( $item ) ? (object) $item : $item;

		return "<a class=\"site-preview__nav-item\" href=\"{$item->url}\">
			{$item->title}
		</a>";
	}

	/**
	 * Renders the block.
	 *
	 * @param array $atts Attributes to use in rendering.
	 * @return string HTML.
	 */
	public static function render( array $atts = [] ) : string {
		$nav_items = implode(
			'',
			array_map( [ __CLASS__, 'render_nav_item' ], $atts['site_menu'] )
		);

		return "
	<div class=\"site-preview\" >
		<a href=\"{$atts['site_url']}\" class=\"site-preview__main\" style=\"background-image: url('{$atts['featured_image'][0]}')\">
			<div class=\"site-preview__main-inner\">
				<h1 class=\"site-preview__title\">
					{$atts['site_name']}
				</h1>
				<h2 class=\"site-preview__description\">
					{$atts['description']}
				</h2>
			</div>
		</a>
		<nav class=\"site-preview__nav\">
			$nav_items
	  </nav>
	</div>
	";
	}
}
