<?php
/**
 * Main plugin entry point.
 *
 * @package colbycomms/wp-site-preview
 */

if ( ! defined( 'ABSPATH' ) ) {
	return;
}

if ( ! defined( 'PROD' ) ) {
	define( 'PROD', true );
}

new ColbyComms\SitePreview\SitePreview();
