// JavaScript Document
/*
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage isString
 * @author Scott Haselton
 * @copyright © 2011 http://jQueryToolkit.com | All rights reserved. 
 * 
 * 
 */


(function( $ ){
	

	$.fn.autoTab = function(){
		
		var dom = this,
			$dom = $(this)
			argus = arguments;
		
		var autoTab = {
			
			options:{},
			defaults:{
				
				numbOfChars : $dom.attr('maxlength') || 5,
				callback:$.noop,
				ajax: false,
				nextTarget: ( $dom.attr('tabindex') ) ? $dom.attr('tabindex') + 1 : 4
				
			},
			
			init: function(){
				
				this.determineAction();
				return this;
				
			},
			
			determineAction: function(){
				
				if ( argus.length == 1 ){
				
					if ( typeof argus[0] === 'string' || typeof argus[0] === 'number' ){
						this.defaults.numbOfChars = parseInt( argus[0] );
						this.extend( {} );
					} else {
						this.extend( argus[0] );					
					}
				}
			},
			
			extend: function( obj ){
				
				autoTab.options = $.extend( autoTab.options, autoTab.defaults, obj );	
				
			},
				
			keypressDown: function(){
				
				if ( autoTab.options.numbOfChars < $dom.val().length ){
					$dom.blur();
				}
				
			},
			
			callback: function(){
				
				if( $.isFunction( options.callback ) ){	options.callback.apply( $, [str, this.result] ); }
				
			}
			
		};
			
		$dom.keypress( autoTab.keypressDown );
			
		return this.each( autoTab.init() );
		//return isString.result;
		
	} /* < / $.IsString  > */ 
	


})(jQuery);
