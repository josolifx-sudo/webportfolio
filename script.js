// ================================
// Portfolio Enhancements (Lightweight)
// - Active nav on scroll
// - Smooth scroll with offset
// - Reveal on scroll
// - Scroll to top button
// ================================

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".appNavLink");
  const sections = ["landing", "projects", "tools", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  // 1) Smooth scroll with offset (fixed navbar)
  const getNavOffset = () => {
    const nav = document.querySelector(".appNavbar");
    return nav ? nav.offsetHeight + 10 : 80;
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href") || "";
      if (!href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const top =
        target.getBoundingClientRect().top + window.pageYOffset - getNavOffset();

      window.scrollTo({ top, behavior: "smooth" });

      // collapse mobile navbar after click (Bootstrap 5)
      const navCollapse = document.querySelector(".navbar-collapse");
      if (navCollapse && navCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

  // 2) Active nav highlight on scroll
  const setActiveLink = () => {
    const scrollPos = window.scrollY + getNavOffset() + 40;

    let currentId = "landing";
    sections.forEach((sec) => {
      if (sec.offsetTop <= scrollPos) currentId = sec.id;
    });

    navLinks.forEach((a) => {
      const href = a.getAttribute("href");
      a.classList.toggle("is-active", href === `#${currentId}`);
    });
  };

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  // 3) Reveal on scroll using IntersectionObserver
  const revealTargets = document.querySelectorAll(
    "#projects .projectCard, #tools .toolsGroup, #contact .appCard"
  );

  revealTargets.forEach((el) => el.classList.add("reveal"));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--show");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((el) => io.observe(el));

  // 4) Scroll to top button
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "toTopBtn";
  btn.setAttribute("aria-label", "Scroll to top");
  btn.textContent = "↑";
  document.body.appendChild(btn);

  const toggleBtn = () => {
    if (window.scrollY > 500) btn.classList.add("toTopBtn--show");
    else btn.classList.remove("toTopBtn--show");
  };

  window.addEventListener("scroll", toggleBtn, { passive: true });
  toggleBtn();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
