import $ from "jquery";
import Backbone from "backbone";
import React from "react";
import ReactDOM from "react-dom";
import Security from "security";

import Application from "containers/Application";
import HandlebarsHelpers from "HandlebarsHelpers";

var originalRoute = Backbone.Router.prototype.route;

HandlebarsHelpers.registerHelpers();

let render = (component) => {
  let element = React.createElement(component.default || component);
  ReactDOM.render(
    <Application>{element}</Application>,
    document.getElementById('container')
  );
}

var Router = Backbone.Router.extend({
  routes : {
    "(/)" : "home",
    "logout(/)" : "logout",
    "schools(/)" : "schools"
  },

  home : function () {
    require(["containers/Home"], function (Home) {
      render(Home);
    });
  },

  login : function () {
    require(["containers/Login"], function (Login) {
      render(Login);
    });
  },

  logout: function () {
    Security.logout();
    this.navigate('/');
    this.login();
  },

  schools: function () {
    require(["containers/school/List"], function (SchoolList) {
      render(SchoolList);
    });
  },

  route : function (route, name, callback) {
    if (Security.isLoggedIn()) {
      originalRoute.call(this, route, name, callback);
    } else {
      this.login();
    }
  }
});

export default new Router();
