// Portfolio — theme toggle, mobile nav, contact form, reveal animations.
(function () {
  var root = document.documentElement;

  // ----- Theme: light / dark / system -----
  var KEY = "portfolio-theme";
  var themeBtn = document.getElementById("theme-btn");
  var themeIcon = document.getElementById("theme-icon");
  var dropdown = document.getElementById("theme-dropdown");
  var media = window.matchMedia("(prefers-color-scheme: dark)");

  function applyTheme(choice) {
    var effective = choice === "system" ? (media.matches ? "dark" : "light") : choice;
    root.setAttribute("data-theme", effective);
    themeIcon.innerHTML = effective === "dark" ? "&#9789;" : "&#9788;";
    try { localStorage.setItem(KEY, choice); } catch (e) {}
  }

  var saved = "system";
  try { saved = localStorage.getItem(KEY) || "system"; } catch (e) {}
  applyTheme(saved);

  themeBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    var open = dropdown.classList.toggle("open");
    themeBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  dropdown.querySelectorAll("button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyTheme(btn.getAttribute("data-theme-choice"));
      dropdown.classList.remove("open");
      themeBtn.setAttribute("aria-expanded", "false");
    });
  });
  document.addEventListener("click", function () {
    dropdown.classList.remove("open");
    themeBtn.setAttribute("aria-expanded", "false");
  });
  media.addEventListener("change", function () {
    var current = "system";
    try { current = localStorage.getItem(KEY) || "system"; } catch (e) {}
    if (current === "system") applyTheme("system");
  });

  // ----- Mobile nav -----
  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");
  navToggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      nav.querySelectorAll("a").forEach(function (a) { a.classList.remove("active"); });
      link.classList.add("active");
    });
  });

  // ----- Contact form: opens the visitor's email app (no backend) -----
  var form = document.getElementById("contact-form");
  var note = document.getElementById("form-note");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("cf-name").value.trim();
    var email = document.getElementById("cf-email").value.trim();
    var subject = document.getElementById("cf-subject").value.trim();
    var message = document.getElementById("cf-message").value.trim();
    var body = "Hi Sai Bhanu Prasad,\n\n" + message + "\n\n— " + name + " (" + email + ")";
    window.location.href =
      "mailto:narrasaibhanuprasad@gmail.com?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
    note.textContent = "Opening your email app to send the message…";
  });

  // ----- Scroll reveal -----
  var revealEls = document.querySelectorAll(".skill-card, .exp-card, .project-card, .contact-card, .contact-form");
  revealEls.forEach(function (el) { el.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  // ----- Footer year -----
  document.getElementById("year").textContent = new Date().getFullYear();
})();
