// JavaScript Document
/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage Watermark
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 */

(function($){
	
	
	$.fn.watermark = function(options){ 
		
		options = jQuery.extend({}, $.fn.watermark.settings, options);	
		
		return this.each(function(index, selector){
				
			var $watermark = $(selector),
				
				obj = {
					value: $watermark.data('watermark'),
					selfWatermarkPassword: null,
					isFocused: false,	
					
					focus: function( event ){ 
				
						var dom = event.currentTarget;
						this.isFocused = true;
						this.inactiveWatermark(dom); 
						if( this.isWatermarked(dom) ) { dom.value = ''; }
						
					},
					
					blur: function( event ){  
						
						var dom = event.currentTarget;
						this.isFocused = false;
						if( this.isWatermarked( dom ) ){ 
							
							 this.activeWatermark( dom ); 
							 dom.value = this.value;  
							
						}   
					
					},		
					
					keyup: function( event ){ 
						var dom = event.currentTarget;
						$(dom).data('isWatermarked' ,obj.needWatermark() );
						
					},
					
					checkWatermarkActive: function( event){
						var dom = event.currentTarget;
						if( obj.needWatermark() ){ this.activeWatermark( dom ); }
						else{ this.inactiveWatermark( dom ); }			
						
					},
					
					activeWatermark: function(self){
					
						$(self).addClass( options.activeWatermarkClassName );
						if(this.selfWatermarkPassword !== null){
							
							$watermark.hide();
							this.selfWatermarkPassword.show();
							
						}		
					},
					
					inactiveWatermark: function(self){
					
						$(self).removeClass(options.activeWatermarkClassName);
						if(this.selfWatermarkPassword !== null && !this.isFocused){
							
							this.selfWatermarkPassword.hide();
							$watermark.show().trigger('focus');
							
							
						}
						
					},
					
					needWatermark: function(){
					
						return ( $watermark.val() == '' ||  $watermark.val() == this.value);
						
					},
					
					handleFormSubmission: function( event ){
						
						$(event.currentTarget).find('.'+options.className).each(function(){ 
							
							if( obj.isWatermarked(this) ) {   this.value = '';  }
							
						});
						
					},
					
					isWatermarked: function( self ){ return $(self).data('isWatermarked'); },

					actions: function(){
						
						$watermark.addClass(options.className)
								  .data('isWatermarked' , true)
								  .addClass( options.activeWatermarkClassName )
								  .val( this.value );
							
						if($watermark.attr('type') == 'password'){
							
							this.selfWatermarkPassword = $watermark.clone();
							this.selfWatermarkPassword.attr('type', 'text')
													 .insertBefore($watermark)
													 .bind('focus',this.InactiveWatermark);
							$watermark.hide();
						}

						
					}
			};// obj ends
			
			$watermark
				.bind('focus', $.proxy(obj,"focus"))
				.bind('blur', $.proxy(obj,"blur"))
				.bind('keyup', $.proxy(obj,"keyup"))
				.bind('keypress', $.proxy(obj,"checkWatermarkActive"))
				.parents('form').bind('submit', $.proxy(obj,"handleFormSubmission"));
			
			obj.actions();
			
		});
			
	};/* </ watermark > */
	
	$.fn.watermark.settings ={
			
			className : 'toolkit-watermark' ,
			activeWatermarkClassName : 	'toolkit-watermark-active'
	};	
	
	$.watermark = {};
	$.watermark.destroy = function(){
		
		if(watermark.self !== null){
			watermark.self.each(function(){
				
				destroySelf = $(this);
				destroySelf.removeData('isWatermarked').removeClass( options.className+' '+watermark.options.activeWatermarkClassName).unbind();
				
			});
		}
		
		
	};	
	
})(jQuery);

/*

$(document).ready(function(){

	$('.water').watermark();
	
	$('form').submit(function(){
		
		console.log('submit form');
		console.log($(this).serialize());
		
		return false;
	});
	//$.watermark.destroy();

});

*/