define(['view/Composed', 'hbars!template/application'], function (ComposedView, ApplicationTemplate) {

  var ApplicationView = ComposedView.extend({
    template: ApplicationTemplate
  });

  return ApplicationView;
});