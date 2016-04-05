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
        require(["tpl!template/login.html"], function (LoginTemplate) {
          getContentElement().innerHTML = LoginTemplate();
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
