define(['view/Base', 'hbars!template/login'], function (BaseView, LoginTemplate) {
  
  return BaseView.extend({
    template: LoginTemplate,
    initialize: function () {
      this.data.window = window;
    }
  });

});