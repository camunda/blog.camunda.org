/*!
 * Taken and slightly modified from:
 * http://developer.telerik.com/featured/lazy-loading-images-on-the-web
 */
'use strict';
/*global require: false*/
var queryAll = require('./utils').queryAll;

function isElementInViewport (el) {
  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
  );
}

function lazyLoadImages() {
  // load images that have entered the viewport
  var images = queryAll('img[data-src]');
  var width = (window.innerWidth || document.documentElement.clientWidth);
  var size;
  [
    { name: 'small', width: 320 },
    { name: 'medium', width: 640 },
    { name: 'large', width: 1024 },
    { name: 'xlarge', width: 1280 }
  ].forEach(function (info) {
    if (info.width <= width) {
      size = info.name;
    }
  });


  images.forEach(function (item) {
    if (isElementInViewport(item)) {
      var original = item.getAttribute('data-src').split('.');
      var ext = original.pop();
      var name = original.pop() + '-' + size;
      var responsive = original.concat([name, ext]).join('.');
      console.info('responsive', responsive);
      item.setAttribute('src', responsive);
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
