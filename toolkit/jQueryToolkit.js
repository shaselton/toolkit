// JavaScript Document

/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage Toolkit
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 * this should be modified	
 * 
 * My Own Comment2
 */
function GenerateObject(){	
		
	    var ChainableObject = function(){ return new ChainableObject.fn.init();  };
		ChainableObject.fn = ChainableObject.protoype = {};
		ChainableObject.fn.init = function(){};
		ChainableObject.fn.init.prototype = ChainableObject.fn;
		return ChainableObject;
}
		
/* LOGIN BEHIND THE SCENS
ChainableObject.protoype ={
	init.prototype = ChainableObject.prototype,
	init.prototype.testing = function(){}  // returns to ChainableObject.prototype
}

*/


(function(window) {
	

	var $ToolkitObject = new GenerateObject();
	
	$ToolkitObject.fn.testing = function(){
		this.testing2().testing2();
		return this;
	};
	
	$ToolkitObject.fn.testing2 = function(){
		
	

		jQuery.fn.extend({

			
		  check : function() {
		    return this.each(function() { this.checked = true; });
		  },

		  
		  
		  uncheck : function() {
		    return this.each(function() { this.checked = false; });
		  },
		  
		  
		  disable :function() {
		    return this.each(function() { this.disabled = true; });
		  },
		  
		  
		  enable : function() {
		    return this.each(function() { this.disabled = false; });
		  },
		  
		  
		  
		  selected : function(){
			  return this.each(function(){  this.selected = true;  });
		  },
		  
		  
		  trueHtml : function(){

		    return this.each(function(){
		        var cloneHtml = $(this).clone();
		        cloneHtml.html($(this).html());
		    });

		  },
		  

		  ActivateFocus : function(){
		  	  $.FocusSelector = {};
		  	  return this.each(function(index){  	  	 
		  	  	  $.FocusSelector[index] = this;
		  	  	  
				  $("*",this).each(function(){
			  		   
			  		  this.hasFocus=false;
					  $(this).focus(function(){  this.hasFocus = true;    });
					  $(this).blur(function(){  this.hasFocus  = false;  });
					  
				  });
				  
			  });
		  }	,
		  
		  
		  swapClass : function(c1, c2) { 
		  
		  	  return this.each(function(){ 
		  	  	  $(this).toggleClass(c1).toggleClass(c2); 
		  	  }); 
		  
		  } 
		  

		});



		jQuery.extend(jQuery.expr[":"], {

		  'focused'     : function(element){
			 return  element.hasFocus;  
		  }


		});

		
		
		return this;
	};
	
	
	window.$ToolkitObject = $ToolkitObject; 
	
})(window);



var $Toolkit = $ToolkitObject();
$Toolkit.testing().testing();









