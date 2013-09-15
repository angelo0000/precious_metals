PreciousMetals.TheController = Backbone.Router.extend({

  routes: {
    "/":    "index",
    "":    "index"
  },

  index: function(magazineId) {
      PreciousMetals.itemListView.reset();
  },

});

PreciousMetals.theController = new PreciousMetals.TheController();