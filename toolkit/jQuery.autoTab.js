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
	

	$.fn.autoTab = function( ){	
		
		var argus = arguments;
			
		var AUTO = function(){
			
			var dom = this,
				$dom = $(this),				
				defaults = {						
					numbOfChars: 	$dom.attr('maxlength') || 5,  // TODO: to be changed later!
					callback:		$.noop,
					name:			$dom.attr('name'),
					htmlType: 		'text',
					ajax: 			false,
					index:			arguments[0],
					nextTarget: 	( $dom.attr('tabindex') ) ? 
										parseInt($dom.attr('tabindex'), 10) + 1 : // unexpected behavior if bad input string?
										4  //TODO: placeholder					
				}
	
			var autoTab = {
				
				options: {},
				
				init: function(){
					
					console.log(defaults);
					
					this.determineAction();
					this.setElementParameter();
					this.setDomEvents();
					return this;
					
				},
				
				determineAction: function(){
					
					if ( argus.length === 1 ){					
						if ( typeof argus[0] === 'string' || typeof argus[0] === 'number' ){							
							defaults.numbOfChars = parseInt( argus[0] );
							return this.extend( {} );
						} else {
										
							if ( argus[0][defaults.name] ){
								defaults.numbOfChars = parseInt( argus[0][defaults.name], 10);
							} else {
								defaults.numbOfChars = parseInt( argus[0]['default'], 10) || defaults.numbOfChars;
							}
							return this.extend( {} );
						}
					}
					
				},
				
				
				
				setElementParameter: function(){
					
					$dom.addClass('autoTab' + autoTab.options.index);
					autoTab.options.htmlType = $dom.attr('type');
					
				},
				
				
				
				extend: function( obj ){
					
					autoTab.options = $.extend( {}, defaults, obj );
					
				},
				
				setDomEvents: function(){
				
					switch( autoTab.options.htmlType ){
						
						case 'text':
							$dom.keypress( autoTab.keypressDown );
							break;
						case 'checkbox':
							$dom.click( autoTab.clickAction );
							break;
						default:
							$dom.keypress( autoTab.keypressDown );
							break;
						
					}
				
				},				
					
				keypressDown: function(){
										
					if ( autoTab.options.numbOfChars < $dom.val().length ){
						
						if ( ($next = autoTab.checkForNextElement()).length !== 0 ){
							$next.focus();
						} else {
							// simulate tab being pressed
							//$dom.trigger('keypress', 
							if ( ($dom.next()).length !== 0){
								$dom.next().focus();
							}else{
								$dom.blur();
							}
						}						
					}
					
				},
				
				clickAction: function(){
					console.log('click happened...moving to the next focus');
					if ( ($next = autoTab.checkForNextElement()).length !== 0 ){
						$next.focus();
					}
				},
				
				checkForNextElement: function(){
					
					return $('[tabindex=' + autoTab.options.nextTarget + ']');
					
				},
				
				
				callback: function(){
					
					//TODO: figure out later that apply options.
					//if( $.isFunction( autoTab.options.callback ) ){	autoTab.options.callback.apply( $, [str, this.result] ); }
					
					
				}
				
			};
				
			
			autoTab.init();
		}
		
		return this.each( AUTO );
		
	} /* < / $.autoTab  > */ 
		


})(jQuery);
