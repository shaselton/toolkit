/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage InObject
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 */

(function($){
	
	$.inObject = function(obj, value, options){
		
		var settings = {
				includeProtoSearch : false			
			},
			options = $.extend( {}, settings, options );
		
		for(i in obj){
			// We're going to check to see if the user wants to check the prototype chain.
			if ( !options.includeProtoSearch ){
				if ( obj.hasOwnProperty( i ) && obj[i] == value ){
					return i;
				}
			} else {
					
				if(obj[i] == value){ 
					return i;  
				} 
				
			}
		}
		return -1;
	}
		  
})( jQuery );
