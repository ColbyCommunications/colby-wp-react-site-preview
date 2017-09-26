/* eslint react/no-danger: 0 */
import PropTypes from 'prop-types';
import React from 'react';
import Section from './Section';

class SitePreview extends React.Component {
  static propTypes = {
    siteId: PropTypes.string.isRequired,
    innerHTML: PropTypes.string,
  };

  static defaultProps = {
    innerHTML: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      loaded: true,
      dead: false,
    };

    this.fetchData = this.fetchData.bind(this);
    this.maybeLoadFromCache = this.maybeLoadFromCache.bind(this);
    this.fetchFromWeb = this.fetchFromWeb.bind(this);
    this.handleWebFetchResponse = this.handleWebFetchResponse.bind(this);
    this.die = this.die.bind(this);
  }

  componentDidMount() {
    if (window.SITE_PREVIEW_REST_URL) {
      this.url = `${window.SITE_PREVIEW_REST_URL}?site-id=${this.props.siteId}`;
      this.fetchData();
    } else {
      this.die();
    }
  }

  die() {
    this.setState({ dead: true });
  }

  maybeLoadFromCache() {
    return new Promise((resolve) => {
      if (window.location.href.indexOf('clear-preview-cache') > -1) {
        resolve(false);
      }

      try {
        const savedData = JSON.parse(window.localStorage.getItem(this.url));
        if (
          savedData &&
          // The saved data is less than an hour old.
          Math.abs(savedData.date - new Date().getTime()) < 60 * 60 * 1000
        ) {
          this.setState({ data: savedData.data }, () => {
            resolve(true);
          });
        } else {
          resolve(false);
        }
      } catch (e) {
        resolve(false);
      }
    });
  }

  handleWebFetchResponse(data) {
    this.setState({ data }, () => {
      window.localStorage.setItem(
        this.url,
        JSON.stringify({ data, date: new Date().getTime() })
      );
    });
  }

  fetchFromWeb() {
    fetch(this.url, { cache: 'force-cache' })
      .then((response) => response.json())
      .then(this.handleWebFetchResponse);
  }

  fetchData() {
    this.maybeLoadFromCache().then((wasLoadedFromCache) => {
      if (!wasLoadedFromCache) {
        this.fetchFromWeb();
      }
    });
  }

  render() {
    if (this.state.dead === true) {
      return null;
    }

    if (this.state.data === null) {
      return (
        <div
          style={{ minHeight: '100vh' }}
          dangerouslySetInnerHTML={{ __html: this.props.innerHTML }}
        />
      );
    }

    return (
      <div>
        {this.state.data.map((section) =>
          <Section key={Math.random().toString(36).substring(7)} {...section} />
        )}
      </div>
    );
  }
}

export default SitePreview;
