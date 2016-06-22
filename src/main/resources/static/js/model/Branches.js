define(['backbone', 'model/Branch'], function (Backbone, Branch) {
  return Backbone.Collection.extend({
    model: Branch,
    url: '/api/v1/branches'
  });
});
