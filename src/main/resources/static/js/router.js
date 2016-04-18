define(["jquery", "backbone", "security", "bootstrap"],
  function ($, Backbone, Security, Bootstrap) {
    var originalRoute = Backbone.Router.prototype.route;

    function getContentElement() {
      return document.getElementById('content');
    };

    function render(view) {
      renderMenu();
      view.render();
      $(getContentElement()).html(view.$el);
    };

    function renderMenu() {
      var $menu = $('#menu').empty();
      require(['view/TopMenu'], function (TopMenuView) {
        var topMenuView = new TopMenuView();
        topMenuView.render();
        $menu.html(topMenuView.$el)
          .find('ul .nav')
          .dropdown();
      })
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
        require(["hbars!template/login", 'i18n!nls/strings'], function (LoginTemplate, strings) {
          renderMenu();
          getContentElement().innerHTML = LoginTemplate({strings:strings, window:window});
        });
      },

      logout: function () {
        Security.logout();
        this.navigate('/');
        this.login();
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
