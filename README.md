# colby-wp-site-preview

A block displaying information about a WordPress site, using its homepage, it's front page's featured image, and its   site menu. Built for Colby College sites.

[Demo](https://colbycommunications.github.io/wp-site-preview/demo/)

## Usage

Clone this repository into wp-content/plugins or require it via Composer with:

```
composer require colbycomms/wp-site-preview
```

Place the following shortcode in a WordPress post/page:

```
[site-preview site-id="242"]
```

### Attribute

#### `site-id` (numeric)

The ID of any site in a WordPress multisite network. Defaults to `1`.
