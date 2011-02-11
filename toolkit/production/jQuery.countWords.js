/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage CountWords
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 */


// Maybe use regex '/(\s*)/'
//$("body").append("<div class='wow'>"+t+"</div>");


// improve to accept any type of parameter.
  (function($){
  
  	$.CountWords = function( str ){
  		
  	    str = str.split(/(\s*)/);
  	    console.log(str);
  	    return str.length;
  	}
  	
  })(jQuery);
  
  
  
  
  
