define(['underscore', 'jquery', 'backbone', 'router', 'moment'], function (_, $, Backbone, router, moment) {
  var BaseView = Backbone.View.extend({
    data: {},

    /**
     * By default, all links will be handled as if they
     * wanted to take the router to where href points to.
     */
    events: {
      'click a:not([data-action])' : '__handleLink'
    },

    __handleLink : function (e) {
      var path;

      e.preventDefault();
      path = $(e.target).attr('href');
      router.navigate(path, {trigger:true});
    },

    prepareData: function () {
      return _.extend({
        collection: this.collection,
        model: this.model,
        moment: moment
      }, this.data);
    },

    render: function () {
      var text;
      if (this.loading === true) {
        text = "Loading...";
      } else {
        text = this.template(this.prepareData());
      }
      this.$el.html(text);
      return this;
    }
  });

  BaseView.extend = function (child) {
    var view = Backbone.View.extend.apply(this, arguments);
    view.prototype.events = _.extend({}, this.prototype.events, child.events);
    return view;
  };

  return BaseView;
});