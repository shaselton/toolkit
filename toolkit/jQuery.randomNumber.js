/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage GetRandomNumber
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 */
  (function($){
  	
  	// include option to change radix
  	$.GetRandomNumber = function(min,max, options){
  		
  		var opts = {},
			defaultOpt = {
				radix : 10
			};
		
		if ( isNaN( options ) ){
			opts.radix = options;
		} else {
			$.extend( opts, defaultOpt );
		}
		
        max = max + 1;
        return parseInt(Math.random()*(max-min) +min, opts.radix ); 
  	}
  	
  })(jQuery);
  
  
  console.log($.GetRandomNumber(0,10));
  
  console.log($.GetRandomnumber(10,14));
  console.log($.GetRandomNumber(10,14,{radix:16}));
  console.log($.GetRandomNumber(10,14,{something:2392309}));
