Cashflow.CashflowController = Backbone.Router.extend({

  routes: {
    "/":    "index",
    "":    "index"    
  },

  debug: function(){
      WebReader.debug = true;
      this.index();
  },

  index: function(magazineId) {
      Cashflow.itemListView.reset();
  },
  
});

Cashflow.cashflowController = new Cashflow.CashflowController();