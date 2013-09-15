window.capitaliseFirstLetter = function(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
};

window.PreciousMetals = {

	log: function(msg){
	    if(window.PreciousMetals.debug == true){
	        console.log(msg);
	    }
	},

	removeSplash: function(){
	    $('#splash').remove();
	}


};