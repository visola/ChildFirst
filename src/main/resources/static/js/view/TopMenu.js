define(['view/Base', 'security', 'hbars!template/topMenu'], function (BaseView, Security, TopMenuTemplate) {

  return BaseView.extend({
    template: TopMenuTemplate,
    className: 'container-fluid',

    initialize: function () {
      this.data = {
          Security: Security
      };
    },

    postAppend: function () {
      this.$('ul .nav').dropdown();
    }
  });

});