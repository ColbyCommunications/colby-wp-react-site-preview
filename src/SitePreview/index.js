/* eslint react/no-danger: 0 */
import PropTypes from 'prop-types';
import React from 'react';

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
    };

    this.fetchData = this.fetchData.bind(this);
    this.renderSection = this.renderSection.bind(this);
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

  renderSection(section) {
    const { siteUrl, featuredImage, siteMenu, siteName, description } = section;

    return (
      <div
        className="row no-gutters mb-3 flex-row"
        key={Math.random().toString(36).substring(7)}
      >
        <a
          ref={(link) => {
            this.link = link;
          }}
          href={siteUrl}
          style={{ backgroundImage: `url('${featuredImage[0]}')` }}
          className={
            'bigPanel sitePreview row no-gutters px-3 py-4 col-12 col-md-9'
          }
        >
          <div className="ml-auto mt-auto col-md-9 col-lg-7">
            <h1 className="display-1">
              {siteName}
            </h1>
            <h2 className="display-2">
              {description}
            </h2>
          </div>
        </a>

        <nav
          className={
            'list-group list-group-primary col-md-3 flex-wrap' +
            ' flex-row flex-md-column justify-content-center'
          }
        >
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
                className="list-group-item-action list-group-item"
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

  render() {
    if (this.state.data === null) {
      return <div dangerouslySetInnerHTML={{ __html: this.props.innerHTML }} />;
    }

    return (
      <div>
        {this.state.data.map(this.renderSection)}
      </div>
    );
  }
}

export default SitePreview;
