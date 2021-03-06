import $ from "jquery";
import Backbone from "backbone";
import React from "react";
import ReactDOM from "react-dom";
import Security from "security";

import Application from "containers/Application";
import HandlebarsHelpers from "HandlebarsHelpers";

var originalRoute = Backbone.Router.prototype.route;

HandlebarsHelpers.registerHelpers();

let render = (component, props, children) => {
  let element = React.createElement(component.default || component, props, children);
  ReactDOM.render(
    <Application>{element}</Application>,
    document.getElementById('container')
  );
}

var Router = Backbone.Router.extend({
  routes : {
    "(/)" : "home",
    "logout(/)" : "logout",
    "branches(/)" : "branches",
    "branches/:id(/)" : "editBranch",
    "schools(/)" : "schools",
    "schools/:id(/)" : "editSchool",
    "users(/)" : "users",
    "users/:id(/)" : "editUsers"
  },

  branches: function () {
    require(["containers/branch/List"], function (BranchList) {
      render(BranchList);
    });
  },

  editBranch: function (branchId) {
    require(["containers/branch/Edit"], function (EditBranch) {
      render(EditBranch, {branchId});
    });
  },

  editSchool: function (schoolId) {
    require(["containers/school/Edit"], function (EditSchool) {
      render(EditSchool, {schoolId});
    });
  },

  editUsers: function (userId) {
    require(["containers/user/Edit"], function (EditUser) {
      render(EditUser, {userId});
    });
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
  },

  users: function () {
    require(["containers/user/List"], function (UserList) {
      render(UserList);
    });
  },
});

export default new Router();
