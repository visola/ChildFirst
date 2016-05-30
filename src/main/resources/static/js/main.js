require.config({
  baseUrl: "/js",
  paths: {
    "bootstrap" : "https://cdn.jsdelivr.net/bootstrap/3.3.6/js/bootstrap.min",
    "moment" : "https://cdn.jsdelivr.net/momentjs/2.12.0/moment.min",
    "underscore" : "https://cdn.jsdelivr.net/lodash/4.7.0/lodash.min",

    "backbone": "https://cdn.jsdelivr.net/backbonejs/1.3.2/backbone-min",
    "classnames": "lib/classnames",
    "handlebars" : "https://cdn.jsdelivr.net/handlebarsjs/4.0.5/handlebars.amd.min",
    "hbars" : "lib/hbars",
    "i18n" : "https://cdn.jsdelivr.net/requirejs.i18n/2.0.4/i18n",
    "jquery" : "https://cdn.jsdelivr.net/jquery/2.2.1/jquery.min",
    "react": "https://cdn.jsdelivr.net/react/15.1.0/react",
    "react-dom": "https://cdn.jsdelivr.net/react/15.1.0/react-dom",
    "text" : "https://cdn.jsdelivr.net/requirejs.text/2.0.12/text.min"
  },
  shim: {
    'bootstrap': {
      deps: ['jquery'],
      exports: 'bootstrap'
    }
  },
  waitSeconds: 0
});

require(['router'], function (router) {
  Backbone.history.start({pushState: true});
});
