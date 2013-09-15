window.capitaliseFirstLetter = function(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
};

window.Cashflow = {

	log: function(msg){
	    if(window.Cashflow.debug == true){
	        console.log(msg);
	    }
	},
	
	removeSplash: function(){
	    $('#splash').remove();
	}
    
    
};