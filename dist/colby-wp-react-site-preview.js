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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

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
    _this.renderSection = _this.renderSection.bind(_this);
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
    key: 'renderSection',
    value: function renderSection(section) {
      var _this3 = this;

      var siteUrl = section.siteUrl,
          featuredImage = section.featuredImage,
          siteMenu = section.siteMenu,
          siteName = section.siteName,
          description = section.description;


      return _react2.default.createElement(
        'div',
        { className: 'row no-gutters mb-3 flex-row' },
        _react2.default.createElement(
          'a',
          {
            ref: function ref(link) {
              _this3.link = link;
            },
            href: siteUrl,
            style: { backgroundImage: 'url(\'' + featuredImage[0] + '\')' },
            className: 'bigPanel sitePreview row no-gutters px-3 py-4 ' + 'col-12 col-md-9'
          },
          _react2.default.createElement(
            'div',
            { className: 'ml-auto mt-auto col-md-9 col-lg-7' },
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
        ),
        _react2.default.createElement(
          'nav',
          {
            className: 'list-group list-group-primary col-md-3 flex-wrap' + ' flex-row flex-md-column justify-content-center'
          },
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
              className: 'list-group-item-action list-group-item',
              href: menuItem.url,
              key: menuItem.ID,
              dangerouslySetInnerHTML: { __html: menuItem.title }
            });
          })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.data === null) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        null,
        this.state.data.map(this.renderSection)
      );
    }
  }]);

  return SitePreview;
}(_react2.default.Component);

SitePreview.propTypes = {
  siteId: _propTypes2.default.string.isRequired
};
exports.default = SitePreview;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(2);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _SitePreview = __webpack_require__(1);

var _SitePreview2 = _interopRequireDefault(_SitePreview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = function init() {
  Array.prototype.forEach.call(document.querySelectorAll('[data-site-preview]'), function (container) {
    _reactDom2.default.render(_react2.default.createElement(_SitePreview2.default, container.dataset), container);
  });
};

window.addEventListener('load', init);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = PropTypes;

/***/ })
/******/ ]);
//# sourceMappingURL=colby-wp-react-site-preview.js.map