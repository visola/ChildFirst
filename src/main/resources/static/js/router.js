define(["jquery", "backbone", 'HandlebarsHelpers', "security", "bootstrap", "view/Application"],
  function ($, Backbone, HandlebarsHelpers, Security, Bootstrap, ApplicationView) {
    var originalRoute = Backbone.Router.prototype.route;
    var appView = new ApplicationView();

    HandlebarsHelpers.registerHelpers();

    function addMenu() {
      if (!appView.hasView('menu')) {
        return;
      }

      require(['view/TopMenu'], function (TopMenuView) {
        var topMenuView = new TopMenuView();
        appView.setView('menu', topMenuView);
        appView.render();
      })
    };

    function getContentElement() {
      return document.getElementById('content');
    };

    function render(view) {
      addMenu();
      appView.setView('content', view);
      appView.render();
      $('body').html(appView.$el);
    };

    var Router = Backbone.Router.extend({
      routes : {
        "(/)" : "home",
        "logout(/)" : "logout"
      },

      home : function () {
        require(['view/Home'], function (HomeView) {
          render(new HomeView());
        });
      },

      login : function () {
        require(["view/Login"], function (LoginView) {
          render(new LoginView());
        });
      },

      logout: function () {
        Security.logout();
        this.navigate('/');
        this.login();
      },

      route : function (route, name, callback) {
        if (Security.isLoggedIn()) {
          originalRoute.call(this, route, name, callback);
        } else {
          this.login();
        }
      }
    });

    return new Router();
  }
);
