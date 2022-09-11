$(function() {
  $('.wrapper').click(function() {
      $('.wrapper').each(function() {
         $(this).css('z-index', 0); 
      });
      	$(this).css('z-index', 10); 
      	$(this).toggleClass('open');    
  }) 
})