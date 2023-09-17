let cursor = new MouseFollower();

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

const startPreloader = () => {
  const preloader = document.querySelector("#preloader");
  const barconfirm = document.querySelector("#barconfirm");
  const percent = document.querySelector("#percent");
  const main = document.querySelector("#main");

  let width = 1;
  let id;

  const frame = () => {
    if (width >= 100) {
      clearInterval(id);
      tl.play();
    } else {
      width++;
      barconfirm.style.width = width + "%";
      percent.innerHTML = width + "%";
    }
  };

  id = setInterval(frame, 10);

  // Timeline for preloader animation
  const tl = gsap.timeline({
    paused: true,
  });

  tl.to("#percent, #bar", {
    duration: 0.4,
    opacity: 0,
    zIndex: -1,
  })
    .to("#preloader", {
      duration: 0.8,
      height: "0%",
    },'a')
    .from("#main", {
      duration: 1.4,
      y: "150%",
      delay: -0.6,
    },'a')
    .to("#main", {
      opacity: 1,
      y: "0%",
    }).from("#nav", {
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
window.addEventListener("load", startPreloader());

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
