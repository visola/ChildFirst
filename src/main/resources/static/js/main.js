require.config({
  baseUrl: "/js",
  paths: {
    "backbone": "https://cdn.jsdelivr.net/backbonejs/1.3.2/backbone-min",
    "bootstrap" : "https://cdn.jsdelivr.net/bootstrap/3.3.6/js/bootstrap.min",
    "i18n" : "https://cdn.jsdelivr.net/requirejs.i18n/2.0.4/i18n",
    "jquery" : "https://cdn.jsdelivr.net/jquery/2.2.1/jquery.min",
    "moment" : "https://cdn.jsdelivr.net/momentjs/2.12.0/moment.min",
    "handlebars" : "https://cdn.jsdelivr.net/handlebarsjs/4.0.5/handlebars.amd.min",
    "hbars" : "lib/hbars",
    "underscore" : "https://cdn.jsdelivr.net/lodash/4.7.0/lodash.min",
    "template" : "/template",
    "text" : "https://cdn.jsdelivr.net/requirejs.text/2.0.12/text.min",
    "tpl": "lib/tpl",
  },
  shim: {
    'bootstrap': {
      deps: ['jquery'],
      exports: 'bootstrap'
    }
  },
  waitSeconds: 0
});

require(['router', 'HandlebarsHelpers'], function (router, HandlebarsHelpers) {
  HandlebarsHelpers.registerHelpers();
  Backbone.history.start({pushState: true});
});