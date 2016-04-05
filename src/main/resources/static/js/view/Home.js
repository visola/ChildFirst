define(['view/Base', 'hbars!template/home'], function (BaseView, HomeTemplate) {
  
  return BaseView.extend({
    template: HomeTemplate,

    initialize: function () {
      this.data = {
        name: "John Doe"
      };
    }
  });

});