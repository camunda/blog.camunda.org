'use strict';
/*jshint browser: true*/
/*global require: false, BPMNViewer: false, _siteSetup: false*/

var xhr = require('xhr');
require('./classList');
require('./img-lazy-loading');


/********************************************************************\
 * DOM utilities                                                    *
\********************************************************************/
var utils = require('./utils');
var attr = utils.attr;
var mkEl = utils.mkEl;
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
 * No clue...                                                       *
\********************************************************************/

function initBPMN(el) {
  var src = attr(el, 'data-bpmn-diagram');
  if (el.classList.contains('processed')) { return; }
  el.classList.add('processed');

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
}



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


function lazyLoadBPMN() {
  // load images that have entered the viewport
  var diagrams = queryAll('[data-bpmn-diagram]');
  diagrams.forEach(function (item) {
    if (utils.isElementInViewport(item)) {
      if (!window.BPMNViewer) {
        var script = mkEl('script');
        script.addEventListener('load', function () {
          initBPMN(item);
        });
        attr(script, 'src', window._siteSetup.baseUrl + 'js/bpmn-viewer.js');
        document.body.appendChild(script);
        return;
      }
      initBPMN(item);
    }
  });

  // if all the diagrams are loaded, stop calling the handler
  if (diagrams.length === 0) {
    window.removeEventListener('DOMContentLoaded', lazyLoadBPMN);
    window.removeEventListener('load', lazyLoadBPMN);
    window.removeEventListener('resize', lazyLoadBPMN);
    window.removeEventListener('scroll', lazyLoadBPMN);
  }
}

//these handlers will be removed once the diagrams have loaded
window.addEventListener('DOMContentLoaded', lazyLoadBPMN);
window.addEventListener('load', lazyLoadBPMN);
window.addEventListener('resize', lazyLoadBPMN);
window.addEventListener('scroll', lazyLoadBPMN);



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


function lazyLoadDisqus() {
  if (disqusEl && !disqusLoaded && utils.isElementInViewport(disqusEl)) {
    disqusLoaded = true;

    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = '//' + _siteSetup.disqusName + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);

    window.removeEventListener('DOMContentLoaded', lazyLoadDisqus);
    window.removeEventListener('load', lazyLoadDisqus);
    window.removeEventListener('resize', lazyLoadDisqus);
    window.removeEventListener('scroll', lazyLoadDisqus);
  }
}

if (_siteSetup.disqusName) {
  var disqusLoaded;
  var disqusEl = document.getElementById('disqus_thread');

  window.addEventListener('DOMContentLoaded', lazyLoadDisqus);
  window.addEventListener('load', lazyLoadDisqus);
  window.addEventListener('resize', lazyLoadDisqus);
  window.addEventListener('scroll', lazyLoadDisqus);
}

if (window.location.hostname !== 'blog.camunda.org') {
  return;
}

if (_siteSetup.gaCode) {
  var _gaq = _gaq || [];
  var pluginUrl = '//www.google-analytics.com/plugins/ga/inpage_linkid.js';
  _gaq.push(['_require', 'inpage_linkid', pluginUrl]);
  _gaq.push(['_setAccount', _siteSetup.gaCode]);
  _gaq.push(['_setDomainName', 'camunda.org']);
  _gaq.push(['_trackPageview']);
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
}
