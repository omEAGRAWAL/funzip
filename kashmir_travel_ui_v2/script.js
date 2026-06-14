const nav = document.querySelector(".nav");
const menuToggle = document.querySelector(".menu-toggle");
const glow = document.querySelector(".cursor-glow");
const splashHero = document.querySelector(".splash-hero");
const floatingActions = document.querySelector(".floating-actions");

menuToggle?.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", nav.classList.contains("open"));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

if (splashHero && floatingActions) {
  const floatingActionObserver = new IntersectionObserver(([entry]) => {
    floatingActions.classList.toggle("is-hidden", entry.isIntersecting && entry.intersectionRatio > 0.25);
  }, { threshold: [0, 0.25] });

  floatingActionObserver.observe(splashHero);
}

window.addEventListener("mousemove", (event) => {
  if (!glow) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal, .blog-reveal").forEach((item) => {
  revealObserver.observe(item);
});

const packageCarousel = document.getElementById("packageCarousel");
const packagePrev = document.getElementById("packagePrev");
const packageNext = document.getElementById("packageNext");

const getCardScrollAmount = () => {
  const firstCard = packageCarousel?.querySelector(".package-card");
  if (!firstCard) return 300;
  const styles = getComputedStyle(packageCarousel);
  const gap = parseInt(styles.columnGap || styles.gap || 18, 10);
  return firstCard.getBoundingClientRect().width + gap;
};

const scrollPackages = (direction = 1) => {
  if (!packageCarousel) return;

  const amount = getCardScrollAmount();
  const maxScroll = packageCarousel.scrollWidth - packageCarousel.clientWidth;
  const nearStart = packageCarousel.scrollLeft <= 4;
  const nearEnd = packageCarousel.scrollLeft >= maxScroll - 4;

  if (maxScroll <= 4) return;

  if (direction > 0 && nearEnd) {
    packageCarousel.scrollTo({ left: 0, behavior: "smooth" });
    return;
  }

  if (direction < 0 && nearStart) {
    packageCarousel.scrollTo({ left: maxScroll, behavior: "smooth" });
    return;
  }

  packageCarousel.scrollBy({ left: amount * direction, behavior: "smooth" });
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let packageAutoScrollTimer;
let packageResumeTimer;
let packageAutoScrollPaused = false;

function tickPackageAutoScroll() {
  if (!packageCarousel || reducedMotion || packageAutoScrollPaused) return;

  const maxScroll = packageCarousel.scrollWidth - packageCarousel.clientWidth;

  if (maxScroll > 4) {
    packageCarousel.scrollLeft += 0.75;

    if (packageCarousel.scrollLeft >= maxScroll - 2) {
      packageCarousel.scrollTo({ left: 0, behavior: "smooth" });
    }
  }
}

function startPackageAutoScroll() {
  if (!packageCarousel || reducedMotion) return;
  window.clearInterval(packageAutoScrollTimer);
  window.clearTimeout(packageResumeTimer);
  packageAutoScrollPaused = false;
  packageCarousel.classList.add("is-auto-scrolling");
  packageAutoScrollTimer = window.setInterval(tickPackageAutoScroll, 16);
}

function pausePackageAutoScroll(delay = 5000) {
  packageAutoScrollPaused = true;
  window.clearInterval(packageAutoScrollTimer);
  window.clearTimeout(packageResumeTimer);
  packageCarousel?.classList.remove("is-auto-scrolling");
  if (!reducedMotion && delay > 0) {
    packageResumeTimer = window.setTimeout(startPackageAutoScroll, delay);
  }
}

packagePrev?.addEventListener("click", () => {
  pausePackageAutoScroll();
  scrollPackages(-1);
});
packageNext?.addEventListener("click", () => {
  pausePackageAutoScroll();
  scrollPackages(1);
});

packageCarousel?.addEventListener("pointerenter", () => pausePackageAutoScroll(0));
packageCarousel?.addEventListener("pointerleave", startPackageAutoScroll);
packageCarousel?.addEventListener("focusin", () => pausePackageAutoScroll(0));
packageCarousel?.addEventListener("focusout", startPackageAutoScroll);
packageCarousel?.addEventListener("touchstart", () => pausePackageAutoScroll(5000), { passive: true });

startPackageAutoScroll();

const blogCarousel = document.getElementById("blogCarousel");
const blogPrev = document.getElementById("blogPrev");
const blogNext = document.getElementById("blogNext");

const getBlogScrollAmount = () => {
  const firstCard = blogCarousel?.querySelector(".blog-card");
  if (!firstCard) return 360;
  const styles = getComputedStyle(blogCarousel);
  const gap = parseInt(styles.columnGap || styles.gap || 30, 10);
  return firstCard.getBoundingClientRect().width + gap;
};

const scrollBlogs = (direction = 1) => {
  if (!blogCarousel) return;

  const amount = getBlogScrollAmount();
  const maxScroll = blogCarousel.scrollWidth - blogCarousel.clientWidth;
  const nearStart = blogCarousel.scrollLeft <= 4;
  const nearEnd = blogCarousel.scrollLeft >= maxScroll - 4;

  if (maxScroll <= 4) return;

  if (direction > 0 && nearEnd) {
    blogCarousel.scrollTo({ left: 0, behavior: "smooth" });
    return;
  }

  if (direction < 0 && nearStart) {
    blogCarousel.scrollTo({ left: maxScroll, behavior: "smooth" });
    return;
  }

  blogCarousel.scrollBy({ left: amount * direction, behavior: "smooth" });
};

let blogAutoScrollTimer;
let blogResumeTimer;
let blogAutoScrollPaused = false;

function tickBlogAutoScroll() {
  if (!blogCarousel || reducedMotion || blogAutoScrollPaused) return;

  const maxScroll = blogCarousel.scrollWidth - blogCarousel.clientWidth;

  if (maxScroll > 4) {
    blogCarousel.scrollLeft += 0.75;

    if (blogCarousel.scrollLeft >= maxScroll - 2) {
      blogCarousel.scrollTo({ left: 0, behavior: "smooth" });
    }
  }
}

function startBlogAutoScroll() {
  if (!blogCarousel || reducedMotion) return;
  window.clearInterval(blogAutoScrollTimer);
  window.clearTimeout(blogResumeTimer);
  blogAutoScrollPaused = false;
  blogCarousel.classList.add("is-auto-scrolling");
  blogAutoScrollTimer = window.setInterval(tickBlogAutoScroll, 16);
}

function pauseBlogAutoScroll(delay = 5500) {
  blogAutoScrollPaused = true;
  window.clearInterval(blogAutoScrollTimer);
  window.clearTimeout(blogResumeTimer);
  blogCarousel?.classList.remove("is-auto-scrolling");
  if (!reducedMotion && delay > 0) {
    blogResumeTimer = window.setTimeout(startBlogAutoScroll, delay);
  }
}

blogPrev?.addEventListener("click", () => {
  pauseBlogAutoScroll();
  scrollBlogs(-1);
});
blogNext?.addEventListener("click", () => {
  pauseBlogAutoScroll();
  scrollBlogs(1);
});

blogCarousel?.addEventListener("pointerenter", () => pauseBlogAutoScroll(0));
blogCarousel?.addEventListener("pointerleave", startBlogAutoScroll);
blogCarousel?.addEventListener("focusin", () => pauseBlogAutoScroll(0));
blogCarousel?.addEventListener("focusout", startBlogAutoScroll);
blogCarousel?.addEventListener("touchstart", () => pauseBlogAutoScroll(5500), { passive: true });

startBlogAutoScroll();

const reviewSlider = document.getElementById("reviewSlider");
const reviewDots = document.querySelectorAll(".review-dot");
let activeReview = 0;
const totalReviews = reviewDots.length;

function setReview(index) {
  activeReview = index;
  if (reviewSlider) {
    reviewSlider.style.transform = `translateX(-${index * 100}%)`;
  }
  reviewDots.forEach((dot, idx) => dot.classList.toggle("active", idx === index));
}

reviewDots.forEach((dot, idx) => {
  dot.addEventListener("click", () => setReview(idx));
});

setReview(0);

setInterval(() => {
  const next = (activeReview + 1) % totalReviews;
  setReview(next);
}, 4200);
