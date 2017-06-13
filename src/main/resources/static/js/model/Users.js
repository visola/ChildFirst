define(['backbone', 'model/User'], function (Backbone, User) {
  return Backbone.Collection.extend({
    model: User,
    url: '/api/v1/users'
  });
});
