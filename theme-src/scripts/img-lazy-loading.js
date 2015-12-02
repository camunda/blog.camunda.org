/*!
 * Taken and slightly modified from:
 * http://developer.telerik.com/featured/lazy-loading-images-on-the-web
 */
'use strict';
/*global require: false*/
var utils = require('./utils');
var query = utils.query;
var attr = utils.attr;
var mkEl = utils.mkEl;

var lightbox = mkEl('div', {'class': 'lightbox'});
var lightboxContent = mkEl('div', {'class': 'content'});
var lightboxImg = mkEl('img');
lightbox.appendChild(lightboxContent);
lightbox.addEventListener('click', function () {
  lightbox.classList.remove('open');
});
lightboxContent.appendChild(lightboxImg);
document.body.appendChild(lightbox);


function showBigger(evt) {
  var img = evt.target.src ? evt.target : query('img', evt.target);
  attr(lightboxImg, 'src', img.src);
  var style = lightboxContent.style;
  if (img.naturalWidth < document.body.clientWidth) {
    style.marginLeft = (-4 - (img.naturalWidth / 2)) + 'px';
  }
  else {
    style.marginLeft = (0 - (document.body.clientWidth / 2)) + 'px';
  }

  if (img.naturalHeight < document.body.clientHeight) {
    style.marginTop = (-4 - (img.naturalHeight / 2)) + 'px';
  }
  else {
    style.marginTop = (0 - (document.body.clientHeight / 2)) + 'px';
  }

  lightbox.classList.add('open');
}


function lazyLoadImages() {
  // load images that have entered the viewport
  var images = utils.queryAll('img[data-src]');
  images.forEach(function (item) {
    if (utils.isElementInViewport(item)) {
      var wrap = item.parentNode;
      if (wrap) wrap.classList.add('loading');

      item.addEventListener('load', function () {
        if (wrap) wrap.classList.remove('loading');

        // ensure lightbox when needed
        var figure = item.parentNode.parentNode;
        if (item.clientWidth < item.naturalWidth && !figure.classList.contains('no-border')) {
          figure.classList.add('clickable');
          figure.addEventListener('click', showBigger);
        }
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

// these handlers will be removed once the images have loaded
window.addEventListener('DOMContentLoaded', lazyLoadImages);
window.addEventListener('load', lazyLoadImages);
window.addEventListener('resize', lazyLoadImages);
window.addEventListener('scroll', lazyLoadImages);
