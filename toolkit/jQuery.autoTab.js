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
				
				numbOfChars : $dom.attr('maxlength') || 5,  // TODO: to be changed later!
				//callback:$.noop,
				ajax: false,
				nextTarget: ( $dom.attr('tabindex') ) ? 
							parseInt($dom.attr('tabindex'), 10) + 1 : // unexpected behavior if bad input string?
							4  //TODO: placeholder
				
			},
			
			init: function(){
				
				this.determineAction();
				return dom;
				
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
				
			keypressDown: function(event){
				
				if ( autoTab.options.numbOfChars < $dom.val().length ){
					
					if ( ($next = $('[tabindex=' + autoTab.options.nextTarget + ']')).length !== 0 ){
						$next.focus();
					} else {
						// simulate tab being pressed
						//$dom.trigger('keypress', 
						$dom.next().focus();
					}
					
				}
				
			},
			
			callback: function(){
				
				//if( $.isFunction( options.callback ) ){	options.callback.apply( $, [str, this.result] ); }
				
			}
			
		};
			
		$dom.keypress( autoTab.keypressDown );
		
		return autoTab.init();
		
	} /* < / $.autoTabx  > */ 
	


})(jQuery);
