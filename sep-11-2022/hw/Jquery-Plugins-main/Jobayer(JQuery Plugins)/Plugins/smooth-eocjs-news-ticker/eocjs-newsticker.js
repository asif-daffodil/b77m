/*!
 * eocjsNewsticker v0.6.2
 * Copyright (c) 2022 Dieter Schmitt
 * Released under the MIT license - https://opensource.org/licenses/MIT
 */

(function($, window, document, undefined) {
  $.fn.eocjsNewsticker = function(options) {

    // _______ Options _______

    let defaults = {
      speed:      20,
      timeout:    1,
      divider:    '+++',
      type:       'static',    // static or ajax
      source:     '',          // ajax source (url)
      dataType:   'json',      // data type of the expected file (json or jsonp)
      callback:   'callback',  // used for jsonp
      fetch:      false,       // use fetch instead of $.ajax()
      interval:   120,         // polling interval of the ajax source (seconds)
      direction:  'ltr'        // direction (ltr or rtl)
    };
    let settings = $.extend({}, defaults, options);


    // _______ Inner Variables _______

    let self              =  this;
    let content           =  self.html();
    let active            =  'eocjs-newsticker-active';
    let container         =  {};
    let one               =  {};
    let two               =  {};
    let both              =  {};
    let oneNeedsUpdate    =  false;
    let twoNeedsUpdate    =  false;
    let localWindow       =  $(window);
    let localWindowWidth  =  localWindow.width();


    // _______ Init _______

    function init() {
      if (!self.hasClass(active)) {
        create();
        start();
        self.addClass(active);
      }
    }


    // _______ Create _______

    function create() {

      self.addClass('eocjs-newsticker').html('<div class="eocjs-newsticker-container"><div class="eocjs-newsticker-one"></div><div class="eocjs-newsticker-two"></div></div>');

      container  =  self.find('.eocjs-newsticker-container');
      one        =  self.find('.eocjs-newsticker-one');
      two        =  self.find('.eocjs-newsticker-two');
      both       =  self.find('.eocjs-newsticker-one, .eocjs-newsticker-two');

      both.css({[convert('start')]: 0, [convert('end')]: 'auto'});

    }


    // _______ Start _______

    function start() {

      if (settings.type === 'static') {

        content = convert('prefix') + content + convert('suffix');
        run(content, (settings.timeout * 1000));

      } else if (settings.type === 'ajax') {

        container.prepend('<div class="eocjs-newsticker-loader"></div>');
        $.when(ajax(settings.source, settings.dataType, settings.callback, settings.fetch)).done(function(data) {

          setContent(data);
          container.find('.eocjs-newsticker-loader').fadeOut(300, function() {
            run(content, (settings.timeout * 1000));
            $(this).remove();
          });

          setInterval(function() {
            $.when(ajax(settings.source, settings.dataType, settings.callback, settings.fetch)).done(function(data) {
              setContent(data);
              oneNeedsUpdate = true;
              twoNeedsUpdate = true;
            });
          }, settings.interval * 1000);

        });

      }

    }


    // _______ Additional function for LTR/RTL conversion _______

    function convert(type, data) {

      let addition  =  '';
      let dir       =  settings.direction;

      if (type === 'prefix') {
        data === undefined ? (dir !== 'rtl' ? addition = '' : addition = settings.divider + ' ') : (dir !== 'rtl' ? addition = data + ' ' : addition = settings.divider + ' ');
      } else if (type === 'suffix') {
        data === undefined ? (dir !== 'rtl' ? addition = ' ' + settings.divider : addition = '') : (dir !== 'rtl' ? addition = ' ' + settings.divider : addition = ' ' + data);
      } else if (type === 'start') {
        dir !== 'rtl' ? addition = 'left' : addition = 'right';
      } else if (type === 'end') {
        dir !== 'rtl' ? addition = 'right' : addition = 'left';
      } else if (type === 'update') {
        data === undefined ? (dir !== 'rtl' ? addition = 'append' : addition = 'prepend') : (dir !== 'rtl' ? addition = ' ' + data : addition = data + ' ');
      } else if (type === 'position') {
        addition = (dir !== 'rtl' && data.position().left > 0) || (dir === 'rtl' && (container.width() - (data.position().left + data.width())) > 0);
      }

      return addition;

    }


    // _______ Ajax _______

    function ajax(source, dataType, callback, useFetch) {

      if (dataType === 'json' && useFetch) {

        return fetch(source).then(function(response) {
          return response.json();
        });

      } else {

        return $.ajax({
          url:            source,
          dataType:       dataType,
          jsonpCallback:  callback
        });

      }

    }


    // _______ setContent _______

    function setContent(data) {

      content = '';
      if ($.isPlainObject(data) && !$.isEmptyObject(data)) {
        for (let property in data) {
          if (data.hasOwnProperty(property)) {
            if (content === '') {
              content = convert('prefix') + data[property] + convert('suffix');
            } else {
              content = convert('prefix', content) + data[property] +  convert('suffix', content);
            }
          }
        }
      } else if (Array.isArray(data) && data.length > 0) {
        for (let i = 0; i < data.length; i += 1) {
          if (content === '') {
            content = convert('prefix') + data[i] + convert('suffix');
          } else {
            content = convert('prefix', content) + data[i] +  convert('suffix', content);
          }
        }
      } else {
        content = 'Error: No data found. Check your remote source!';
      }

    }


    // _______ Run _______

    function runInit(content) {
    
      update(both, content);
      two.css({[convert('start')]: one.width()});
      
    }

    function run(content, timeout) {

      runInit(content);

      setTimeout(function() {

        if (timeout > 0) runInit(content);

        let width  =  one.width();
        let speed  =  settings.speed * width;

        animateSlide(one, 0, -width, speed);
        animateSlide(two, width, 0, speed);

      }, timeout);

    }


    // _______ Update _______

    function update(slide, content) {

      slide.html(content);
      while (container.width() > slide.width()) {
        slide[convert('update')](convert('update', content));
      }
      slide[convert('update')]('&nbsp;');

    }


    // _______ Animation _______

    function animateSlide(slide, start, destination, speed) {

      slide.animate(
        {[convert('start')]: destination},
        speed,
        'linear',
        function() {

          let width;

          if (start === 0) {

            if (slide === one && oneNeedsUpdate) {
              update(one, content);
              oneNeedsUpdate = false;
            } else if (slide === two && twoNeedsUpdate) {
              update(two, content);
              twoNeedsUpdate = false;
            }

            slide === one ? width = two.width() : width = one.width();
            speed = settings.speed * width;
            slide.css({[convert('start')]: width});
            animateSlide(slide, width, 0, speed);

          } else {

            slide === one ? width = one.width() : width = two.width();
            speed = settings.speed * width;
            animateSlide(slide, 0, -width, speed);

          }

        }
      );

    }


    // _______ Resize _______

    localWindow.on('resize', function() {

      let width = localWindow.width();

      if (width != localWindowWidth) {

        if (width > localWindowWidth) {
          if (convert('position', one)) {
            update(one, content);
            twoNeedsUpdate = true;
          } else if (convert('position', two)) {
            update(two, content);
            oneNeedsUpdate = true;
          }
        } else {
          oneNeedsUpdate = true;
          twoNeedsUpdate = true;
        }

        localWindowWidth = width;

      }

    });


    // _______ Init _______

    init();

    return this;

  };
})(jQuery, window, document);
