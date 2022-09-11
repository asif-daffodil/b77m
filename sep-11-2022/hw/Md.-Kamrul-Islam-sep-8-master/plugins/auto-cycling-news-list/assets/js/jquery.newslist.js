/*
 * News List
 * @author Michael Chadwick
 * @url http://nebyooweb.com
 * @url http://github.com/nebyoolae/newslist
 * @license Licensed under the MIT License
 * @description jQuery plugin for auto-cycling multiple news item slideshow with additional manual control
 *
**/

/*
 * News List is a simple way to display a list of items in a auto-cycling slideshow.
 * By calling the newslist() method on an element with the correct structure shown
 * below, control links will be automatically created. Items will fade in and out 
 * over a configurable amount of time, but any individual item can be chosen manually,
 * which will stop the auto-cycle. The class for the cycler and the control link hover
 * will need to be changed in the newslist.css file if you don't use the defaults.
 *
 * Simple usage:
 *   $('elem').newslist();
 *
 * Advanced usage (with defaults listed): 
 *   $('elem').newslist({
 *     'itemsDiv'       : '.items',     // class of news items container
 *     'item'           : '.item',      // class of individual news item
 *     'controlsDiv'    : '.controls',  // class of control link container
 *     'cycler'         : true,    			// is auto-cycler on?
 *     'hoverClass'     : 'on',         // class for hovering over control links
 *           
 *     'cycleSpeed'     : 10000,        // speed, in milliseconds, of auto-cycler
 *     'fadeSpeed'      : 1000,         // speed, in milliseconds, for news item to fade in
 *     'maxLoops'       : null,         // number of times the whole slideshow should loop; 
 *                                         if null, will loop indefinitely
 *           
 *     'leadZero'       : false         // should the control links use a leading zero for items 1-9?
 *   });
 *
 * HTML:
 * <script type="text/javascript" src="newslist.js"></script>
 * <div id="newslist">
 *   <div class="items">
 *     <div class="item">News item #1.</div>
 *		 <div class="item">News item #2.</div>
 *		 <div class="item">News item #3.</div>
 *		 <div class="item">News item #4.</div>
 *   </div>
 *   <div class="controls"></div>
 * </div>
 * <script type="text/javascript">
 *   $("#newslist").newslist();
 * </script>
**/

(function($) {

  $.fn.newslist = function(options) {
    return this.each(function() {
      $.init(this, options);
    });
  };

  // initialize all components and start item cycle
  $.init = function(container, options) {

    var $itemsDiv, $items, $controlsDiv, $controls;
    var defaults, settings, cycleOps = [];
    var i;
    
    // create default options
    defaults = {
      'itemsDiv'       	: '.items',
      'item'           	: '.item',
      'controlsDiv'    	: '.controls',
      'cycler'         	: true,
      'hoverClass'     	: 'on', 
      'cycleSpeed'     	: 10000,
      'fadeSpeed'      	: 1000,
      'maxLoops'       	: null,
      'leadZero'       	: false
    };

    // create global settings from defaults and user overrides
    if (options) {
      settings = $.extend({}, defaults, options);
    }

    $itemsDiv = $(container).find(settings.itemsDiv); // grab div with items in it
    $items = $(container).find(settings.item); // grab all items
    $controlsDiv = $(container).find(settings.controlsDiv); // grab div with control links
    
    cycleOps = {
      'init'				  	: 1,
      'cur'							: 1,
      'total'						: settings.maxLoops * $items.length-1
    };
  
    // attach ids to all items
    i = 1;
    $items.each(function() {
      $(this).attr("id", "item" + i++);
    });
        
    // create a control link for each item
    for (i = 1; i <= $items.length; i++) {
      if(i < 10 && settings.leadZero) {
        itext = "0" + i;
      } else {
        itext = i;
      }
      $controlsDiv.append("<a rel=\"" + i + "\" id=\"control" + i + "\" href=\"#" + i + "\">" + itext + "</a>");
    }
    $controls = $controlsDiv.children("a"); // grab all control links
        
    // attach click event to all control links
    $controls.click(function(e) {
      e.preventDefault();
      changeItemTo(settings, $items, $controls, $(this));
    });
        
    // attach hover event to all control links
    $controls.hover(
      function() { $(this).addClass(settings.hoverClass); },
      function() { $(this).removeClass(settings.hoverClass); }
    );
        
    // load first news item
    loadFirstItem(settings, $items, $controls, $itemsDiv);
    
    // start the cycle of items
    setIntervalID = setInterval(
      function() {
        cycleItems(settings, cycleOps, $items, $controls);
      }, 
      settings.cycleSpeed
    );

  };

  /****************************/
  /* Item slideshow functions */
  /****************************/

  // initial load
  function loadFirstItem(settings, $items, $controls, $itemsDiv) {

    $items.hide();
    $items.eq(0).fadeIn(settings.fadeSpeed);
    $controls.eq(0).addClass("current");
    $itemsDiv.css("overflow", "hidden");
    
  }

  // manual: click control link to change item; interrupts auto
  function changeItemTo(settings, $items, $controls, link) {
    
    // turn off cycler
    settings.cycler = false;
    $items.hide();
    $items.eq(link.index()).fadeIn(settings.fadeSpeed);
    $controls.removeClass("current");
    link.addClass("current");
  
  }

  // auto: cycle items
  function cycleItems(settings, cycleOps, $items, $controls) {

    var nextItemId;

    if ( ((cycleOps.cur <= cycleOps.total) || (settings.maxLoops == null)) && settings.cycler ) {
      nextItemId = cycleOps.init + 1;

      if (nextItemId > $items.length) {              
        nextItemId = 1;
        cycleOps.init = 0;
      }
      
      // hide all items, and then show next item in list
      $items.hide();
      $items.filter("#item" + nextItemId).fadeIn(settings.fadeSpeed);

      // remove highlight of all controls and then add it to the next control in list
      $controls.removeClass("current");
      $controls.filter("#control" + nextItemId).addClass("current");
      
      cycleOps.init++;
      cycleOps.cur++;
    } else {
      clearInterval(setIntervalID);
    }
  
  }

})(jQuery);
