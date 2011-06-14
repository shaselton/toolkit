// JavaScript Document
/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage Truncate
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 * 
 * 
 * 				$('div').truncate({
					size: 4,
					ignoreWhiteSpace: true,
					callback: function( result ){
						console.log( $(this ) );
						console.log( result );
					}
				});
 * 
 * 
*/


(function($){

    
    
	$.fn.truncate = function(){  
		
			var options = $.extend({}, $.fn.truncate.settings, arguments[0] || {});
			
			function truncate(){
				
				//private
				var $self = $(this),
					self = this,
					truncatedText = null,
					originalText = $self.text().toString(),
					returnData = null,
					index = null,
					whitespace = " ";
				
				//public methods
				return {
					init: function(){
						if( options.truncateBy == 'chars'){
							
							var sliceSize = ( options.ignoreWhiteSpace ) 
												? options.size + $.trim(originalText).split(/\s+/).length - 1 
												: options.size;
							
							if( !options.ignoreDelimeterSize ){
								sliceSize -= options.delimeter.length;
							}					
							
							truncatedText = (originalText.length > options.size) 
													? originalText.substring(0, sliceSize) + options.delimeter 
													: originalText;
						
						}else if(options.truncateBy == 'word'){
							truncatedText = $.trim(originalText).split(/\s+/).slice(0,options.size).join(whitespace) + options.delimeter;
						}
						
						$self.text(truncatedText);
							
						options.callback.call(self, {
			        		originalText : originalText ,
			        		truncatedText : truncatedText,
			        		index: index
						});
						
					},
					setIndex: function( i ){
						index = i;
					}
				}
				
			};
			
			this.each(function(index){
				var truncateInstance = truncate.call(this);
				truncateInstance.setIndex( index );
				truncateInstance.init( index );
			});
			
	};
	
	$.fn.truncate.settings = {
			truncateBy: 'chars', // chars, word
			size : 10 ,
			ignoreWhiteSpace: false,
			ignoreDelimeterSize: true, // this is only when you have the truncateBy == "chars"
			delimeter : "..." ,
			callback: $.noop
	};

       
})(jQuery);