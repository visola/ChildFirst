define(['backbone', 'model/School'], function (Backbone, School) {
  return Backbone.Collection.extend({
    model: School,
    url: '/api/v1/schools'
  });
});
