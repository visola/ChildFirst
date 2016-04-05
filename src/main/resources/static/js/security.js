define(['jquery'], function ($) {
  var storageAuth = {
    email: localStorage.email,
    expires: localStorage.expires,
    token: localStorage.token
  };

  // If stored auth is expired
  if (storageAuth.expires < new Date().getTime()) {
    storageAuth = {email: null, expires:null, token:null};
  }

  var Security = {
    getUserEmail: function () {
      return storageAuth.email;
    },
    isLoggedIn : function () {
      return storageAuth.token != null;
    }
  };

  if (Security.isLoggedIn()) {
    $.ajaxSetup({
      beforeSend: function (xhr) {
        xhr.setRequestHeader("X-Auth-Token", storageAuth.token);
      }
    });
  }

  return Security;
});