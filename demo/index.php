<?php

const PROD = false;

require dirname( __DIR__ ) . '/vendor/autoload.php';

$dummy_data = json_decode( '{
	"site_name": "Residential Life",
	"site_url": "https://www.colby.edu/residentiallife",
	"featured_image": [
		"https://www.colby.edu/life/wp-content/uploads/sites/228/2013/12/residential-life-20160503_Davis_Colby_1949-650-1300x528.jpg",
		1300,
		528,
		true
	],
	"site_menu": [
		{
		"ID": 2613,
		"post_author": "3945",
		"post_date": "2017-08-24 07:49:14",
		"post_date_gmt": "2017-08-24 11:49:14",
		"post_content": " ",
		"post_title": "",
		"post_excerpt": "",
		"post_status": "publish",
		"comment_status": "closed",
		"ping_status": "closed",
		"post_password": "",
		"post_name": "2613",
		"to_ping": "",
		"pinged": "",
		"post_modified": "2017-09-12 10:25:35",
		"post_modified_gmt": "2017-09-12 14:25:35",
		"post_content_filtered": "",
		"post_parent": 0,
		"guid": "http://www.colby.edu/temp-residentiallife/2017/08/24/",
		"menu_order": 1,
		"post_type": "nav_menu_item",
		"post_mime_type": "",
		"comment_count": "0",
		"filter": "raw",
		"db_id": 2613,
		"menu_item_parent": "0",
		"object_id": "95",
		"object": "page",
		"type": "post_type",
		"type_label": "Page",
		"url": "https://www.colby.edu/residentiallife/campus-housing/",
		"title": "Campus Housing",
		"target": "",
		"attr_title": "",
		"description": "",
		"classes": [""],
		"xfn": ""
		},
		{
		"ID": 2615,
		"post_author": "3945",
		"post_date": "2017-08-24 07:50:09",
		"post_date_gmt": "2017-08-24 11:50:09",
		"post_content": "",
		"post_title": "Student Room Draw Portal",
		"post_excerpt": "",
		"post_status": "publish",
		"comment_status": "closed",
		"ping_status": "closed",
		"post_password": "",
		"post_name": "student-housing-draw-portal",
		"to_ping": "",
		"pinged": "",
		"post_modified": "2017-09-12 10:25:35",
		"post_modified_gmt": "2017-09-12 14:25:35",
		"post_content_filtered": "",
		"post_parent": 0,
		"guid":
			"http://www.colby.edu/temp-residentiallife/2017/08/24/student-housing-draw-portal/",
		"menu_order": 2,
		"post_type": "nav_menu_item",
		"post_mime_type": "",
		"comment_count": "0",
		"filter": "raw",
		"db_id": 2615,
		"menu_item_parent": "0",
		"object_id": "2615",
		"object": "custom",
		"type": "custom",
		"type_label": "Custom Link",
		"title": "Student Room Draw Portal",
		"url": "https://colby-residence.symplicity.com/index.php/pid403112",
		"target": "",
		"attr_title": "",
		"description": "",
		"classes": [""],
		"xfn": ""
		},
		{
		"ID": 2614,
		"post_author": "3945",
		"post_date": "2017-08-24 07:50:09",
		"post_date_gmt": "2017-08-24 11:50:09",
		"post_content": "",
		"post_title": "First-Year Information",
		"post_excerpt": "",
		"post_status": "publish",
		"comment_status": "closed",
		"ping_status": "closed",
		"post_password": "",
		"post_name": "first-year-information",
		"to_ping": "",
		"pinged": "",
		"post_modified": "2017-09-12 10:25:35",
		"post_modified_gmt": "2017-09-12 14:25:35",
		"post_content_filtered": "",
		"post_parent": 0,
		"guid":
			"http://www.colby.edu/temp-residentiallife/2017/08/24/first-year-information/",
		"menu_order": 3,
		"post_type": "nav_menu_item",
		"post_mime_type": "",
		"comment_count": "0",
		"filter": "raw",
		"db_id": 2614,
		"menu_item_parent": "0",
		"object_id": "2614",
		"object": "custom",
		"type": "custom",
		"type_label": "Custom Link",
		"title": "First-Year Information",
		"url":
			"http://www.colby.edu/life/incoming-first-year-and-transfer-students/",
		"target": "",
		"attr_title": "",
		"description": "",
		"classes": [""],
		"xfn": ""
		},
		{
		"ID": 2612,
		"post_author": "3945",
		"post_date": "2017-08-24 07:49:14",
		"post_date_gmt": "2017-08-24 11:49:14",
		"post_content": " ",
		"post_title": "",
		"post_excerpt": "",
		"post_status": "publish",
		"comment_status": "closed",
		"ping_status": "closed",
		"post_password": "",
		"post_name": "2612",
		"to_ping": "",
		"pinged": "",
		"post_modified": "2017-09-12 10:25:35",
		"post_modified_gmt": "2017-09-12 14:25:35",
		"post_content_filtered": "",
		"post_parent": 0,
		"guid": "http://www.colby.edu/temp-residentiallife/2017/08/24/",
		"menu_order": 4,
		"post_type": "nav_menu_item",
		"post_mime_type": "",
		"comment_count": "0",
		"filter": "raw",
		"db_id": 2612,
		"menu_item_parent": "0",
		"object_id": "61",
		"object": "page",
		"type": "post_type",
		"type_label": "Page",
		"url":
			"https://www.colby.edu/residentiallife/faculty-in-residence-program/",
		"title": "Faculty-in-Residence Program",
		"target": "",
		"attr_title": "",
		"description": "",
		"classes": [""],
		"xfn": ""
		}
	],
	"description": "Make yourself at home."
}',
true
);

?><!DOCTYPE html>
<html lang="en">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, user-scalable=0" />
<link rel="stylesheet" href="../dist/wp-react-site-preview.css" />
<title>
	WP React Site Preview demo
</title>
<style>
*, *:after, *:before {
	box-sizing: border-box;
}

main {
	font-family: sans-serif;
	max-width: 992px;
	margin: 0 auto;
	padding: 3rem 0;
}
</style>
<main>
	<?php echo ColbyComms\SitePreview\Shortcode::render( $dummy_data ); ?>
</main>
<script src="../dist/wp-react-site-preview.js"></script>