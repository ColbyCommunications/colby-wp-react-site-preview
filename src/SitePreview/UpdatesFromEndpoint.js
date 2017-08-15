import PropTypes from 'prop-types';
import React from 'react';
import Updates from './Updates';

class UpdatesFromEndpoint extends React.Component {
  static propTypes = {
    moreLink: PropTypes.string,
    updatesEndpoint: PropTypes.string.isRequired,
  };

  static defaultProps = {
    moreLink: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      updates: [],
    };

    this.fetchUpdates = this.fetchUpdates.bind(this);
  }

  componentDidMount() {
    this.fetchUpdates();
  }

  fetchUpdates() {
    const url = this.props.updatesEndpoint.replace(
      '{{siteUrl}}',
      window.COLBY_SITE_URL
    );

    fetch(url).then((response) => response.json()).then((updates) => {
      this.setState({ updates });
    });
  }

  render() {
    return (
      <Updates
        {...this.props}
        updates={this.state.updates}
        moreLink={
          this.props.moreLink
            ? this.props.moreLink.replace('{{siteUrl}}', window.COLBY_SITE_URL)
            : null
        }
      />
    );
  }
}

export default UpdatesFromEndpoint;
