define(['view/Base', 'security', 'hbars!template/school/list'], function (BaseView, Security, ListSchoolTemplate) {

  return BaseView.extend({
    template: HomeTemplate,

    initialize: function () {
    }
  });

});