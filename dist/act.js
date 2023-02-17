// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"viewsFactory.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = {
  _uid_val: 0,
  _views: {},
  target: false,
  load: function load(moduleNames) {
    var _this = this;
    var loadModules = moduleNames.map(function (module) {
      return import(module[1]).then(function (imported) {
        _this._views[module[0]] = imported.default;
      });
    });
    return Promise.all(loadModules);
  },
  //todo render should take an array of elements
  render: function render(elements) {
    var _this2 = this;
    var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var replace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var append = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    //insert given view into target
    target = target || this.target;
    if (replace) {
      while ((_target = target) !== null && _target !== void 0 && _target.firstChild) {
        var _target;
        target.removeChild(target.firstChild);
      }
    }

    //for simplicity, we process a single element as an array item; the same as multiple elements
    if (!Array.isArray(elements)) {
      elements = [elements];
    }
    var elementQueue = [];
    //iterate through each element and add it to the target
    elements.forEach(function (element) {
      //allow for directly adding an element via html string, otherwise treat as a html element
      if (typeof element === 'string' || typeof element === 'number') {
        target.insertAdjacentHTML(append ? 'beforeend' : 'afterbegin', element);
      } else {
        target.insertAdjacentElement(append ? 'beforeend' : 'afterbegin', element);
        var values = element.act.values(); //all values (user + .act)
        var view = _this2._views[values.act.viewName]; //original view module

        values.act.parent = function () {
          return target;
        };

        //set style
        if (view.style) {
          //check if this style is already set within this scope of the target
          //if(!values.act.parent().querySelector(`:scope > style[data-act_style="${values.act.viewName}"]`)){

          if (!_this2.target.querySelector("style[data-act_style=\"".concat(values.act.viewName, "\"]"))) {
            var styleElement = document.createElement('style');
            styleElement.dataset.act_style = values.act.viewName;
            var stylesheet = view.style(values);
            stylesheet = stylesheet.replace(/([\w\d.#]+)(\s*\{)/g, function (match, selector, brace) {
              //return `${selector}${values.act.view}, ${values.act.view} ${selector}${brace}\nall: initial;\n`;
              return "".concat(selector).concat(values.act.style, " ").concat(brace, "\n");
            });
            styleElement.innerHTML = stylesheet;
            _this2.target.insertAdjacentElement('afterbegin', styleElement);
          }
        }

        //queue elements in order added to fire scripts after render is complete
        elementQueue.push(element);
        var watches = element.querySelectorAll('act-watch');
        watches.forEach(function (watch) {
          var watcher = values.act._watchers[watch.dataset.act_watch_key];
          a.listen(watcher.name, function (state) {
            watch.innerText = watcher.event(values);
          });
          watch.innerText = watcher.event(values);
        });
        if (values !== null && values !== void 0 && values.body) {
          _this2.render(values.body, element.querySelector('act-body'));
        }
      }
    });

    //create event listeners and run the scripts for each element in the queue
    var _loop = function _loop() {
      var element = elementQueue[i];
      var values = element.act.values();
      var view = _this2._views[values.act.viewName];
      if (view !== null && view !== void 0 && view.script) view.script(values);
      if (values !== null && values !== void 0 && values.on) {
        var events = values.on;
        if (!Array.isArray(events)) {
          events = [events];
        }
        //loop through events in the `events` array
        var _loop2 = function _loop2() {
          var event = Object.keys(events[_i])[0];
          var callback = events[_i][event];
          element.addEventListener(event, function (event) {
            callback(event, values);
          });
        };
        for (var _i = 0; _i < events.length; _i++) {
          _loop2();
        }
      }
    };
    for (var i = 0; i < elementQueue.length; i++) {
      _loop();
    }
  },
  //todo this should probably return the entire element and render handles what do with it (view/styling/script
  view: function view(viewName) {
    var _this$_views$viewName,
      _values,
      _values2,
      _this3 = this;
    var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    //add manually set vales to view values if they exist
    if ((_this$_views$viewName = this._views[viewName]) !== null && _this$_views$viewName !== void 0 && _this$_views$viewName.values) {
      //values = {...this._views[viewName].values(values), ...values ,...{on:[]}}
      values = _objectSpread(_objectSpread(_objectSpread({}, {
        on: []
      }), this._views[viewName].values(values)), values);
    }

    //add act-specific values to view values object
    values.act = {};
    values.act.viewName = viewName;
    values.act.view = "[data-act_view=\"".concat(values.act.viewName, "\"]");
    values.act.style = "[data-act_style=\"".concat(values.act.viewName, "\"]");
    values.act._uid = this.uid();

    //return this._views[viewName].view(values);
    var view = this._views[viewName];
    var element = document.createElement("div");
    values.act._watchers = [];
    values.watch = function (name) {
      var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (event === null) {
        event = name;
        name = '*';
      }
      values.act._watchers.push({
        name: name,
        event: event
      });
      return "<act-watch data-act_watch=\"".concat(name, "\" data-act_watch_key=\"").concat(values.act._watchers.length - 1, "\"></act-watch>");
    };

    //replace any ${v.body} outputs with a body container
    if ((_values = values) !== null && _values !== void 0 && _values.body) {
      values.act._body = values.body;
      values.body = "<act-body></act-body>";
    }
    element.innerHTML = view.view(values);

    //revert body to original user content
    if ((_values2 = values) !== null && _values2 !== void 0 && _values2.body) {
      values.body = values.act._body;
      delete values.act._body;
    }
    var childElements = element.querySelectorAll("*");
    for (var i = 0; i < childElements.length; i++) {
      childElements[i].setAttribute("data-act_style", viewName);
    }
    element = element.children[0];

    //make element directly available to view from values and vice versa
    element.act = {};
    element.act.values = function () {
      return values;
    };
    values.act.element = function () {
      return element;
    };
    element.classList.add(values.act._uid);
    element.dataset.act_view = viewName;

    //give element access to act methods
    values.act.append = function (element, query) {
      return _this3.append(query, element);
    };
    values.act.find = function (query) {
      return element.querySelector(query);
    };
    values.act.findAll = function (query) {
      return element.querySelectorAll(query);
    };
    values.act.findView = function (query) {
      return element.querySelector("[data-act_view=\"".concat(query, "\"]"));
    };
    values.act.findViews = function (query) {
      return element.querySelectorAll("[data-act_view=\"".concat(query, "\"]"));
    };
    return element;
  },
  uid: function uid() {
    this._uid_val++;
    return 'act_uid_' + this._uid_val;
  },
  prepend: function prepend(target, elements) {
    this.render(target, elements, false, false);
  },
  append: function append(target, elements) {
    this.render(target, elements, false);
  }
};
exports.default = _default;
},{}],"state.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = {
  state: {},
  listeners: new Set(),
  listenersSpecific: [],
  get: function get() {
    return this.state;
  },
  init: function init(newState) {
    var _this = this;
    var difference = Object.keys(newState).reduce(function (acc, key) {
      if (_this.state[key] !== newState[key]) {
        acc[key] = newState[key];
      }
      return acc;
    }, {});
    this.state = _objectSpread(_objectSpread({}, this.state), newState);
    return difference;
  },
  set: function set(newState) {
    var _this2 = this;
    var difference = this.init(newState);

    //run specific listeners
    Object.keys(difference).forEach(function (key) {
      if (_this2.listenersSpecific[key]) {
        _this2.listenersSpecific[key].forEach(function (listener) {
          listener(_this2.state);
        });
      }
    });

    //run global state listeners
    this.listeners.forEach(function (listener) {
      return listener(_this2.state);
    });
  },
  listen: function listen(state) {
    var listener = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (listener == null) {
      listener = state;
      this.listeners.add(listener);
    } else {
      if (!this.listenersSpecific[state]) {
        this.listenersSpecific[state] = new Set();
      }
      this.listenersSpecific[state].add(listener);
    }
  },
  ignore: function ignore(state) {
    var listener = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (listener == null) {
      listener = state;
      this.listeners.delete(listener);
    } else {
      if (this.listenersSpecific[state]) {
        this.listenersSpecific[state] = this.listenersSpecific[state].filter(function (l) {
          return l !== listener;
        });
      }
    }
  }
};
exports.default = _default;
},{}],"index.mjs":[function(require,module,exports) {
"use strict";

var _viewsFactory = _interopRequireDefault(require("./viewsFactory.mjs"));
var _state = _interopRequireDefault(require("./state.mjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
window.a = _objectSpread(_objectSpread({
  test: function test() {
    console.log('test 4');
  }
}, _viewsFactory.default), _state.default);

//todo add styling
//todo add `all:initial` css rule to view by default
//todo run script after inserting view(s) - check how this works for nesting..
},{"./viewsFactory.mjs":"viewsFactory.mjs","./state.mjs":"state.mjs"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "44357" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.mjs"], null)
//# sourceMappingURL=/act.js.map