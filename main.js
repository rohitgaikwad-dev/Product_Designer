const cursor = document.querySelector(".circle");
const body = document.createElement("body");

window.addEventListener("mousemove", (e) => {
  let x = e.pageX;
  let y = e.pageY;
  cursor.style.transform = `translate(${x}px, ${y}px)`;
});

window.addEventListener("mouseout", (e) => {
  if (e.pageY <= 0) {
    cursor.style.opacity = 0;
  } else {
    cursor.style.opacity = 1;
  }
});
