const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    header.classList.add("header--compact");
  } else {
    header.classList.remove("header--compact");
  }
});
