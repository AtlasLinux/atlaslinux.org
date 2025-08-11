document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      const open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-open", open);
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      });
    });
    document.addEventListener("click", (e) => {
      if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      }
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const r = document.documentElement;
  const t = document.getElementById("themeToggle");
  const pref =
    localStorage.getItem("atlas-theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  function setTheme(x) {
    r.setAttribute("data-theme", x);
    localStorage.setItem("atlas-theme", x);
    if (t) t.setAttribute("aria-checked", x === "dark" ? "true" : "false");
  }

  setTheme(pref);

  if (t) {
    t.addEventListener("click", () =>
      setTheme(r.getAttribute("data-theme") === "light" ? "dark" : "light")
    );
  }

  document.querySelectorAll('a[href^="#"]').forEach((a) =>
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - 72,
          behavior: "smooth",
        });
      }
    })
  );

  const io = new IntersectionObserver(
    (es) =>
      es.forEach((en) => {
        if (en.isIntersecting) {
          en.target.style.opacity = "1";
          en.target.style.transform = "translateY(0)";
          io.unobserve(en.target);
        }
      }),
    { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
  );

  document.querySelectorAll(".card, .dl-card, .section-title").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "transform 220ms ease, opacity 220ms ease";
    io.observe(el);
  });

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener?.("change", (e) => {
    const manual = localStorage.getItem("atlas-theme");
    if (!manual) setTheme(e.matches ? "dark" : "light");
  });
});
