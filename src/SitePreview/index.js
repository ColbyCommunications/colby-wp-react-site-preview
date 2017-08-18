/* eslint react/no-danger: 0 */
import PropTypes from 'prop-types';
import React from 'react';

import styles from './SitePreview.module.scss';

class SitePreview extends React.Component {
  static propTypes = {
    siteId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      loaded: true,
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const url = `${window.COLBY_REST_URL}colby/site-preview/?site-id=${this
      .props.siteId}`;
    fetch(url).then((response) => response.json()).then((data) => {
      this.setState({ data });
    });
  }

  render() {
    if (this.state.data === null) {
      return null;
    }

    const { siteUrl, featuredImage, siteMenu, siteName } = this.state.data;

    return (
      <div
        className={[
          styles.SitePreview,
          this.state.loaded ? styles.loaded : '',
        ].join(' ')}
      >
        <a
          ref={(link) => {
            this.link = link;
          }}
          href={siteUrl}
          className={styles.preview}
          style={{ backgroundImage: `url('${featuredImage[0]}')` }}
        >
          <div className={styles.previewText}>
            <div className={styles.previewTextInner}>
              <h1 className={`${styles.previewH1} display-1`}>
                {siteName}
              </h1>
            </div>
          </div>
        </a>
        <nav className={styles.siteMenu}>
          {siteMenu.map((menuItem) => {
            if (menuItem.menu_item_parent !== '0') {
              return null;
            }

            if (menuItem.url === '#') {
              return null;
            }

            if (menuItem.url === `${siteUrl}/`) {
              return null;
            }

            return (
              <a
                href={menuItem.url}
                key={menuItem.ID}
                dangerouslySetInnerHTML={{ __html: menuItem.title }}
              />
            );
          })}
        </nav>
      </div>
    );
  }
}

export default SitePreview;
