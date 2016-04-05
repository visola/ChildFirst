define(['view/Base', 'hbars!template/home'], function (BaseView, HomeTemplate) {
  
  return BaseView.extend({
    template: HomeTemplate
  });

});