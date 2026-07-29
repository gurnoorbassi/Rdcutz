/* =========================================================
   RD Cutz shared interactions
   ========================================================= */
const siteNav = document.getElementById("siteNav");
const progress = document.getElementById("progress");
const backTop = document.getElementById("backTop");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const brandImage = document.querySelector(".brand-link img");
const introLoader = document.getElementById("introLoader");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function normalizePath(pathname) {
  const cleaned = pathname.replace(/index\.html$/i, "").replace(/\.html$/i, "").replace(/\/+$/, "");
  return cleaned || "/";
}

const currentPath = normalizePath(window.location.pathname);
document.querySelectorAll("nav a[href]").forEach((link) => {
  const linkPath = normalizePath(new URL(link.href, window.location.href).pathname);
  if (linkPath === currentPath) link.setAttribute("aria-current", "page");
});

function updateChrome() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progressValue = maxScroll > 0 ? scrollTop / maxScroll : 0;

  if (siteNav) siteNav.classList.toggle("scrolled", scrollTop > 20);
  if (backTop) backTop.classList.toggle("visible", scrollTop > 500);
  if (progress) progress.style.transform = `scaleX(${progressValue})`;
}

function closeMenu() {
  if (!mobileMenu || !menuToggle) return;
  mobileMenu.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

function toggleMenu() {
  if (!mobileMenu || !menuToggle) return;
  const isOpen = mobileMenu.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
}

if (menuToggle) menuToggle.addEventListener("click", toggleMenu);
if (mobileMenu) mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

if (backTop) {
  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });
}

if (brandImage) {
  brandImage.addEventListener("error", () => {
    brandImage.closest(".brand-link")?.classList.add("logo-missing");
  });
}

window.addEventListener("scroll", updateChrome, { passive: true });
window.addEventListener("resize", updateChrome);
updateChrome();

function hideIntro() {
  if (!introLoader) return;
  introLoader.classList.add("hidden");
  document.body.classList.remove("is-loading");
}

if (introLoader) {
  if (reducedMotion) {
    hideIntro();
  } else {
    window.addEventListener("load", () => window.setTimeout(hideIntro, 520));
    window.setTimeout(hideIntro, 1200);
  }
}

if (!reducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}

/* =========================================================
   Filterable work albums
   ========================================================= */
document.querySelectorAll(".album-tabs").forEach((tabs) => {
  const gallery = document.querySelector("[data-album-gallery]");
  if (!gallery) return;

  const cards = Array.from(gallery.children);
  const buttons = Array.from(tabs.querySelectorAll("[data-filter]"));

  function setAlbum(album, updateUrl = false) {
    buttons.forEach((button) => {
      const isActive = button.dataset.filter === album;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    cards.forEach((card) => {
      const albums = (card.dataset.albums || "").split(/\s+/);
      card.classList.toggle("is-hidden", album !== "all" && !albums.includes(album));
    });

    if (updateUrl && document.body.dataset.page === "gallery") {
      const nextUrl = album === "all" ? "/gallery" : `/gallery?album=${encodeURIComponent(album)}`;
      window.history.replaceState({}, "", nextUrl);
    }
  }

  buttons.forEach((button) => button.addEventListener("click", () => setAlbum(button.dataset.filter, true)));
  const requestedAlbum = new URLSearchParams(window.location.search).get("album");
  const initialAlbum = buttons.some((button) => button.dataset.filter === requestedAlbum) ? requestedAlbum : "all";
  setAlbum(initialAlbum);
});

/* =========================================================
   Embedded TheCut booking
   ========================================================= */
const bookingTriggers = Array.from(document.querySelectorAll("[data-booking]"));
let lastBookingTrigger = null;

if (bookingTriggers.length) {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="booking-modal" id="bookingModal" aria-hidden="true">
      <button class="booking-modal-backdrop" type="button" data-booking-close aria-label="Close booking"></button>
      <section class="booking-modal-panel" role="dialog" aria-modal="true" aria-labelledby="bookingModalTitle">
        <header class="booking-modal-head">
          <div>
            <p class="eyebrow">Live booking / TheCut</p>
            <h2 id="bookingModalTitle">Book <em>RD Cutz.</em></h2>
            <p class="booking-selection" data-booking-selection>Choose a service and available time below.</p>
          </div>
          <button class="booking-modal-close" type="button" data-booking-close aria-label="Close booking"><span aria-hidden="true">&times;</span></button>
        </header>
        <div class="booking-modal-frame-wrap">
          <div class="booking-frame-loading" aria-hidden="true"><span></span><p>Loading live availability…</p></div>
          <iframe class="booking-modal-frame" title="Book RD Cutz through TheCut" data-booking-frame loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>
      </section>
    </div>
  `);
}

const bookingModal = document.getElementById("bookingModal");
const bookingFrame = bookingModal?.querySelector("[data-booking-frame]");
const bookingSelection = bookingModal?.querySelector("[data-booking-selection]");
const bookingClose = bookingModal?.querySelector(".booking-modal-close");

function openBooking(trigger) {
  if (!bookingModal || !bookingFrame) return;
  lastBookingTrigger = trigger;
  const service = trigger?.dataset.service;
  if (bookingSelection) {
    bookingSelection.textContent = service
      ? `${service} selected — choose the matching service and an open time below.`
      : "Choose a service and available time below.";
  }
  if (!bookingFrame.src) bookingFrame.src = "https://app.thecut.co/barbers/RDCUTZ";
  bookingModal.classList.add("open");
  bookingModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("booking-open");
  bookingClose?.focus();
}

function closeBooking() {
  if (!bookingModal) return;
  bookingModal.classList.remove("open");
  bookingModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("booking-open");
  lastBookingTrigger?.focus();
}

bookingTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openBooking(trigger);
  });
});

bookingModal?.querySelectorAll("[data-booking-close]").forEach((button) => button.addEventListener("click", closeBooking));

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (bookingModal?.classList.contains("open")) closeBooking();
  else closeMenu();
});
