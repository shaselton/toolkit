		(function($){

			$.fn.carousel = function( options ){
				options = $.extend({}, $.fn.carousel.settings, options );
				this.each(function(){

					var activeIndex = 1,
					container = this,
					$ul = $(container).find('ul:first'),
					elementWidth = $ul.find(':first-child').outerWidth(true),
					size = $ul.children().length; 

					$ul.css({
						width :elementWidth * size, 
						position: 'relative',
						left: 0
					});

				    $(container).find(options.nav).css({
				    	position: 'relative',
					    display: 'block',
					    overflow: 'hidden'
					});

					$ul.find('li').css({
						display: 'block',
						'float': 'left'
					});

					
					var slider = {

						init: function(){
							if(size <= options.limit){ 
								$( options.next+","+options.prev ).remove(); 
								return; 
							}
							$( options.next ).click($.proxy(this,"next"));
							$( options.prev ).click( $.proxy(this,"prev"));
							
						},
						next: function(e){

							e.preventDefault();
							e.stopPropagation();
							if( $ul.is(':animated') ){ return; }
							if( activeIndex >= size - options.limit ){
								if( !options.loop ) return;
								activeIndex = 1;
								$ul.animate({ left: 0 }, options.time);
								return; 
							}
							activeIndex += options.limit;	
							$ul.animate({ left: parseInt($ul.css('left')) + parseInt( options.limit * elementWidth * -1 ) }, options.time);

						},
						prev: function(e){
							
							e.preventDefault();
							e.stopPropagation();
							if( $ul.is(':animated') ){ return; }
							if( activeIndex === 1 ){ 
								if( !options.loop ) return;
								activeIndex = options.limit * size;
								$ul.animate({ left: (size - options.limit) * -elementWidth  }, options.time);
								return; 
							}
							activeIndex -= options.limit;	
							$ul.animate({ left: parseInt($ul.css('left'))  + parseInt(options.limit * elementWidth) }, options.time);

						}

					};

					slider.init();
					
				});
				
			}; 
			$.fn.carousel.settings = {
				prev: '.prev',
				next:  '.next',
				limit: 3,
				time: 500,
				loop: false
			};
			

		})(jQuery);
