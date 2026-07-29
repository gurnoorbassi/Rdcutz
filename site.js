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
const currentPage = (location.pathname.split("/").pop() || "index.html").toLowerCase();

document.querySelectorAll('nav a[href$=".html"]').forEach((link) => {
  const href = link.getAttribute("href").toLowerCase();
  if (href === currentPage || (currentPage === "" && href === "index.html")) {
    link.setAttribute("aria-current", "page");
  }
});

function updateChrome() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progressValue = maxScroll > 0 ? scrollTop / maxScroll : 0;

  siteNav.classList.toggle("scrolled", scrollTop > 20);
  backTop.classList.toggle("visible", scrollTop > 500);
  progress.style.transform = `scaleX(${progressValue})`;
}

function closeMenu() {
  mobileMenu.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

function toggleMenu() {
  const isOpen = mobileMenu.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
}

menuToggle.addEventListener("click", toggleMenu);
mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
});

if (brandImage) {
  brandImage.addEventListener("error", () => {
    brandImage.closest(".brand-link").classList.add("logo-missing");
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
    window.addEventListener("load", () => {
      window.setTimeout(hideIntro, 900);
    });
    window.setTimeout(hideIntro, 1800);
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
  }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}

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
      const shouldShow = album === "all" || albums.includes(album);
      card.classList.toggle("is-hidden", !shouldShow);
    });

    if (updateUrl && document.body.dataset.page === "gallery") {
      const nextUrl = album === "all" ? "gallery.html" : `gallery.html?album=${encodeURIComponent(album)}`;
      window.history.replaceState({}, "", nextUrl);
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => setAlbum(button.dataset.filter, true));
  });

  const requestedAlbum = new URLSearchParams(window.location.search).get("album");
  const initialAlbum = buttons.some((button) => button.dataset.filter === requestedAlbum) ? requestedAlbum : "all";
  setAlbum(initialAlbum);
});

const instagramFeed = document.querySelector("[data-instagram-feed]");
const instagramStatus = document.querySelector("[data-instagram-status]");
if (instagramFeed) {
  fetch("/.netlify/functions/instagram-feed", { headers: { Accept: "application/json" } })
    .then((response) => (response.ok ? response.json() : null))
    .then((data) => {
      if (!data || !Array.isArray(data.items) || data.items.length === 0) return;
      instagramFeed.textContent = "";
      data.items.slice(0, 8).forEach((item) => {
        const link = document.createElement("a");
        link.href = item.permalink || "https://www.instagram.com/rdcutz_/";
        link.target = "_blank";
        link.rel = "noreferrer";

        if (item.mediaUrl) {
          const image = document.createElement("img");
          image.src = item.mediaUrl;
          image.alt = item.caption || "RD Cutz Instagram post";
          image.loading = "lazy";
          link.append(image);
        }

        const label = document.createElement("span");
        label.textContent = item.caption || item.mediaType || "Instagram post";
        link.append(label);
        instagramFeed.append(link);
      });
      const liveSection = instagramFeed.closest(".live-section");
      if (liveSection) liveSection.hidden = false;
      if (instagramStatus) instagramStatus.textContent = "Latest posts loaded automatically from Instagram.";
    })
    .catch(() => {});
}
