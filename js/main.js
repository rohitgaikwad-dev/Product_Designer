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
  window.addEventListener("mousemove", (details) => {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, details.pageX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, details.pageY - yprev);

    xprev = details.pageX;
    yprev = details.pageY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(() => {
      circle.style.transform = `translateX(${details.pageX}px) translateY(${details.pageY}px) scale(1, 1)`;
    }, 100);
  });
};

let circleMouseFollower = (xscale, yscale) => {
  const circle = document.querySelector("#circle");

  window.addEventListener("mousemove", (details) => {
    circle.style.transform = `translate(${details.pageX}px, ${details.pageY}px) scale(${xscale}, ${yscale})`;
  });
};

homeAnime();
circleScale();
circleMouseFollower();
