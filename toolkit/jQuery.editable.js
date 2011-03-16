/*!
 * Copyright(c) 2010 jQuery Toolkit
 * http://www.jquerytoolkit.com
 * 
 */

/**
 * @author  Mahdi Pedramrazi
 * @version 0.1
 * @date    Nov,15 2010
 */

(function( $ ){
	
	$.fn.editable = function( options ){
		options = $.extend( {}, $.fn.editable.defaults, options );
		var editable = function(){
			
			var dom  = this,
				$dom = $(this),
				actions;
			
			actions = {
					
				newValue: null,	
				
				
				/***
				*init
				*/
				init: function(){
					this.enableTooltip();
					if( options.cursor ){  $dom.css( 'cursor', options.cursor ); }
					$dom.bind( options.event, $.proxy( this,'activate' ) ).data('content', false);
				},
				
				
				/***
				 * activate
				 * dom is going to be altered and new textbox is going to popup
				 * @param {Object} event
				 */
				activate: function( event ){
					event.preventDefault();
					event.stopPropagation();	
					if( $dom.data('content') ){ return; }
					if( this.isEmpty() ){ $dom.data('empty', true);  }
					this.buildEditable();
					this.disableTooltip(); // disable the tooltip with the textbox is shown so we don't get the title on the textbox or textarea
				},

				
				/**
				 * buildEditable 
				 * 
				 */
				buildEditable: function(){
					var cnt = ( $dom.data('empty') ) ? '' : $dom.html(),
						$input = (options.type == 'textarea') ? $("<textarea />") : $("<input type='text' />");
						
						$input
						.val( $dom.data( {'content': cnt, 'empty': false }).data('content') )
						.bind('blur', $.proxy(this,'processRequest'))
						.bind('keypress', $.proxy(this,'processRequest') )
						.appendTo( $dom.empty() )
						.focus();
						
					if( options.addClass ){ $input.addClass( options.addClass ); }				
				},
				
				/**
				 * processRequest
				 * @param {Object} event
				 */				
				processRequest: function( event ){
					
					event.stopImmediatePropagation();	
					if( (options.type != 'textarea' && event.which == 13) || event.type === 'blur' ){
						this.newValue = event.currentTarget.value;
						if( options.saving ){ $dom.html( options.saving ); }
						//no change has been made to the input box so we don't need to trigger any ajax call
						if( $dom.data('content') == this.newValue ){ this.updateDom(); return; }	
						if( options.url ){ this.ajaxRequest(); }
						else{ this.updateDom();  }
					}
				},
				
				
				/**
				 * ajaxRequest
				 */		
				ajaxRequest: function(){
					$.ajax({
						url:      options.url,
						type:     options.ajaxType,
						cache:    false,
						data:     $.extend( {}, options.ajaxData, { value: this.newValue } ),
						dataType: "json",
						error:    options.error,
						context: this,
						success: this.ajaxSuccess
					});
				},
				
				/**
				 * enableTooltip
				 */	
				enableTooltip: function(){
					if( options.tooltip ){ $dom.attr( 'title', options.tooltip ); }					
				},
				
				
				/**
				 * disableTooltip
				 */	
				disableTooltip: function(){
					if( options.tooltip ){ $dom.attr( 'title', '' ); }	
				},
				
				
				/**
				 * ajaxSuccess
				 * @param {Object} json
				 * @param {String} status
				 * @param {Object} xhr
				 */	
				ajaxSuccess: function( json, status, xhr ){
					if( json.error ){ options.error.apply( dom, [json, status, xhr] ); return; }
					this.newValue = json.value;
					this.updateDom();
					options.success.apply( dom, [json, status, xhr] );
				},
				
				
			    /**
			     * updateDom
			     */	
				updateDom: function(){
					if( $.trim( this.newValue ) === '' ){ 
						this.newValue = options.emptyText; 
						$dom.data( 'empty', true );   
					}
					$dom.html( this.newValue ).data( 'content', false );
					this.enableTooltip();
				},
				
				
				/**
				 * isEmpty
				 * @return {Boolean} isEmpty
				 */	
				isEmpty: function(){
					var trimmedText = $.trim( $dom.text() );
					var trimmedEmptyText = $.trim( options.emptyText );
					return ( trimmedEmptyText.toLowerCase() == trimmedText.toLowerCase() ||  trimmedText == '' );  
				}
				
			};

			actions.init();
			
		};  
		return this.each( editable );
	}
	
	$.fn.editable.defaults = {
		url:       false,	// false or url
		tooltip:   'edit me',   // false or text
		cursor:    'pointer',   // normal, pointer, ...
		event:     'click',     // mouseover, click
		emptyText: '( empty )', // String
		saving:    'Saving...',  // false or text
		ajaxData:  {},
		ajaxType:  'POST',
		error: 	   $.noop,//function( json, status, xhr ){  },
		success:   $.noop,//function( json, status, xhr ){  },
		addClass:  false,
		type:      'text' // text - textarea
	};

})( jQuery );
