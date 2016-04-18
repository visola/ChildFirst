define(['view/Base', 'security', 'hbars!template/home'], function (BaseView, Security, HomeTemplate) {
  
  return BaseView.extend({
    template: HomeTemplate,

    initialize: function () {
      this.data = {
        name: Security.user.firstName || null
      };
    }
  });

});