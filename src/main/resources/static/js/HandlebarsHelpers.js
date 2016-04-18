define(['underscore', 'handlebars', 'i18n!nls/strings'], function (_, Handlebars, strings) {

  function registerHelpers() {

    Handlebars.registerHelper('coalesce', function () {
      var i;
      for (i = 0; i < arguments.length; i++) {
        if (arguments[i] !== null) {
          return arguments[i];
        }
      }
      throw new Error('No non-null value found in arguments: ', arguments.join(','));
    });

    Handlebars.registerHelper('i18n', function (key, hbars) {
      var template = Handlebars.compile(strings[key]);
      if (!_.isEmpty(hbars.hash)) {
        return template(hbars.hash);
      }
      return template(hbars.data.root);
    });
  }

  return {
    registerHelpers: registerHelpers
  };
});