(function($){
     $(".menu-isshow>li").on('click', function(e){
     	e.stopPropagation();
     	$(this).addClass('active').siblings('').removeClass('active').find('li.active').removeClass('active');
     	$(this).children('.menu-isshow').show().end().siblings('').find('.menu-isshow').hide();

      var thisTop = $(this).offset().top;
      var thisParentTop = $(this).parent().offset().top;
      var parentHeight = $(this).parent().height();
      var childrenHeight = $(this).children('ul').height();
      var windowHeight = $(window).height();
      // console.log('thisTop=' + thisTop);
      // console.log('thisParentTop=' + thisParentTop);
      // console.log('parentHeight=' +　parentHeight);
      // console.log('childrenHeight=' + childrenHeight);
      // console.log('windowHeight=' + windowHeight);
      if(thisTop - thisParentTop + childrenHeight < parentHeight){
        $(this).children('ul').css({
          'top': 0
        })
      }else if(thisTop - thisParentTop + childrenHeight > parentHeight && childrenHeight < parentHeight){
        $(this).children('ul').css({
          'top': -(thisTop - thisParentTop + childrenHeight - parentHeight) + 'px'
        })
      }else if(childrenHeight >= parentHeight){
        $(this).children('ul').css({
          'top': - thisTop + 'px'
        })
      }
     })
     
     // .on('mouseleave', function(){
     // 	$(this).removeClass('active').children('.menu-isshow').hide().end().find('li.active').removeClass('active');

     // })
      $(document).on('click', function(){
      	$(".menu-sec, .menu-thir").hide().end().find('li.active').removeClass('active');
      })

      $(window).resize(function(event) {
        $(".menu-sec, .menu-thir").hide().end().find('li.active').removeClass('active');
      });
})(jQuery);   