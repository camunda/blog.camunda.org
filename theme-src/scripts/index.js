'use strict';
/*jshint browser: true*/
/*global require: false*/

var xhr = require('xhr');
require('./classList');
require('./img-lazy-loading');


/********************************************************************\
 * DOM utilities                                                    *
\********************************************************************/
var utils = require('./utils');
// var toArray = utils.toArray;
var attr = utils.attr;
// var mkEl = utils.mkEl;
// var offset = utils.offset;
// var query = utils.query;
var queryAll = utils.queryAll;



/********************************************************************\
 * Code highlighting                                                *
\********************************************************************/
var Prism = (window.Prism || require('prismjs'));

require('prismjs/components/prism-markdown');
Prism.languages.md = Prism.languages.markdown;

require('prismjs/components/prism-bash');
Prism.languages.sh = Prism.languages.bash;

require('prismjs/components/prism-go');


/********************************************************************\
 * Header and sidebar                                               *
\********************************************************************/
var bdy = document.body;
function topClass() {
  bdy.classList[window.scrollY ? 'add' : 'remove']('scrolled');
}

window.addEventListener('resize', topClass);
window.addEventListener('scroll', topClass);
topClass();


queryAll('button.sidebar-toggle').forEach(function (btn) {
  btn.addEventListener('click', function () {
    bdy.classList.toggle('sidebar-open');
  });
});


/********************************************************************\
 * Cookies                                                          *
\********************************************************************/
// var Cookies = require('js-cookie');
// if (!Cookies.get('acceptCookies')) {
//   var el = mkEl('div');
//   el.classList.add('cookie-warning');
//   el.innerHTML = 'By visiting this website, you are accepting '
//   bdy.appendChild(el);
// }


/********************************************************************\
 * No clue...                                                       *
\********************************************************************/
var BPMNViewer = require('bpmn-js');

function fitBpmnViewport(el, viewer) {
  var vb = viewer.get('canvas').viewbox();
  var inner = vb.inner;

  if(el.offsetWidth < inner.width) {
    // need to zoom out: calculate height
    el.style.height = Math.round(inner.height * (el.clientWidth / inner.width)) + 'px';
  }
  else {
    // set height to inner height
    el.style.height = inner.height + 'px';
  }

  var canvas = viewer.get('canvas');
  canvas.zoom('fit-viewport');
  setTimeout(function () {
    canvas.zoom('fit-viewport');
  }, 10);
}

queryAll('[data-bpmn-diagram]').forEach(function (el) {
  var src = attr(el, 'data-bpmn-diagram');

  var viewer = new BPMNViewer({
    container: el,
    width: '100%',
    height: '100%',
    overlays: {
      deferUpdate: false
    }
  });

  xhr({
    uri: src + '.bpmn',
  }, function (err, resp, body) {
    if (err) { throw err; }
    viewer.importXML(body, function(err) {
      if (err) { throw err; }
      fitBpmnViewport(el, viewer);
    });
  });
});


// (function(d,s,id){
//   var js,
//       fjs=d.getElementsByTagName(s)[0],
//       p=/^http:/.test(d.location)?'http':'https';
//   if(!d.getElementById(id)){
//     js=d.createElement(s);
//     js.id=id;
//     js.src=p+'://platform.twitter.com/widgets.js';
//     fjs.parentNode.insertBefore(js,fjs);
//   }
// })(document,'script','twitter-wjs');

// (function() {
//     // Don't ever inject Disqus on localhost--it creates unwanted
//     // discussions from 'localhost:1313' on your Disqus account...
//     if (window.location.hostname === 'localhost')
//         return;

//     var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
//     var disqus_shortname = '{{ .Site.Params.disqusShortname }}';
//     dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
//     (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
// })();
