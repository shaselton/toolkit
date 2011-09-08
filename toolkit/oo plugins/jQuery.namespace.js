(function($){
	
	/**
	 * jQuery.namespace. this function adds namespace to our desired object
	 * 
	 * @package jQuery Toolkit
	 * @author mahdi pedramrazi
	 * 
	 * @params {Array/String...}
	 * 
	 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
	 * @license licensing@jquerytoolkit.com
	 * http://www.jquerytoolkit.com/license
	 * 
	 * 
	 * @example
	 * 
	 * $.namespace(["liteframe.actions.controller","cake.action.jump"]);
	 * //$.namespace("liteframe.actions.controller","cake.action.jump");
	 * liteframe.actions.controller = function(){
	 * 		console.log("this is it");
	 * };
	 * cake.action.jump = function(){
	 * 	console.log("this is it 2");
	 * };
	 * new liteframe.actions.controller();
	 * new cake.action.jump();
	 * 
	 */
	$.namespace = function(){

		var args = (arguments.length == 1 && $.isArray(arguments[0]))? arguments[0] : arguments,
			splittedDot,
			i = 0,
			j = 0,
			dynamicVar;
		
		if(!args.length){ return; }
		for( i=0; i<args.length; i++){
			splittedDot = args[i].split('.');
			dynamicVar = window; 
			for( j=0; j < splittedDot.length; j++){
				if(!dynamicVar[splittedDot[j]]){ 
					dynamicVar[splittedDot[j]] = {}; 
					dynamicVar = dynamicVar[splittedDot[j]];
				}
			}	
		}
	};

})(jQuery);