/*!  Plugin: ssMenu (Sticky Side Navigation)
 *   Author: Asif Mughal
 *   URL: www.codehim.com
 *   License: MIT License
 *   Copyright (c) 2019 - Codehim
 */
/* File: jquery.ss.emenu.js */
(function ($) {
  $.fn.ssMenu = function (options) {
    var setting = $.extend(
      {
        theme: "default", //put the name of theme in string
        hideOnScroll: false, //true to hide menu while scroll down
        additionalCSS: {
          background: "", //custom background color
          color: "", //custom text color
          boxShadow: "", //to add box shadow
          textShadow: "", //to add text shadow
        },
      },
      options
    );

    return this.each(function () {
      var target = $(this);

      var ssMenu = $(".ss-menu");

      var Triggers = $(ssMenu).find("li");

      //Applying customizations

      $(target).addClass(setting.theme);

      $(target).css(setting.additionalCSS);

      $(Triggers).mouseenter(function () {
        //to avoid the adding classes again and again
        if ($(ssMenu).hasClass("open")) {
          return;
        }
        $(ssMenu).addClass("open");
      });

      $(Window).click(function (e) {
        if ($(e.target).closest(Triggers).length) {
          return;
        }

        $(ssMenu).removeClass("open");
      });

      if (setting.hideOnScroll == true) {
        $(window).scroll(function () {
          if ($(this).scrollTop() > 50) {
            $(ssMenu).removeClass("show").addClass("hide");
          } else {
            $(ssMenu).removeClass("hide").addClass("show");
          }
        });
      }
    });
  };
})(jQuery);
/*   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */
