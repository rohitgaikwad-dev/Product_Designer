let timeout;

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

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

let circleScale = () => {
  const circle = document.querySelector("#circle");

  let xscale = 1;
  let yscale = 1;

  let xprev = 0;
  let yprev = 0;
  window.addEventListener("mousemove", (e) => {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, e.pageX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, e.pageY - yprev);

    xprev = e.pageX;
    yprev = e.pageY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(() => {
      circle.style.transform = `translateX(${e.pageX}px) translateY(${e.pageY}px) scale(1, 1)`;
    }, 100);
  });
};

let circleMouseFollower = (xscale, yscale) => {
  const circle = document.querySelector("#circle");

  window.addEventListener("mousemove", (e) => {
    circle.style.transform = `translate(${e.pageX}px, ${e.pageY}px) scale(${xscale}, ${yscale})`;
  });
};
homeAnime();
circleScale();
circleMouseFollower();

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

