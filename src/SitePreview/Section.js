/* eslint react/no-danger: 0 */
import React from 'react';
import PropTypes from 'prop-types';

const CONTAINER_CLASSES =
  'bigPanel sitePreview row no-gutters px-3 py-4 col-12 col-md-9';
const NAV_CLASSES =
  'list-group list-group-primary col-md-3 flex-wrap' +
  ' flex-row flex-md-column justify-content-center';
const INNER_CLASSES = 'ml-auto mt-auto col-md-9 col-lg-7';
const ITEM_CLASSES = 'list-group-item-action list-group-item';

class Section extends React.Component {
  static propTypes = {
    siteUrl: PropTypes.string.isRequired,
    featuredImage: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.any),
      PropTypes.bool,
    ]).isRequired,
    siteMenu: PropTypes.arrayOf(PropTypes.any).isRequired,
    siteName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      hasBeenObserved: false,
    };

    this.maybeLazyload = this.maybeLazyload.bind(this);
    this.handleIntersectionObserver = this.handleIntersectionObserver.bind(
      this
    );
    this.makeVisible = this.makeVisible.bind(this);
    this.shouldRender = this.shouldRender.bind(this);
    this.renderMainBox = this.renderMainBox.bind(this);
    this.renderNav = this.renderNav.bind(this);
  }

  componentDidMount() {
    this.maybeLazyload();
  }

  makeVisible(entries) {
    let entry;

    try {
      entry = entries[0];
    } catch (e) {
      entry = { isIntersecting: true };
    }

    if (entry.isIntersecting !== false) { // isIntersecting is undefined in Edge, so check for false rather than true. 
      this.setState({ hasBeenObserved: true });
      this.observer = null;
    }
  }

  shouldRender(menuItem) {
    return !(
      menuItem.menu_item_parent !== '0' ||
      menuItem.url === '#' ||
      menuItem.url === `${this.props.siteUrl}/`
    );
  }

  handleIntersectionObserver() {
    this.observer = new IntersectionObserver(this.makeVisible, {
      threshold: 0,
    });

    this.observer.observe(this.rootElement);
  }

  maybeLazyload() {
    try {
      this.handleIntersectionObserver();
    } catch (e) {
      this.makeVisible();
    }
  }

  renderMainBox() {
    const { siteUrl, featuredImage, siteName, description } = this.props;

    const style =
      this.state.hasBeenObserved === true
        ? {
          backgroundImage: `url('${featuredImage[0]}')`,
          opacity: 1,
          transition: 'opacity .4s',
        }
        : { opacity: 0, transition: 'opacity .4s' };

    return (
      <a
        ref={(link) => {
          this.link = link;
        }}
        href={siteUrl}
        style={style}
        className={CONTAINER_CLASSES}
      >
        <div className={INNER_CLASSES}>
          <h1 className="display-1">
            {siteName}
          </h1>
          <h2 className="display-2">
            {description}
          </h2>
        </div>
      </a>
    );
  }

  renderNav() {
    const { siteMenu } = this.props;

    return (
      <nav className={NAV_CLASSES}>
        {siteMenu
          .filter(this.shouldRender)
          .map((menuItem) =>
            (<a
              className={ITEM_CLASSES}
              href={menuItem.url}
              key={menuItem.ID}
              dangerouslySetInnerHTML={{ __html: menuItem.title }}
            />)
          )}
      </nav>
    );
  }

  render() {
    return (
      <div
        className="row no-gutters mb-3 flex-row"
        ref={(container) => {
          this.rootElement = container;
        }}
      >
        {this.renderMainBox()}
        {this.renderNav()}
      </div>
    );
  }
}

export default Section;
