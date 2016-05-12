define(['underscore', 'backbone'], function (_, Backbone) {
  var ComposedView = Backbone.View.extend({
    views: {},

    hasView: function (id) {
      return typeof this.views[id] === 'undefined';
    },

    render: function () {
      var id;
      this.$el.html(this.template());

      for (id in this.views) {
        this.views[id].render();
        this.$el.find('#'+id).html(this.views[id].$el);
      }

      return this;
    },

    postAppend: function () {
      var id;
      for (id in this.views) {
        if (typeof this.views[id].postAppend === 'function') {
          this.views[id].postAppend();
        }
      }
    },

    setView:function(id, view) {
      this.views[id] = view;
    }
  });

  ComposedView.extend = function (child) {
    var view = Backbone.View.extend.apply(this, arguments);
    view.prototype.events = _.extend({}, this.prototype.events, child.events);
    return view;
  };

  return ComposedView;
});
