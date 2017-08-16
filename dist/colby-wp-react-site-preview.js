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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _rightArrow = __webpack_require__(4);

var _rightArrow2 = _interopRequireDefault(_rightArrow);

var _UpdatesFromEndpoint = __webpack_require__(6);

var _UpdatesFromEndpoint2 = _interopRequireDefault(_UpdatesFromEndpoint);

var _SitePreviewModule = __webpack_require__(8);

var _SitePreviewModule2 = _interopRequireDefault(_SitePreviewModule);

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
      loaded: true
    };

    _this.fetchData = _this.fetchData.bind(_this);
    return _this;
  }

  _createClass(SitePreview, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.fetchData();
    }
  }, {
    key: 'fetchData',
    value: function fetchData() {
      var _this2 = this;

      var url = window.COLBY_REST_URL + 'colby/site-preview/?site-id=' + this.props.siteId;
      fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        _this2.setState({ data: data });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (this.state.data === null) {
        return null;
      }

      var _state$data = this.state.data,
          siteUrl = _state$data.siteUrl,
          featuredImage = _state$data.featuredImage,
          siteMenu = _state$data.siteMenu,
          siteName = _state$data.siteName,
          accent = _state$data.accent,
          accentText = _state$data.accentText;


      return _react2.default.createElement(
        'section',
        {
          style: { backgroundImage: 'url(\'' + featuredImage[0] + '\')' },
          className: [_SitePreviewModule2.default.SitePreview, this.state.loaded ? _SitePreviewModule2.default.loaded : ''].join(' ')
        },
        _react2.default.createElement(
          'a',
          {
            ref: function ref(link) {
              _this3.link = link;
            },
            href: siteUrl,
            className: _SitePreviewModule2.default.preview,
            style: { backgroundImage: 'url(\'' + featuredImage[0] + '\')' }
          },
          _react2.default.createElement(
            'div',
            { className: _SitePreviewModule2.default.previewText },
            _react2.default.createElement(
              'div',
              { className: _SitePreviewModule2.default.previewTextInner },
              _react2.default.createElement(
                'h1',
                { className: _SitePreviewModule2.default.previewH1 },
                siteName
              ),
              _react2.default.createElement(
                'button',
                { className: _SitePreviewModule2.default.previewButton },
                _react2.default.createElement(_rightArrow2.default, null)
              )
            )
          )
        ),
        _react2.default.createElement(
          'nav',
          { className: _SitePreviewModule2.default.siteMenu },
          siteMenu.map(function (menuItem) {
            if (menuItem.menu_item_parent !== '0') {
              return null;
            }

            if (menuItem.url === '#') {
              return null;
            }

            if (menuItem.url === siteUrl + '/') {
              return null;
            }

            return _react2.default.createElement('a', {
              href: menuItem.url,
              key: menuItem.ID,
              dangerouslySetInnerHTML: { __html: menuItem.title }
            });
          })
        ),
        _react2.default.createElement(_UpdatesFromEndpoint2.default, {
          accent: accent,
          accentText: accentText,
          updatesEndpoint: this.props.updatesEndpoint,
          moreLink: this.props.updatesMoreLink
        })
      );
    }
  }]);

  return SitePreview;
}(_react2.default.Component);

SitePreview.propTypes = {
  siteId: _propTypes2.default.string.isRequired,
  updatesEndpoint: _propTypes2.default.string.isRequired,
  updatesMoreLink: _propTypes2.default.string
};
SitePreview.defaultProps = {
  updatesMoreLink: null
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

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint max-len: 0 */
var RightArrow = function RightArrow(_ref) {
  var style = _ref.style;
  return _react2.default.createElement(
    'svg',
    {
      width: '1792',
      height: '1792',
      viewBox: '0 0 1792 1792',
      xmlns: 'http://www.w3.org/2000/svg'
    },
    _react2.default.createElement(
      'title',
      null,
      'Right'
    ),
    _react2.default.createElement('path', {
      fill: 'currentColor',
      d: 'M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z'
    })
  );
};

RightArrow.defaultProps = {
  style: {}
};

RightArrow.propTypes = {
  style: _propTypes2.default.objectOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]))
};

exports.default = RightArrow;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _dateFns = __webpack_require__(10);

var _dateFns2 = _interopRequireDefault(_dateFns);

var _UpdatesModule = __webpack_require__(9);

var _UpdatesModule2 = _interopRequireDefault(_UpdatesModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint react/no-danger: 0 */
var Updates = function Updates(_ref) {
  var extraClass = _ref.extraClass,
      moreLink = _ref.moreLink,
      style = _ref.style,
      title = _ref.title,
      updates = _ref.updates,
      accent = _ref.accent,
      accentText = _ref.accentText;
  return _react2.default.createElement(
    'div',
    {
      className: (style === 'card' ? 'card' : '') + ' ' + _UpdatesModule2.default.Updates + ' ' + _UpdatesModule2.default[extraClass]
    },
    _react2.default.createElement(
      'div',
      {
        className: (style === 'card' ? 'card-body' : '') + ' ' + _UpdatesModule2.default.innerUpdates
      },
      _react2.default.createElement(
        'div',
        { className: _UpdatesModule2.default.badgeContainer },
        _react2.default.createElement('span', {
          className: 'badge',
          dangerouslySetInnerHTML: { __html: title },
          style: { color: accentText, backgroundColor: accent }
        })
      ),
      (updates || []).map(function (update) {
        return _react2.default.createElement(
          'div',
          { key: update.id, className: _UpdatesModule2.default.update },
          _react2.default.createElement('a', {
            href: update.link,
            dangerouslySetInnerHTML: { __html: update.title.rendered }
          }),
          _react2.default.createElement(
            'div',
            { className: _UpdatesModule2.default.updateDate },
            _dateFns2.default.format(update.date, 'MMMM DD, YYYY')
          )
        );
      })
    ),
    moreLink ? _react2.default.createElement(
      'a',
      { className: _UpdatesModule2.default.moreLink, href: moreLink },
      'More'
    ) : null
  );
};

Updates.propTypes = {
  accent: _propTypes2.default.string,
  accentText: _propTypes2.default.string,
  extraClass: _propTypes2.default.string,
  moreLink: _propTypes2.default.string,
  style: _propTypes2.default.string,
  title: _propTypes2.default.string,
  updates: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired
};

Updates.defaultProps = {
  accent: null,
  accentText: null,
  extraClass: '',
  moreLink: null,
  style: null,
  title: 'Updates'
};

exports.default = Updates;

/***/ }),
/* 6 */
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

var _Updates = __webpack_require__(5);

var _Updates2 = _interopRequireDefault(_Updates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UpdatesFromEndpoint = function (_React$Component) {
  _inherits(UpdatesFromEndpoint, _React$Component);

  function UpdatesFromEndpoint(props) {
    _classCallCheck(this, UpdatesFromEndpoint);

    var _this = _possibleConstructorReturn(this, (UpdatesFromEndpoint.__proto__ || Object.getPrototypeOf(UpdatesFromEndpoint)).call(this, props));

    _this.state = {
      updates: []
    };

    _this.fetchUpdates = _this.fetchUpdates.bind(_this);
    return _this;
  }

  _createClass(UpdatesFromEndpoint, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.fetchUpdates();
    }
  }, {
    key: 'fetchUpdates',
    value: function fetchUpdates() {
      var _this2 = this;

      var url = this.props.updatesEndpoint.replace('{{siteUrl}}', window.COLBY_SITE_URL);

      fetch(url).then(function (response) {
        return response.json();
      }).then(function (updates) {
        _this2.setState({ updates: updates });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_Updates2.default, _extends({}, this.props, {
        updates: this.state.updates,
        moreLink: this.props.moreLink ? this.props.moreLink.replace('{{siteUrl}}', window.COLBY_SITE_URL) : null
      }));
    }
  }]);

  return UpdatesFromEndpoint;
}(_react2.default.Component);

UpdatesFromEndpoint.propTypes = {
  moreLink: _propTypes2.default.string,
  updatesEndpoint: _propTypes2.default.string.isRequired
};
UpdatesFromEndpoint.defaultProps = {
  moreLink: null
};
exports.default = UpdatesFromEndpoint;

/***/ }),
/* 7 */
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
    _reactDom2.default.render(_react2.default.createElement(_SitePreview2.default, container.dataset), container);
  });
};

window.addEventListener('load', init);

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"SitePreview":"SitePreview--1NbU1","fadein":"fadein--1WKH5","preview":"preview--OkkFI","previewText":"previewText--1ov5k","previewTextInner":"previewTextInner--15JHj","previewH1":"previewH1--1N4vc","loaded":"loaded--1pwKG","previewButton":"previewButton--BxzdA","siteMenu":"siteMenu--1vobG"};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"Updates":"Updates--3uZRh","innerUpdates":"innerUpdates--12q30","badgeContainer":"badgeContainer--2Bw_8","update":"update--26vmD","updateDate":"updateDate--3ydgR","moreLink":"moreLink--8Q9hi"};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = dateFns;

/***/ })
/******/ ]);
//# sourceMappingURL=colby-wp-react-site-preview.js.map