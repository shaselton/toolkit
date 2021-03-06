/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage RemoveArrayIndex
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright � 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 */

(function($){
  	
  	$.removeArrayIndex = function(index){
  		
  	    var r = new Array();
  	  
  	    for(var i = 0, n = this.length; i < n; i++){
  	        if( i != index){ r.push(this[i]); }
  	    }

  	    return r;
  	}
  	
})(jQuery);
  