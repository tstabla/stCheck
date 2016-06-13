 /*!
 * stCheck
 *
 * Copyright (c) 2016 - Tomasz Stabla | http://www.stabla.com
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Any and all use of this script must be accompanied by this copyright/license notice in its present form. 
 *
 * Plugin inspired by https://github.com/itsalif/ezMark
 *
 * Usage: new stCheck('input[type="checkbox|radio"]');
 * 
 * @author: Tomasz Stabla
 * @Version:  1
 * @Last update: 13.06.2016
 */

(function() {
    var stCheck = function(selector) {

      	var defaultOpt = { 
      		checkboxClass   : 'stcheck-checkbox', 
            radioClass      : 'stcheck-radio',	
      		checkedClass 	: 'stcheck-checkbox--checked', 
            selectedClass   : 'stcheck-radio--selected'
      	};

        var elements = document.querySelectorAll(selector);
            elements = [].slice.call(elements);

        var wrapElement = function(element, type) {
            var wrap = document.createElement('div');

            wrap.innerHTML = element.outerHTML;

            element.parentNode.insertBefore(wrap, element);
            element.parentNode.removeChild(element);

            if( type == 'checkbox' ) {
                wrap.classList.add( defaultOpt.checkboxClass );
            } else if( type == 'radio' ) {
                wrap.classList.add( defaultOpt.radioClass );
            }

            return wrap;
        };

        elements.forEach(function(element, key) {
            var type = element.getAttribute('type');

            var wrap = wrapElement( element,  type );

                element = wrap.querySelector('input');

            if( type == 'checkbox' ) {
                element.addEventListener('change', function() {
                    if( element.checked ) { 
                        wrap.classList.add( defaultOpt.checkedClass ); 
                    } 
                    else {  
                        wrap.classList.remove( defaultOpt.checkedClass );    
                    }
                });
                
                if( element.checked ) {
                    wrap.classList.add( defaultOpt.checkedClass );         
                }
            } else if( type == 'radio' ) {
                element.addEventListener('change', function() {

                    var group = document.querySelectorAll('input[name="'+ element.getAttribute('name') +'"]');
                        group = [].slice.call(group);

                        group.forEach(function(item, k) {

                            if( item.checked ) { 
                                item.parentNode.classList.add( defaultOpt.selectedClass ); 
                            } else {
                                item.parentNode.classList.remove( defaultOpt.selectedClass );                       
                            }

                        });
                });
                
                if( element.checked ) {
                    wrap.classList.add( defaultOpt.selectedClass );            
                }           
            }

        });
    }

    window.stCheck = stCheck;
}());