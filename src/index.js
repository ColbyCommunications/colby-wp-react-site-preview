import React from 'react';
import ReactDOM from 'react-dom';
import SitePreview from './SitePreview';

const init = () => {
  Array.prototype.forEach.call(
    document.querySelectorAll('[data-site-preview]'),
    (container) => {
      ReactDOM.render(
        <SitePreview {...container.dataset} innerHTML={container.innerHTML} />,
        container
      );
    }
  );
};

window.addEventListener('load', init);
