define(['Backbone', 'model/School'], function (Backbone, School) {
  return Backbone.Collection.extend({
    model: School,
    url: '/schools'
  });
});