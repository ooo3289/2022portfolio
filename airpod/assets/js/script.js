
  
    $(window).scroll(function () {
        const currentScroll = $(this).scrollTop();
    
        const stickyNav = $('.sticky_nav').offset().top;
        // const scDesign = $('.sc-design').offset().top;
    
        if (currentScroll >= stickyNav) {
          $('.sticky_nav').addClass('scrolled');
        } else {
          $('.sticky_nav').removeClass('scrolled');
        }
    
        // if (currentScroll >= scDesign - $(window).height()) {
        //   $('.sc-video .video-area').addClass('sticky');
        // } else {
        //   $('.sc-video .video-area').removeClass('sticky');
        // }
      })