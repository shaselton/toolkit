// JavaScript Document
/*
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage isString
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 * 
 */

(function( $ ){
	

	$.fn.isString = function( str, options ){
		
		var isString = {
			
			result:false,
			settings:{
				includeNull:false,
				includeNumber:true,
				callback:$.noop
			},
			
			init: function(){
				
				options = $.extend( {}, this.settings, options );
				this.process();
				return this;
				
			},
			
			process: function(){

				if ( !options.includeNumber ) {
					
					this.result = ( options.includeNull ) ? $.isNull( str ) : !/\d/igm.test( str ) && $.isTypeofString( str );
					return;
					
				}
				else{
					
					this.result = options.includeNull  
									? $.isNull( str ) || $.isTypeofString( str )
									: !$.isNull( str ) && $.isTypeofString( str );
					
					return;									
		
				}		
						
			},
			
			callback: function(){
				
				if( $.isFunction( options.callback ) ){	options.callback.apply( $, [str, this.result] ); }
				
			}
			
		};
		
		isString.init().callback();
		return isString.result;
		
	} /* < / $.IsString  > */ 
	


})(jQuery);


