const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

let circleMouseFollower = () => {
  const cricle = document.querySelector("#circle");

  window.addEventListener("mousemove", (details) => {
    let x = details.pageX;
    let y = details.pageY;

    cricle.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });

  window.addEventListener("mouseout", (details) => {
    if (details.pageY <= 0 || details.pageX >= innerWidth) {
      cricle.style.opacity = "0";
    } else {
      cricle.style.opacity = "1";
    }
  });
};

circleMouseFollower();
