

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
  
// sec_intro 
gsap.fromTo('.intro_text_area', { // 윈도우 시작 애니메이션
  opacity: 0.001,
  scaleX: 0.8,
  scaleY: 0.8
}, {
  opacity: 1,
  scaleX: 1,
  scaleY: 1,
  delay: 0.45,
  duration: 1.5
});
gsap.fromTo('.canvas', { // 윈도우 시작 애니메이션
  scaleX: 0.8,
  opacity: 0.001,
  scaleY: 0.8
}, {
  opacity: 1,
  scaleX: 1,
  scaleY: 1,
  delay: 0.2,
  duration: 1.1
});

gsap.to('.canvas', { // 캔버스 크기 키워주기
  scrollTrigger: {
    trigger: '#main',
    start: 'top top',
    end: 'bottom top',
    pin: true,
    scrub: 1,
  },
  scale: 1.5,
  duration: 0.7
});

gsap.to('.intro_text_area p', { // 텍스트 사라지도록
  scrollTrigger: {
    trigger: '#main',
    start: 'top top',
    end: 'bottom top',
    pin: true,
    scrub: 1,
  },
  opacity: 0,
  delay: 0.3,
  duration: 0.7
});

gsap.to('.intro_text_area .link_group', { // 텍스트 사라지도록
  scrollTrigger: {
    trigger: '#main',
    start: 'top top',
    end: 'bottom top',
    pin: true,
    scrub: 1,
  },
  opacity: 0,
  delay: 0.3,
  duration: 0.7
});

gsap.to('.intro_text_area h3', { // 텍스트 사라지도록
  scrollTrigger: {
    trigger: '#main',
    start: 'top top',
    end: 'bottom top',
    pin: true,
    scrub: 1,
  },
  opacity: 0,
  scale: 1.3,
  delay: 0.8,
  duration: 0.7
});

gsap.fromTo('.vid_start_text_area', {}, { // intro 마지막 텍스트 나타났다 사라지도록
  scrollTrigger: {
    trigger: '.vid_start_text_area p',
    start: 'top 5%',
    end: 'bottom -10%',
    markers: true,
    pin: true,
    scrub: 1,
    toggleClass: {
      targets: '.vid_start_text_area',
      className: 'show'
    }
  },
  delay: 1,
  duration: 0.7
})

const wW = document.body.offsetWidth;
const canvas = document.querySelector('#canvas');
const canvasWidth = document.querySelector('#canvas').offsetWidth;
const ctx = canvas.getContext('2d');

canvas.width = 1440;
canvas.height = 810;

const frameCount = 64; // 이미지 갯수만큼

const currentFrame = (idx) => {
  return `https://www.apple.com/105/media/us/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/hero/large/${idx.toString().padStart(4, '0')}.png`; // 이미지 링크 불러오기
}; // 리턴 필수

const images = [];
const card = {
  frame: 0,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}
  
gsap.to(card, {
  frame: frameCount - 1,
  snap: 'frame',
  ease: 'none',
  scrollTrigger: {
    trigger: '#main',
    scrub: 1,
    start: 'top top',
    end: 'bottom top',
    pin: true,
    // markers: true
  },
  onUpdate: render,
  // duration: 4,
});
  
images[0].onload = render;

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(images[card.frame], 0, 0);
}