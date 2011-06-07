/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage fader
 * @copyright © 2011 http://jQueryToolkit.com | All rights reserved. 
 * 
 */


(function($){

	$.fn.fader = function( options ){
		options = $.extend({}, $.fn.fader.settings, options );
		var fader = function(){
			var 
			$dom = $(this),
			$list = $dom.find(options.innerTag), 	
			$next = null,
			$visible = null,
			core = {
				init: function(){
					$list.filter(':not(:first)').hide();
					this.load();		
				},
				load: function(){
					$visible = $list.filter(':visible');
					$next = $visible.next().length ? $visible.next() : $list.first();
					switch(options.effect){
						case "fade":
							this.fade();
							break;
						case "slideVertical":
							this.slideVertical();
							break;
						case "hideShow":
							this.hideShow();
							break;	
						case "slideHorizontal":
							$list.css({position:'absolute',left: 0});
							$list.filter(':not(:visible)').css({ left: -$visible.outerWidth() });
							this.slideHorizontal();
							break;	
							
					}

				},
				fade: function(){
					$visible.delay(options.delay).fadeOut(options.animationDelay,$.proxy(function(){
						$next.fadeIn(options.animationDelay, $.proxy(this.load,this));
					},this));
				},
				slideVertical: function(){
					$visible.delay(options.delay).slideUp(options.animationDelay,$.proxy(function(){
						$next.slideDown(options.animationDelay, $.proxy(this.load,this));
					},this));
				},
				hideShow: function(){
					$visible.delay(options.delay).hide(options.animationDelay,$.proxy(function(){
						$next.show(options.animationDelay, $.proxy(this.load,this));
					},this));
				},
				slideHorizontal: function(){
					$visible.delay(options.delay).animate({left: -$visible.outerWidth()},
														  options.animationDelay,
														  $.proxy(function(){
						$visible.hide();
						$next.show().animate({left: 0},options.animationDelay, $.proxy(this.load,this));
					},this));
				}
			};
			core.init();
		};
		this.each( fader );
	};

	$.fn.fader.settings = {
		effect: 'fade', // slideVertival, slideHorizontal, fade. hideShow.
		animationDelay: 500,
		innerTag: 'p',
		delay: 2000
	};
	
})(jQuery);