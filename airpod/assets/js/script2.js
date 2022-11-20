$(function () {
    // a태그 기본동작 방지
    // $(document).on('click', 'a[href="#"]', function (e) {
    //   e.preventDefault();
    // });
  
    $(window).scroll(function () {
      const currentScroll = $(this).scrollTop();
  
      const stickyNav = $('.sticky-nav').offset().top;
      const scDesign = $('.sc-design').offset().top;
  
      if (currentScroll >= stickyNav) {
        $('.sticky-nav').addClass('scrolled');
      } else {
        $('.sticky-nav').removeClass('scrolled');
      }
  
      if (currentScroll >= scDesign - $(window).height()) {
        $('.sc-video .video-area').addClass('sticky');
      } else {
        $('.sc-video .video-area').removeClass('sticky');
      }
    })
  
    // intro
    gsap.fromTo('.sc-intro .thumb-box img', {
      opacity: 0.001,
      scaleX: 1.5,
      scaleY: 1.5
    }, {
      scrollTrigger: {
        trigger: '.sc-intro',
        start: '0% 0%',
        end: '100% 50%',
      },
      opacity: 0.999,
      scaleX: 1,
      scaleY: 1,
      duration: 1.2
    });
    gsap.fromTo('.sc-intro .title-box', {
      opacity: 0.001,
    }, {
      scrollTrigger: {
        trigger: '.sc-intro',
        start: '0% 0%',
        end: '100% 50%',
      },
      opacity: 0.999,
      delay: 0.8,
      duration: 1.2
    });
  
    gsap.fromTo('.sc-intro .thumb-box', {
      scaleX: 1,
      scaleY: 1
    }, {
      scrollTrigger: {
        trigger: '.sc-intro',
        start: '0% -10%',
        end: '100% -5%',
        scrub: 1,
      },
      scaleX: 1.2,
      scaleY: 1.2,
      // delay: 1,
      // duration: 1.2
    });
    gsap.fromTo('.sc-intro .title-box', {
      scaleX: 1,
      scaleY: 1
    }, {
      scrollTrigger: {
        trigger: '.sc-intro',
        start: '0% -10%',
        end: '100% -5%',
        scrub: 1,
      },
      scaleX: 0.8,
      scaleY: 0.8,
      // delay: 1,
      // duration: 1.2
    });
  
    // 전체영역 페이드 주면서 나오게 함
    const DimFade = gsap.fromTo('.sc-video .video-dim', {
      opacity: 0.999
    }, {
      opacity: 0.001
    });
  
    const infoListFade = gsap.fromTo('.sc-video .info-list', {
      opacity: 0.001
    }, {
      opacity: 0.999
    });
  
    // 트리거 분할
    ScrollTrigger.create({
      trigger: '.sc-video .video-dim',
      start: 'top 125%',
      end: '100% 50%',
      // markers: true,
      scrub: 1,
      animation: DimFade
    })
  
    ScrollTrigger.create({
      trigger: '.sc-video .info-list',
      start: 'top center',
      end: '10% 20%',
      // markers: true,
      scrub: 1,
      animation: infoListFade
    })
  
    $('.sc-video .info-item').each(function (index, el) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 65%',
        end: 'bottom 50%',
        // markers: true,
        // scrub: 1,
        toggleClass: {
          targets: el,
          className: 'show'
        }
      })
    });
  
  
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
  
    canvas.width = 1004;
    canvas.height = 1214;
  
    const frameCount = 45;
  
    const currentFrame = (idx) => {
      // return `asset/images/capture/capture${idx.toString()}.jpg`;
  
      return `https://www.apple.com/105/media/us/airpods-max/2020/996b980b-3131-44f1-af6c-fe72f9b3bfb5/anim/turn/large/large_${idx.toString().padStart(4, '0')}.jpg`;
    }; // 리턴 필수
  
    const images = [];
    const card = {
      frame: 0,
    };
  
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i + 1);
      images.push(img);
    }
  
    gsap.to(card, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: '.canvas-area',
        scrub: 1,
        start: 'top top',
        end: 'bottom center',
        // pin: true,
        // markers: true
      },
      onUpdate: render,
      // duration: 4,
    });
    // gsap.to('.sc-design .thumb.cushion', {
    //   scrollTrigger: {
    //     trigger: '.canvas-area',
    //     scrub: 0.5,
    //     start: 'top top',
    //     end: 'bottom center',
    //     // pin: true,
    //     // markers: true
    //   },
    //   opacity: 1,
    //   scale:1.1,
    //   y:-100,
    //   delay:2,
    //   duration:1
    // })
    //텍스트 효과넣기 
    // 텍스트
    // scale 이미지(사이즈맞추기 애플보고다시확인)
  
    images[0].onload = render;
  
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(images[card.frame], 0, 0);
    }
  
    // 헤드셋 움직이게
    // .sc-design .thumb-area-wrap
    // .sc-design .thumb-box.frame
    // .sc-design .thumb-box.cushion
  
    // gsap.to('.sc-design .canvas-area', {
    //   scrollTrigger: {
    //     trigger: '.sc-design .design-inner1',
    //     start: 'top 100px',
    //     end: 'bottom -10%',
    //     // markers: true,
    //     scrub: 1,
    //   },
    //   scale: 1.1,
    //   delay: 2.5
    // })
    // gsap.to('.sc-design .canvas-area', {
    //   scrollTrigger: {
    //     trigger: '.sc-design .design-inner1',
    //     start: 'top 100px',
    //     end: 'bottom -10%',
    //     // markers: true,
    //     scrub: 1,
    //   },
    //   scale: 1.1,
    //   delay: 3
    // })
  
    // const headsetMotion = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: '.sc-design .design-inner1',
    //     start: 'top -30%',
    //     end: 'bottom -10%',
    //     // markers: true,
    //     scrub: 1,
    //   },
    // })
    // headsetMotion.addLabel('motion1')
    //   .to('.sc-design .thumb.frame', {
    //     yPercent: -3, opacity: 1, delay: 3
    //   }, 'motion1+=0.4')
    //   // .to('.sc-design .thumb.cushion', {
    //   //   yPercent: 3, opacity: 1, delay: 3
    //   // }, 'motion1+=0.4')
    //   .to('.sc-design .thumb.cushion', {
    //     opacity: 1, delay: 2
    //   }, 'motion1+=0.4')
    //   .set('.sc-design canvas', {
    //     opacity: 0, delay: 2
    //   }, 'motion1+=0.4')
    //   .to('.sc-design .canvas-area, .sc-design .group-design', {
    //     scale: 1.1, delay: 3, duration: 1
    //   }, 'motion1+=0.6')
  
    $('.sc-design .info-box[data-target]').each(function (index, el) {
      gsap.fromTo(el, {
        opacity: 0.001,
        y: 40,
      }, {
        scrollTrigger: {
          trigger: '.sc-design .canvas-area',
          start: 'top top',
          end: 'bottom center',
          // markers: true,
          scrub: 1,
          // toggleClass: {
          //   targets: el,
          //   className: 'show'
          // }
        },
        opacity: 0.999,
        y: 0,
        delay: index * 0.2,
        duration: .6
      })
    });
    // ScrollTrigger.create({
    //   trigger: el,
    //   start: 'top 60%',
    //   end: 'bottom -300%',
    //   // markers: true,
    //   // scrub: 1,
    //   toggleClass: {
    //     targets: el,
    //     className: 'show'
    //   }
    // })
  
    // video play
    const video = $('.sc-video video').get(0);
    const crownVideo = $('.sc-design .crown-video').get(0);
  
    $('.sc-video .video-control').click(function (e) {
      e.preventDefault();
      $(this).toggleClass('pause');
      if ($(this).hasClass('pause')) {
        video.play();
      } else {
        video.pause();
      }
    });
    $('.sc-design .group-crown .video-control').click(function (e) {
      e.preventDefault();
      $(this).toggleClass('pause');
      if ($(this).hasClass('pause')) {
        crownVideo.play();
      } else {
        crownVideo.pause();
      }
    });
  
    // color tab 
    $('.sc-service .btn-color-wrap .btn-color').click(function (e) {
      e.preventDefault();
      $('.sc-service .btn-color-wrap .btn-color').removeClass('active');
      $(this).addClass('active');
    });
  
    // swiper
    const colorSlide1 = new Swiper('.sc-design .gallery-swiper1', {
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      speed: 1500,
      loop: true,
      pagination: {
        el: '.sc-design .btn-color-wrap',
        clickable: true,
        renderBullet: function (index, className) {
          return `<a class="btn-color ${className}"</a>`;
        }
      },
    });
  
    const colorSlide2 = new Swiper('.sc-design .gallery-swiper2', {
      effect: 'fade',
      touchRatio: 0,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      speed: 1500,
      loop: true,
      pagination: {
        el: '.sc-design .btn-color-wrap',
        clickable: true,
        renderBullet: function (index, className) {
          return `<a class="btn-color ${className}"</a>`;
        }
      },
    });
  
    colorSlide1.on('slideChange', function () {
      idx = colorSlide1.realIndex;
  
      colorSlide2.slideToLoop(idx);
    });
  
    const colorBullet = ['실버', '스페이스 그레이', '스카이 블루', '핑크', '그린'];
    const colorSlide3 = new Swiper('.sc-service .gallery-swiper', {
      effect: 'fade',
      speed: 600,
      loop: true,
      pagination: {
        el: '.sc-service .btn-color-wrap',
        clickable: true,
        renderBullet: function (index, className) {
          return `<a class="btn-color ${className}"><span class="title">${colorBullet[index]}</span></a>`;
        }
      },
    });
  
    // design
    $('.sc-design .slide-control').click(function (e) {
      e.preventDefault();
      if ($(this).hasClass('pause')) {
        colorSlide1.autoplay.stop();
        colorSlide2.autoplay.stop();
        $(this).removeClass('pause');
      } else {
        colorSlide1.autoplay.start();
        colorSlide2.autoplay.start();
        $(this).addClass('pause');
      }
    });
  
    gsap.to('.sc-design .thumb-comfort img', {
      scrollTrigger: {
        trigger: '.sc-design .group-quality',
        start: '-30% top',
        end: '+=100%',
        scrub: 3,
      },
      scaleX: 1,
      scaleY: 1,
      yPercent: -10,
      // duration: .6
    });
  
    // audio
    gsap.fromTo('.sc-audio .thumb-quality img', {
      y: -150
    }, {
      scrollTrigger: {
        trigger: '.sc-audio .group-sound',
        start: 'bottom 0%',
        end: 'bottom -350%',
        scrub: 3,
      },
      scaleX: 1,
      scaleY: 1,
      y: 0,
    });
  
    gsap.to('.sc-audio .group-audio', {
      scrollTrigger: {
        trigger: '.sc-audio .group-audio',
        endTrigger: '.sc-audio .group-sound',
        start: '70% 50%',
        end: 'bottom 100%',
        scrub: 3,
        pin: true,
        // markers:true,
      }
    });
  
    const extl1 = gsap.timeline({
      defaults: {
        // duration: .7
      },
      scrollTrigger: {
        trigger: '.sc-audio .group-audio',
        endTrigger: '.sc-audio .group-quality',
        start: 'top top',
        // end: 'bottom top',
        // markers:true,
        scrub: 3,
      }
    })
    extl1.addLabel('label')
      .to('.sc-audio .cushion-transparent', {
        opacity: 1
      }, 'label+=1')
      .to('.sc-audio .chip', {
        opacity: 1
      }, 'label+=2')
      .to('.sc-audio .driver', {
        opacity: 1
      }, 'label+=3')
    // extl1.fromTo('.sc-audio .group-audio .thumb-box', {opacity: 0}, {opacity: 1, stagger: 4},'label')
  
  
    const extl2 = gsap.timeline({
      defaults: {
        // duration: .7
      },
      scrollTrigger: {
        trigger: '.sc-audio .group-audio',
        endTrigger: '.sc-audio .group-quality',
        start: 'top top',
        // end: 'bottom top',
        // markers:true,
        scrub: 3,
      }
    })
    extl2.addLabel('label')
      .fromTo('.sc-audio .group-audio .info-box.txt1', {
        y: 70
      }, {
        opacity: 1,
        y: 0,
        ease: Linear.easeNone
      }, 'label')
      .to('.sc-audio .group-audio .info-box.txt1', {
        opacity: 0,
        y: -70,
        ease: Linear.easeNone,
        delay: 1
      }, 'label')
      .fromTo('.sc-audio .group-audio .info-box.txt2', {
        y: 70
      }, {
        opacity: 1,
        y: 0,
        delay: 1.5,
        ease: Linear.easeNone,
      }, 'label+=.5')
      .to('.sc-audio .group-audio .info-box.txt2', {
        opacity: 0,
        y: -70,
        delay: 2,
        ease: Linear.easeNone,
      }, 'label+=.5')
      .fromTo('.sc-audio .group-audio .info-box.txt3', {
        y: 70
      }, {
        opacity: 1,
        y: 0,
        delay: 2.5,
        ease: Linear.easeNone,
      }, 'label+=1')
      .to('.sc-audio .group-audio .info-box.txt3', {
        opacity: 0,
        y: -70,
        delay: 3,
        ease: Linear.easeNone,
      }, 'label+=1')
  
    gsap.fromTo('.sc-audio .sound-view', {}, {
      scrollTrigger: {
        trigger: '.sc-audio .group-sound',
        start: 'top top',
        end: 'bottom top',
        // markers: true,
        toggleClass: {
          targets: '.sc-audio .sound-view',
          className: 'show'
        }
      },
    })
  
    gsap.fromTo('.sc-audio .group-sound .rings.back', {
      y: -50,
    }, {
      scrollTrigger: {
        trigger: '.sc-audio .group-sound',
        start: 'top top',
        end: 'bottom top',
        scrub: 3,
        // markers: true,
        // toggleClass: {
        //   targets: '.sc-audio .group-sound .rings.back',
        //   className: 'fadeout'
        // }
      },
      y: -10,
    });
  
    gsap.fromTo('.sc-audio .group-sound .rings.front', {
      y: -30,
    }, {
      scrollTrigger: {
        trigger: '.sc-audio .group-sound',
        start: 'top top',
        end: 'bottom top',
        scrub: 3,
        // markers: true,
        // toggleClass: {
        //   targets: '.sc-audio .group-sound .rings.front',
        //   className: 'fadeout'
        // }
      },
      y: 30,
    })
  
    gsap.to('.sc-audio .group-sound .rings', {
      scrollTrigger: {
        trigger: '.sc-audio .group-sound',
        start: 'top top',
        end: 'bottom 40%',
        scrub: 3,
      },
      opacity: .2,
      duration: .3
    })
  
    gsap.fromTo('.sc-audio .group-sound .info-area', {
      y: -30,
    }, {
      scrollTrigger: {
        trigger: '.sc-audio .group-sound',
        start: 'top top',
        end: 'bottom top',
        scrub: 3,
        // markers: true,
      },
      y: 30,
    });
  
    // experience
    const exTl = gsap.timeline({
      defaults: {
        duration: .3
      },
      scrollTrigger: {
        trigger: '.sc-experience .group-case',
        start: 'bottom 40%',
        end: '+=50%',
        // markers:true,
        scrub: 1,
      },
    })
    exTl.fromTo('.sc-experience .function-item', {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      stagger: .2
    })
  
    gsap.to('.sc-experience .group-experience .experience-view', {
      scrollTrigger: {
        trigger: '.sc-experience .group-experience',
        endTrigger: '.sc-experience .group-case',
        start: '0% 0%',
        end: 'bottom 100%',
        scrub: 4,
        pin: true,
        // markers:true,
      }
    });
  
    const op2 = gsap.timeline({
      defaults: {
        duration: 1
      },
      scrollTrigger: {
        trigger: '.sc-experience .group-experience',
        endTrigger: '.sc-experience .group-function',
        start: 'top top',
        // end: 'bottom top',
        // markers:true,
        scrub: 3,
      }
    })
    op2.addLabel('label')
      .to('.sc-experience .group-experience .screen2', {
        opacity: 1,
        delay: .5
      }, 'label+=1')
      .to('.sc-experience .group-experience .screen3', {
        opacity: 1
      }, 'label+=2')
      .to('.sc-experience .group-experience .screen4', {
        opacity: 1
      }, 'label+=3')
    // op2.fromTo('.sc-experience .group-experience .screen', {
    //   opacity: 0
    // }, {
    //   opacity: 1,
    //   stagger: 4
    // }, 'label')
  
    const op3 = gsap.timeline({
      defaults: {
        duration: 1
      },
      scrollTrigger: {
        trigger: '.sc-experience .group-experience',
        endTrigger: '.sc-experience .group-function',
        start: 'top top',
        // end: 'bottom top',
        // markers:true,
        scrub: 3,
      }
    })
    op3.addLabel('label')
      .fromTo('.sc-experience .group-experience .info-box.txt1', {
        y: 70
      }, {
        opacity: 1,
        y: 0,
        ease: Linear.easeNone
      }, 'label')
      .to('.sc-experience .group-experience .info-box.txt1', {
        opacity: 0,
        y: -70,
        ease: Linear.easeNone,
        delay: 1
      }, 'label')
      .fromTo('.sc-experience .group-experience .info-box.txt2', {
        y: 70
      }, {
        opacity: 1,
        y: 0,
        delay: 1.5,
        ease: Linear.easeNone,
      }, 'label+=.5')
      .to('.sc-experience .group-experience .info-box.txt2', {
        opacity: 0,
        y: -70,
        delay: 2,
        ease: Linear.easeNone,
      }, 'label+=.5')
      .fromTo('.sc-experience .group-experience .info-box.txt3', {
        y: 70
      }, {
        opacity: 1,
        y: 0,
        delay: 2.5,
        ease: Linear.easeNone,
      }, 'label+=1')
      .to('.sc-experience .group-experience .info-box.txt3', {
        opacity: 0,
        y: -70,
        delay: 3,
        ease: Linear.easeNone,
      }, 'label+=1')
  });
  