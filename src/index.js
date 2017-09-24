import React from 'react';
import ReactDOM from 'react-dom';
import SitePreview from './SitePreview';

const init = () => {
  Array.prototype.forEach.call(
    document.querySelectorAll('[data-site-preview]'),
    (container) => {
      const siteId = container.getAttribute('data-site-id');
      if (siteId) {
        ReactDOM.render(
          <SitePreview siteId={siteId} innerHTML={container.innerHTML} />,
          container
        );
      }
    }
  );
};

window.addEventListener('load', init);
