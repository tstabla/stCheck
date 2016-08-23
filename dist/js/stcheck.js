/*! 
 * stCheck 
 * Stylize radio and checkbox buttons easily.
 * 
 * Licensed under the MIT license: 
 * http://www.opensource.org/licenses/mit-license.php 
 * 
 * Any and all use of this script must be accompanied by this copyright/license notice in its present form. 
 * 
 * Version: 0.9.0
 * Author: Tomasz Stabla <t.stabla@hotmail.com> (http://stabla.com)
 * Site: https://github.com/tstabla/stCheck/
 */
(function (root, factory) {
  if ( typeof define === 'function' && define.amd ) {
    define([], factory(root));
  } else if ( typeof exports === 'object' ) {
    module.exports = factory(root);
  } else {
    root.stCheck = factory(root);
  }
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {
	'use strict';

  var stCheck = function(selector) {

  	var classNames = {
  		checkbox        : 'stcheck-checkbox',
      radio           : 'stcheck-radio',
  		checkboxChecked : 'stcheck-checkbox--checked',
      radioChecked    : 'stcheck-radio--checked'
  	};

    var elements = document.querySelectorAll(selector);
        elements = [].slice.call(elements);

    var wrapElement = function(element, type) {
      var wrap = document.createElement('div');

      wrap.innerHTML = element.outerHTML;

      element.parentNode.insertBefore(wrap, element);
      element.parentNode.removeChild(element);

      if( type == 'checkbox' ) {
        wrap.classList.add( classNames.checkbox );
      } else if( type == 'radio' ) {
        wrap.classList.add( classNames.radio );
      }

      return wrap;
    };

    elements.forEach(function(element, key) {
      var type = element.getAttribute('type');

      if( type != 'checkbox' && type != 'radio' ) {
        return;
      }

      var wrap = wrapElement( element,  type );

      element = wrap.querySelector('input');

      if( type == 'checkbox' ) {
        element.addEventListener('change', function() {
          if( element.checked ) {
            wrap.classList.add( classNames.checkboxChecked );
          }
          else {
            wrap.classList.remove( classNames.checkboxChecked );
          }
        });

        if( element.checked ) {
          wrap.classList.add( classNames.checkboxChecked );
        }
      } else if( type == 'radio' ) {
        element.addEventListener('change', function() {

          var group = document.querySelectorAll('input[name="'+ element.getAttribute('name') +'"]');
              group = [].slice.call(group);

          group.forEach(function(item, k) {
            if( item.checked ) {
              item.parentNode.classList.add( classNames.radioChecked );
            } else {
              item.parentNode.classList.remove( classNames.radioChecked );
            }
          });
        });

        if( element.checked ) {
          wrap.classList.add( classNames.radioChecked );
        }
      }
    });
  };

  return stCheck;
});
