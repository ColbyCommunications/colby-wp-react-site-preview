/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = PropTypes;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Section = __webpack_require__(4);

var _Section2 = _interopRequireDefault(_Section);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/no-danger: 0 */


var SitePreview = function (_React$Component) {
  _inherits(SitePreview, _React$Component);

  function SitePreview(props) {
    _classCallCheck(this, SitePreview);

    var _this = _possibleConstructorReturn(this, (SitePreview.__proto__ || Object.getPrototypeOf(SitePreview)).call(this, props));

    _this.state = {
      data: null,
      loaded: true,
      dead: false
    };

    _this.fetchData = _this.fetchData.bind(_this);
    _this.maybeLoadFromCache = _this.maybeLoadFromCache.bind(_this);
    _this.fetchFromWeb = _this.fetchFromWeb.bind(_this);
    _this.handleWebFetchResponse = _this.handleWebFetchResponse.bind(_this);
    _this.die = _this.die.bind(_this);
    return _this;
  }

  _createClass(SitePreview, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (window.SITE_PREVIEW_REST_URL) {
        this.url = window.SITE_PREVIEW_REST_URL + '?site-id=' + this.props.siteId;
        this.fetchData();
      } else {
        this.die();
      }
    }
  }, {
    key: 'die',
    value: function die() {
      this.setState({ dead: true });
    }
  }, {
    key: 'maybeLoadFromCache',
    value: function maybeLoadFromCache() {
      var _this2 = this;

      return new Promise(function (resolve) {
        try {
          var savedData = JSON.parse(window.localStorage.getItem(_this2.url));
          if (savedData &&
          // The saved data is less than an hour old.
          Math.abs(savedData.date - new Date().getTime()) < 60 * 60 * 1000) {
            _this2.setState({ data: savedData.data }, function () {
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
  }, {
    key: 'handleWebFetchResponse',
    value: function handleWebFetchResponse(data) {
      var _this3 = this;

      this.setState({ data: data }, function () {
        window.localStorage.setItem(_this3.url, JSON.stringify({ data: data, date: new Date().getTime() }));
      });
    }
  }, {
    key: 'fetchFromWeb',
    value: function fetchFromWeb() {
      fetch(this.url, { cache: 'force-cache' }).then(function (response) {
        return response.json();
      }).then(this.handleWebFetchResponse);
    }
  }, {
    key: 'fetchData',
    value: function fetchData() {
      var _this4 = this;

      this.maybeLoadFromCache().then(function (wasLoadedFromCache) {
        if (!wasLoadedFromCache) {
          _this4.fetchFromWeb();
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.dead === true) {
        return null;
      }

      if (this.state.data === null) {
        return _react2.default.createElement('div', {
          style: { minHeight: '100vh' },
          dangerouslySetInnerHTML: { __html: this.props.innerHTML }
        });
      }

      return _react2.default.createElement(
        'div',
        null,
        this.state.data.map(function (section) {
          return _react2.default.createElement(_Section2.default, _extends({ key: Math.random().toString(36).substring(7) }, section));
        })
      );
    }
  }]);

  return SitePreview;
}(_react2.default.Component);

SitePreview.propTypes = {
  siteId: _propTypes2.default.string.isRequired,
  innerHTML: _propTypes2.default.string
};
SitePreview.defaultProps = {
  innerHTML: ''
};
exports.default = SitePreview;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/no-danger: 0 */


var CONTAINER_CLASSES = 'bigPanel sitePreview row no-gutters px-3 py-4 col-12 col-md-9';
var NAV_CLASSES = 'list-group list-group-primary col-md-3 flex-wrap' + ' flex-row flex-md-column justify-content-center';
var INNER_CLASSES = 'ml-auto mt-auto col-md-9 col-lg-7';
var ITEM_CLASSES = 'list-group-item-action list-group-item';

var Section = function (_React$Component) {
  _inherits(Section, _React$Component);

  function Section(props) {
    _classCallCheck(this, Section);

    var _this = _possibleConstructorReturn(this, (Section.__proto__ || Object.getPrototypeOf(Section)).call(this, props));

    _this.state = {
      hasBeenObserved: false
    };

    _this.maybeLazyload = _this.maybeLazyload.bind(_this);
    _this.handleIntersectionObserver = _this.handleIntersectionObserver.bind(_this);
    _this.makeVisible = _this.makeVisible.bind(_this);
    _this.shouldRender = _this.shouldRender.bind(_this);
    _this.renderMainBox = _this.renderMainBox.bind(_this);
    _this.renderNav = _this.renderNav.bind(_this);
    return _this;
  }

  _createClass(Section, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.maybeLazyload();
    }
  }, {
    key: 'makeVisible',
    value: function makeVisible(entries) {
      var entry = void 0;

      try {
        entry = entries[0];
      } catch (e) {
        entry = { isIntersecting: true };
      }

      if (entry.isIntersecting) {
        this.setState({ hasBeenObserved: true });
        this.observer = null;
      }
    }
  }, {
    key: 'shouldRender',
    value: function shouldRender(menuItem) {
      return menuItem.menu_item_parent !== '0' && menuItem.url === '#' && menuItem.url === this.props.siteUrl + '/';
    }
  }, {
    key: 'handleIntersectionObserver',
    value: function handleIntersectionObserver() {
      this.observer = new IntersectionObserver(this.makeVisible, {
        threshold: 0
      });

      this.observer.observe(this.rootElement);
    }
  }, {
    key: 'maybeLazyload',
    value: function maybeLazyload() {
      try {
        this.handleIntersectionObserver();
      } catch (e) {
        this.makeVisible();
      }
    }
  }, {
    key: 'renderMainBox',
    value: function renderMainBox() {
      var _this2 = this;

      var _props = this.props,
          siteUrl = _props.siteUrl,
          featuredImage = _props.featuredImage,
          siteName = _props.siteName,
          description = _props.description;


      var style = this.state.hasBeenObserved === true ? {
        backgroundImage: 'url(\'' + featuredImage[0] + '\')',
        opacity: 1,
        transition: 'opacity .4s'
      } : { opacity: 0, transition: 'opacity .4s' };

      return _react2.default.createElement(
        'a',
        {
          ref: function ref(link) {
            _this2.link = link;
          },
          href: siteUrl,
          style: style,
          className: CONTAINER_CLASSES
        },
        _react2.default.createElement(
          'div',
          { className: INNER_CLASSES },
          _react2.default.createElement(
            'h1',
            { className: 'display-1' },
            siteName
          ),
          _react2.default.createElement(
            'h2',
            { className: 'display-2' },
            description
          )
        )
      );
    }
  }, {
    key: 'renderNav',
    value: function renderNav() {
      var siteMenu = this.props.siteMenu;


      return _react2.default.createElement(
        'nav',
        { className: NAV_CLASSES },
        siteMenu.filter(this.shouldRender).map(function (menuItem) {
          return _react2.default.createElement('a', {
            className: ITEM_CLASSES,
            href: menuItem.url,
            key: menuItem.ID,
            dangerouslySetInnerHTML: { __html: menuItem.title }
          });
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        {
          className: 'row no-gutters mb-3 flex-row',
          ref: function ref(container) {
            _this3.rootElement = container;
          }
        },
        this.renderMainBox(),
        this.renderNav()
      );
    }
  }]);

  return Section;
}(_react2.default.Component);

Section.propTypes = {
  siteUrl: _propTypes2.default.string.isRequired,
  featuredImage: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.any), _propTypes2.default.bool]).isRequired,
  siteMenu: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
  siteName: _propTypes2.default.string.isRequired,
  description: _propTypes2.default.string.isRequired
};
exports.default = Section;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _SitePreview = __webpack_require__(2);

var _SitePreview2 = _interopRequireDefault(_SitePreview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = function init() {
  Array.prototype.forEach.call(document.querySelectorAll('[data-site-preview]'), function (container) {
    var siteId = container.getAttribute('data-site-id');
    if (siteId) {
      _reactDom2.default.render(_react2.default.createElement(_SitePreview2.default, { siteId: siteId, innerHTML: container.innerHTML }), container);
    }
  });
};

window.addEventListener('load', init);

/***/ })
/******/ ]);
//# sourceMappingURL=colby-wp-react-site-preview.js.map