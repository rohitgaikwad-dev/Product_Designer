let cursor = new MouseFollower();

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

window.addEventListener('load', () =>{
  console.log('fully ')
})

let homeAnime = () => {
  let tl = gsap.timeline();

  tl.from("#nav", {
    y: -25,
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      duration: 2,
      ease: Expo.easeInOut,
      delay: -1,
      stagger: 0.2,
    })
    .from("#home_footer", {
      y: 10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
};
homeAnime();

const showImage = () => {
  document.querySelectorAll(".elem").forEach((elem) => {
    let rotate = 0;
    let diffrot = 0;
    elem.addEventListener("mousemove", (e) => {
      let diffY = e.pageY - elem.getBoundingClientRect().top;
      diffrot = rotate - e.pageX;
      rotate = e.pageX;

      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diffY,
        left: e.pageX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      });
    });
  });
};
const hideImage = () => {
  document.querySelectorAll(".elem").forEach((elem) => {
    elem.addEventListener("mouseleave", (e) => {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
      });
    });
  });
};
showImage();
hideImage();
