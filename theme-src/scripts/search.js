'use strict';
/*global require: fase, module: false, console: false*/

var xhr = require('xhr');
var attr = require('./utils').attr;
var query = require('./utils').query;
var queryAll = require('./utils').queryAll;

module.exports = function (gSearchApiKey, gSearchCtx) {
  var searchResultTmpl = require('lodash.template')(
    '<li>' +
      '<h2><a href="<%= link %>"><%= title %></a></h2>' +
      '<div class="description<% if (pagemap && pagemap.cse_thumbnail) { %> with-thumbnail<% } %>">' +
        '<% if (pagemap && pagemap.cse_thumbnail) { %>' +
        '<a class="thumbnail" href="<%= link %>"><img src="<%- pagemap.cse_thumbnail[0].src %>" /></a>' +
        '<% } %>' +
        '<p><%= htmlSnippet %></p>' +
      '</div>' +
    '</li>'
  );

  var bodyClasses = document.body.classList;
  var searchUri = 'https://www.googleapis.com/customsearch/v1?key=' + gSearchApiKey + '&cx=' + gSearchCtx + '&q=';
  var searchField = query('input[type=search]');
  var searchResults = query('.search-results');
  var searchCloseBtn = query('.search-close', searchResults);
  var pageButtons = queryAll('button.page');


  searchCloseBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    bodyClasses.remove('search-open');
    searchField.value = '';
  });

  pageButtons.forEach(function (btn) {
    btn.addEventListener('click', function (evt) {
      evt.preventDefault();
      var searched = attr(btn, 'data-searched');
      var startIndex = attr(btn, 'data-start-index');
      performSearch(searchUri + searched/* + '&startIndex=' + startIndex*/ + '&start=' + startIndex);
    });
  });


  function performSearch(uri) {
    pageButtons.forEach(function (el) {
      attr(el, 'disabled', 'disabled');
      attr(el, 'data-searched', null);
      attr(el, 'data-start-index', null);
    });

    xhr({
      uri: uri,
      headers: {
        'Accept': 'application/json'
      }
    }, function (err, resp, body) {
      var resultsContainer = query('ul', searchResults);
      var renderedResults = '';

      if(err) {
        console.error('google custom search', err.message);
        resultsContainer.innerHTML = '<li class="search-error">' + err.message + '</li>';
      }
      else {
        var results = JSON.parse(body);

        if (results.items && results.items.length) {
          renderedResults = results.items.map(function (item) {
            if (!item.pagemap) {
              return '';
            }
            return searchResultTmpl(item);
          }).join('');

          var previous = results.queries.previousPage ? results.queries.previousPage[0] : false;
          if (previous) {
            attr(pageButtons[0], 'disabled', null);
            attr(pageButtons[0], 'data-searched', previous.searchTerms);
            attr(pageButtons[0], 'data-start-index', previous.startIndex);
          }

          var next = results.queries.nextPage ? results.queries.nextPage[0] : false;
          if (next) {
            attr(pageButtons[1], 'disabled', null);
            attr(pageButtons[1], 'data-searched', next.searchTerms);
            attr(pageButtons[1], 'data-start-index', next.startIndex);
          }
        }
        else {
          renderedResults += '<li class="no-results">no results</li>';
        }
      }

      resultsContainer.innerHTML = renderedResults;

      bodyClasses.add('search-open');
    });
  }

  searchField.addEventListener('change', function(evt) {
    evt.preventDefault();

    var search = searchField.value.trim();
    if(!search.length) {
      bodyClasses.remove('search-open');
      return;
    }
    bodyClasses.add('search-open');

    performSearch(searchUri + search);
  });

  searchField.addEventListener('focus', function () {
    searchField.parentNode.classList.add('focused');
  });
  searchField.addEventListener('blur', function () {
    searchField.parentNode.classList.remove('focused');
  });
};
