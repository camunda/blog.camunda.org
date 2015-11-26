/*!
 * Taken and slightly modified from:
 * http://developer.telerik.com/featured/lazy-loading-images-on-the-web
 */
'use strict';
/*global require: false*/
var utils = require('./utils');


function lazyLoadImages() {
  // load images that have entered the viewport
  var images = utils.queryAll('img[data-src]');
  images.forEach(function (item) {
    if (utils.isElementInViewport(item)) {
      var wrap = item.parentNode;
      console.info('loading');
      if (wrap) wrap.classList.add('loading');
      item.addEventListener('load', function () {
        console.info('loaded');
        if (wrap) wrap.classList.remove('loading');
      });
      item.setAttribute('src', item.getAttribute('data-src'));
      item.removeAttribute('data-src');
    }
  });
  // if all the images are loaded, stop calling the handler
  if (images.length === 0) {
    window.removeEventListener('DOMContentLoaded', lazyLoadImages);
    window.removeEventListener('load', lazyLoadImages);
    window.removeEventListener('resize', lazyLoadImages);
    window.removeEventListener('scroll', lazyLoadImages);
  }
}

//these handlers will be removed once the images have loaded
window.addEventListener('DOMContentLoaded', lazyLoadImages);
window.addEventListener('load', lazyLoadImages);
window.addEventListener('resize', lazyLoadImages);
window.addEventListener('scroll', lazyLoadImages);
