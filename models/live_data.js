PreciousMetals.LiveData = {

    getx: function(success){
      success.call(this, JSON.parse('{"lastUpdated":"Last updated at 12:34:12 on Mon August 13 2012","gold":{"up":true,"price":"1620.00","changeDollar":"0.50","changePercent":"0.03"},"silver":{"up":false,"price":"27.95","changeDollar":"-0.18","changePercent":"-0.64"},"platinum":{"up":false,"price":"1391.00","changeDollar":"-3.00","changePercent":"-0.22"},"palladium":{"up":false,"price":"1391.00","changeDollar":"-3.00","changePercent":"-0.22"}}'));
    },

    get: function(success){
        $.get("http://www.kitco.com/market/", function(response){
            attrs = {};
            var $table = $(response).find("p").filter(function(i, item){ return $(item).text().match(/York Spot/)}).closest("table");
            var $goldRow = $table.find("tr").eq(5);
            var $silverRow = $table.find("tr").eq(6);
            var $platinumRow = $table.find("tr").eq(7);
            var $palladiumRow = $table.find("tr").eq(8);

            attrs.lastUpdated = $(response).find("p").filter(function(i, item){ return $(item).text().match(/File created at/)}).text().replace("File created", "");

            attrs.gold = {
                up: parseFloat($goldRow.find("td").eq(7).text()) >= 0,
                price: (Math.round(parseFloat($goldRow.find("td").eq(5).text()) * 100)/100).toFixed(2),
                changeDollar: (Math.round(parseFloat($goldRow.find("td").eq(7).text()) * 100)/100).toFixed(2),
                changePercent: (Math.round(parseFloat($goldRow.find("td").eq(8).text()) * 100)/100).toFixed(2)
            };

            attrs.silver = {
                up: parseFloat($silverRow.find("td").eq(7).text()) >= 0,
                price: (Math.round(parseFloat($silverRow.find("td").eq(5).text()) * 100)/100).toFixed(2),
                changeDollar: (Math.round(parseFloat($silverRow.find("td").eq(7).text()) * 100)/100).toFixed(2),
                changePercent: (Math.round(parseFloat($silverRow.find("td").eq(8).text()) * 100)/100).toFixed(2)
            };

            attrs.platinum = {
                up: parseFloat($platinumRow.find("td").eq(7).text()) >= 0,
                price: (Math.round(parseFloat($platinumRow.find("td").eq(5).text()) * 100)/100).toFixed(2),
                changeDollar: (Math.round(parseFloat($platinumRow.find("td").eq(7).text()) * 100)/100).toFixed(2),
                changePercent: (Math.round(parseFloat($platinumRow.find("td").eq(8).text()) * 100)/100).toFixed(2)
            };

            attrs.palladium = {
                up: parseFloat($palladiumRow.find("td").eq(7).text()) >= 0,
                price: (Math.round(parseFloat($palladiumRow.find("td").eq(5).text()) * 100)/100).toFixed(2),
                changeDollar: (Math.round(parseFloat($palladiumRow.find("td").eq(7).text()) * 100)/100).toFixed(2),
                changePercent: (Math.round(parseFloat($palladiumRow.find("td").eq(8).text()) * 100)/100).toFixed(2)
            };

            success.call(this, attrs);
        });
    }

};