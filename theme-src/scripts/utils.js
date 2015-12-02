'use strict';
/*jshint browser: true*/
/*global module: false*/

var utils = module.exports = {};

function toArray(thing) {
  var arr = [];
  if (!thing.length) { return arr; }
  for (var i = 0; i < thing.length; i++) {
    arr.push(thing[i]);
  }
  return arr;
}
utils.toArray = toArray;

function attr(node, name, value) {
  if (value === null) {
    node.removeAttribute(name);
  }
  else if (typeof value !== 'undefined') {
    node.setAttribute(name, value);
  }
  return node.getAttribute(name);
}
utils.attr = attr;

function mkEl(name, attrs) {
  var el = document.createElement(name);
  if (attrs) {
    Object.keys(attrs).forEach(function (name) {
      attr(el, name, attrs[name]);
    });
  }
  return el;
}
utils.mkEl = mkEl;

function queryAll(selector, context) {
  context = (context || document.body);
  return toArray(context.querySelectorAll(selector));
}
utils.queryAll = queryAll;


function query(selector, context) {
  context = (context || document.body);
  return context.querySelector(selector);
}
utils.query = query;


function keys(o) {
  return Object.keys(o);
}
utils.keys = keys;


function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
  );
}
utils.isElementInViewport = isElementInViewport;

var _init = [];
function docLoaded(fn) { _init.push(fn); }
document.addEventListener('readystatechange', function () {
  if (document.readyState === 'complete') {
    var fn;
    /*jshint boss: true*/
    while (fn = _init.shift()) { fn(); }
    /*jshint boss: false*/
  }
});
utils.docLoaded = docLoaded;
