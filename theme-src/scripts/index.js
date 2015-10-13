'use strict';

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

(function () {
  /*global require: true*/
  var Prism = (window.Prism || require('prismjs'));
  Prism.languages.xml = Prism.languages.markup;
  Prism.languages.html = Prism.languages.markup;
  Prism.languages.sh = Prism.languages.bash;

  require('./classList');
  var bdy = document.body;
  function topClass() {
    bdy.classList[window.scrollY ? 'add' : 'remove']('scrolled');
  }

  window.addEventListener('resize', topClass);
  window.addEventListener('scroll', topClass);
  topClass();
})();
