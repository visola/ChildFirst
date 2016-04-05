define(["jquery", "backbone", "security"],
  function ($, Backbone, Security, MenuTemplate) {
    var originalRoute = Backbone.Router.prototype.route;

    function getContentElement() {
      return document.getElementById('content');
    };

    function render(view) {
      view.render();
      $(getContentElement()).html(view.$el);
    };

    var Router = Backbone.Router.extend({
      routes : {
        "(/)" : "home"
      },

      home : function () {
        require(['view/Home'], function (HomeView) {
          render(new HomeView());
        });
      },

      login : function () {
        require(["hbars!template/login", 'i18n!nls/strings'], function (LoginTemplate, strings) {
          getContentElement().innerHTML = LoginTemplate({strings:strings, window:window});
        });
      },

      route : function (route, name, callback) {
        if (Security.isLoggedIn()) {
          getContentElement().innerHTML = '<p>Loading...</p>';
          originalRoute.call(this, route, name, callback);
        } else {
          this.login();
        }
      }
    });

    return new Router();
  }
);
