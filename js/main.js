const startPreloader = () => {
  const preloader = document.querySelector("#preloader");
  const barconfirm = document.querySelector("#barconfirm");
  const percent = document.querySelector("#percent");
  const main = document.querySelector("#main");

  let width = 1;

  const frame = () => {
    if (width >= 100) {
      tl.play();
    } else {
      width++;
      barconfirm.style.width = `${width}%`;
      percent.innerHTML = `${width}%`;
      requestAnimationFrame(frame);
    }
  };

  frame();

  const tl = gsap.timeline({
    paused: true,
  });

  tl.to("#percent, #bar", {
      duration: 0.4,
      opacity: 0,
      zIndex: -1,
    }, 'preloader')
    .to("#preloader", {
      duration: 0.8,
      height: "0%",
    }, 'preloader')
    .from("#main", {
      duration: 1.4,
      y: "150%",
      delay: -0.6,
    }, 'preloader')
    .to("#main", {
      opacity: 1,
      y: "0%",
    })
    .from("#nav", {
      y: -25,
      opacity: 0,
      duration: 1.5,
    })
    .to(".boundingelem", {
      y: 0,
      duration: 2,
      stagger: 0.2,
    }, '-=1') // Adjusted delay
    .from("#home_footer", {
      y: 10,
      opacity: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
    }, '-=1'); // Adjusted delay
};

const handleMouseMove = (elem, e) => {
  const { top } = elem.getBoundingClientRect();
  const diffY = e.pageY - top;

  gsap.to(elem.querySelector("img"), {
    opacity: 1,
    ease: Power3,
    top: diffY,
    left: e.pageX,
    rotate: gsap.utils.clamp(-20, 20, rotateDiff(e)),
  });
};

const handleMouseLeave = (elem) => {
  gsap.to(elem.querySelector("img"), {
    opacity: 0,
    ease: Power3,
  });
};

const rotateDiff = (e) => {
  const diffRot = rotate - e.pageX;
  rotate = e.pageX;
  return diffRot * 0.5;
};

let rotate = 0;

const showImage = () => {
  document.querySelectorAll(".elem").forEach((elem) => {
    elem.addEventListener("mousemove", (e) => handleMouseMove(elem, e));
  });
};

const hideImage = () => {
  document.querySelectorAll(".elem").forEach((elem) => {
    elem.addEventListener("mouseleave", () => handleMouseLeave(elem));
  });
};

showImage();
hideImage();
