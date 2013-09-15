Cashflow.ItemListView = Cashflow.BaseView.extend({

  template:  _.template($("#template-item-list").html()),

  el: "#content",

  initialize: function() {
      $(window).bind("resize", _.bind(this.resize, this));
  },

  events: {
      "click .item":       "handleItemClick"
  },

  render: function() {
      var $view = this;
      var html = this.template({  });
      var $el = $(this.el);
      $el.html(html);

      $loading = $('<p>Loading Chart Data...</p>').css("color", "white").css("text-align", "center").css("margin-top", "90px").css('font-size', "30px").css("font-family", '"Lucida Grande","Lucida Sans Unicode",Verdana,Arial,Helvetica,sans-serif');
      $('#itemChart').append($loading);

      Cashflow.LiveData.get(function(data){
         $view.lastUpdated = data.lastUpdated;
         var goldRow = $("li", $el).eq(0);
         var silverRow = $("li", $el).eq(1);
         var platinumRow = $("li", $el).eq(2);
         var palladiumRow = $("li", $el).eq(3);

         goldRow
            .find("div.current_value").html("$" + data.gold.price).end()
            .find("div.button").addClass(data.gold.up ? "button_green" : "button_red")
            .find("div span.dollar").html("$ " + data.gold.changeDollar).end()
            .find("div span.percent").html(data.gold.changePercent + "%")
            .parent().addClass(data.gold.up ? "up" : "down");


        silverRow
            .find("div.current_value").html("$" + data.silver.price).end()
            .find("div.button").addClass(data.silver.up ? "button_green" : "button_red")
            .find("div span.dollar").html("$ " + data.silver.changeDollar).end()
            .find("div span.percent").html(data.silver.changePercent + "%")
            .parent().addClass(data.silver.up ? "up" : "down");

        platinumRow
            .find("div.current_value").html("$" + data.platinum.price).end()
            .find("div.button").addClass(data.platinum.up ? "button_green" : "button_red")
            .find("div span.dollar").html("$ " + data.platinum.changeDollar).end()
            .find("div span.percent").html(data.platinum.changePercent + "%")
            .parent().addClass(data.platinum.up ? "up" : "down");

        palladiumRow
            .find("div.current_value").html("$" + data.palladium.price).end()
            .find("div.button").addClass(data.palladium.up ? "button_green" : "button_red")
            .find("div span.dollar").html("$ " + data.palladium.changeDollar).end()
            .find("div span.percent").html(data.palladium.changePercent + "%")
            .parent().addClass(data.palladium.up ? "up" : "down");

        Cashflow.HistoricalData.get(function(response){
            $view.graphData = response;
            $view.drawChart('gold');
        });
      });

      var windowWidth = $(window).width();
      var windowHeight = $(window).height();
      $('#itemChart').height(windowHeight - $('#itemsWrapper').outerHeight(true) - 5);
  },

  drawChart: function(type){
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      new Dygraph(document.getElementById("itemChart"), _.map(this.graphData[type], function(item){ return [new Date(item[0]), item[1]]; }),
          {
              title: window.capitaliseFirstLetter(type) + " - London Fix",
              titleHeight: 40,
              labels: [ "Date", "US" ],
              showRangeSelector: true,
              fillGraph: true,
              strokeWidth: 0.00001,
              colors: ['#2f4d81'],
              fillAlpha: .5,
              strokeBorderWidth: 1,
              strokeBorderColor: '#fff',
              axisLabelColor: '#fff',
              gridLineColor: '#fff',
              gridLineWidth: 1,
              axisLineColor: '#fff',
              axisLineWidth: 1,
              drawYAxis: true,
              drawXGrid: false,
              rangeSelectorPlotFillColor: '#2f4d81',
              rangeSelectorPlotStrokeColor: '#fff',
              yAxisLabelWidth: 0,
              connectSeparatedPoints: true,
              labelsKMB: true,
              highlightCircleSize: 6,
              labelsSeparateLines: true,
              showLabelsOnHighlight: false,
              drawHighlightPointCallback: function(g, seriesName, context, cx, cy, color, pointSize){
                  context.beginPath();
                  context.arc(cx, cy, 5, 0, 2 * Math.PI, false);
                  context.fillStyle = color;
                  context.fill();
                  context.lineWidth = 1;
                  context.strokeStyle = "white";
                  context.stroke();

                  context.beginPath();
                  context.moveTo(cx, 45);
                  context.lineTo(cx, 3000);
                  context.strokeStyle = 'rgba(255,255,255,.3)';
                  context.stroke();
              },

              highlightCallback: function(e, x, pts, row) {
                  var context = $("#itemChart canvas").eq(1)[0].getContext("2d");

                  context.fillStyle = "#2f4d81";
                  context.strokeStyle = "white";
                  context.strokeRect($(window).outerWidth(true) - 120,47,95,30);
                  context.fillRect($(window).outerWidth(true) - 120,47,95,30);

                  context.fillStyle = "white";
                  context.font = "10pt helvetica";
                  var ptVal = (Math.round(pts[0].yval * 100)/100).toFixed(2);
                  context.fillText("USD: " + ptVal, $(window).outerWidth(true) - 115, 67)
              },

              axes: {
                  y: {
                      valueFormatter: function(y) {
                          return (Math.round(y * 100)/100).toFixed(2);
                      }
                  },

                  x: {
                      valueFormatter: function(y) {
                          var d = new Date(y);
                          return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
                      }
                  }
              }
          }
      );

  },

  reset: function(collection){
      this.collection = collection;
      this.render();
  },

  resize: function(){
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    if(windowHeight < windowWidth){
        $('#itemsWrapper').hide();
    } else {
        $('#itemsWrapper').show();
    }
  },

  handleItemClick: function(e){
      e.preventDefault();
      if($(e.target).hasClass('button') || $(e.target).hasClass("up") || $(e.target).hasClass("down") || $(e.target).hasClass("dollar") || $(e.target).hasClass("percent")){
          $('span.percent').toggle();
          $('span.dollar').toggle();
      } else {
          var type = $(e.target).closest("li").attr("id").replace("Row", "");
          this.drawChart(type)
          $(e.target).closest('li').addClass("selected").siblings().removeClass("selected");
      }
  },

});
Cashflow.itemListView = new Cashflow.ItemListView();