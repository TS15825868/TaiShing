
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuOverlay = document.getElementById("menuOverlay");
function openMenu() {
  if (!mobileMenu || !menuOverlay || !menuBtn) return;
  mobileMenu.classList.add("open");
  menuOverlay.classList.add("show");
  menuBtn.setAttribute("aria-expanded", "true");
}
function closeMenu() {
  if (!mobileMenu || !menuOverlay || !menuBtn) return;
  mobileMenu.classList.remove("open");
  menuOverlay.classList.remove("show");
  menuBtn.setAttribute("aria-expanded", "false");
}
if (menuBtn && mobileMenu && menuOverlay) {
  menuBtn.addEventListener("click", () => {
    if (mobileMenu.classList.contains("open")) closeMenu();
    else openMenu();
  });
  menuOverlay.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  window.addEventListener("scroll", () => { if (mobileMenu.classList.contains("open")) closeMenu(); }, { passive: true });
  mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
}
document.querySelectorAll(".faq-item").forEach((item) => {
  const q = item.querySelector(".faq-question");
  if (q) q.addEventListener("click", () => item.classList.toggle("open"));
});
