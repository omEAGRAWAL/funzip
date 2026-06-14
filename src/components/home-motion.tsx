"use client";

import { useEffect } from "react";

export function HomeMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".funzip-home");
    if (!root) return;

    const nav = root.querySelector<HTMLElement>(".nav");
    const menuToggle = root.querySelector<HTMLButtonElement>(".menu-toggle");
    const glow = root.querySelector<HTMLElement>(".cursor-glow");
    const splashHero = root.querySelector<HTMLElement>(".splash-hero");
    const floatingActions = root.querySelector<HTMLElement>(".floating-actions");

    const cleanup: Array<() => void> = [];

    const toggleMenu = () => {
      nav?.classList.toggle("open");
      menuToggle?.setAttribute(
        "aria-expanded",
        nav?.classList.contains("open") ? "true" : "false",
      );
    };

    menuToggle?.addEventListener("click", toggleMenu);
    if (menuToggle) cleanup.push(() => menuToggle.removeEventListener("click", toggleMenu));

    root.querySelectorAll<HTMLAnchorElement>(".nav-links a").forEach((link) => {
      const closeMenu = () => {
        nav?.classList.remove("open");
        menuToggle?.setAttribute("aria-expanded", "false");
      };
      link.addEventListener("click", closeMenu);
      cleanup.push(() => link.removeEventListener("click", closeMenu));
    });

    let floatingActionObserver: IntersectionObserver | undefined;
    if (splashHero && floatingActions) {
      floatingActionObserver = new IntersectionObserver(
        ([entry]) => {
          floatingActions.classList.toggle(
            "is-hidden",
            entry.isIntersecting && entry.intersectionRatio > 0.25,
          );
        },
        { threshold: [0, 0.25] },
      );
      floatingActionObserver.observe(splashHero);
      cleanup.push(() => floatingActionObserver?.disconnect());
    }

    const moveGlow = (event: MouseEvent) => {
      if (!glow) return;
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    };
    window.addEventListener("mousemove", moveGlow);
    cleanup.push(() => window.removeEventListener("mousemove", moveGlow));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    root.querySelectorAll(".reveal, .blog-reveal").forEach((item) => {
      revealObserver.observe(item);
    });
    cleanup.push(() => revealObserver.disconnect());

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const packageCarousel = root.querySelector<HTMLElement>("#packageCarousel");
    const packagePrev = root.querySelector<HTMLButtonElement>("#packagePrev");
    const packageNext = root.querySelector<HTMLButtonElement>("#packageNext");
    let packageAutoScrollTimer = 0;
    let packageResumeTimer = 0;
    let packageAutoScrollPaused = false;

    const getCardScrollAmount = () => {
      const firstCard = packageCarousel?.querySelector<HTMLElement>(".package-card");
      if (!firstCard || !packageCarousel) return 300;
      const styles = getComputedStyle(packageCarousel);
      const gap = parseInt(styles.columnGap || styles.gap || "18", 10);
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

    const tickPackageAutoScroll = () => {
      if (!packageCarousel || reducedMotion || packageAutoScrollPaused) return;

      const maxScroll = packageCarousel.scrollWidth - packageCarousel.clientWidth;
      if (maxScroll > 4) {
        packageCarousel.scrollLeft += 0.75;
        if (packageCarousel.scrollLeft >= maxScroll - 2) {
          packageCarousel.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    };

    const startPackageAutoScroll = () => {
      if (!packageCarousel || reducedMotion) return;
      window.clearInterval(packageAutoScrollTimer);
      window.clearTimeout(packageResumeTimer);
      packageAutoScrollPaused = false;
      packageCarousel.classList.add("is-auto-scrolling");
      packageAutoScrollTimer = window.setInterval(tickPackageAutoScroll, 16);
    };

    const pausePackageAutoScroll = (delay = 5000) => {
      packageAutoScrollPaused = true;
      window.clearInterval(packageAutoScrollTimer);
      window.clearTimeout(packageResumeTimer);
      packageCarousel?.classList.remove("is-auto-scrolling");
      if (!reducedMotion && delay > 0) {
        packageResumeTimer = window.setTimeout(startPackageAutoScroll, delay);
      }
    };

    const packagePrevClick = () => {
      pausePackageAutoScroll();
      scrollPackages(-1);
    };
    const packageNextClick = () => {
      pausePackageAutoScroll();
      scrollPackages(1);
    };
    const pausePackage = () => pausePackageAutoScroll(0);
    const touchPackage = () => pausePackageAutoScroll(5000);

    packagePrev?.addEventListener("click", packagePrevClick);
    packageNext?.addEventListener("click", packageNextClick);
    packageCarousel?.addEventListener("pointerenter", pausePackage);
    packageCarousel?.addEventListener("pointerleave", startPackageAutoScroll);
    packageCarousel?.addEventListener("focusin", pausePackage);
    packageCarousel?.addEventListener("focusout", startPackageAutoScroll);
    packageCarousel?.addEventListener("touchstart", touchPackage, { passive: true });
    startPackageAutoScroll();

    cleanup.push(() => {
      window.clearInterval(packageAutoScrollTimer);
      window.clearTimeout(packageResumeTimer);
      packagePrev?.removeEventListener("click", packagePrevClick);
      packageNext?.removeEventListener("click", packageNextClick);
      packageCarousel?.removeEventListener("pointerenter", pausePackage);
      packageCarousel?.removeEventListener("pointerleave", startPackageAutoScroll);
      packageCarousel?.removeEventListener("focusin", pausePackage);
      packageCarousel?.removeEventListener("focusout", startPackageAutoScroll);
      packageCarousel?.removeEventListener("touchstart", touchPackage);
    });

    const blogCarousel = root.querySelector<HTMLElement>("#blogCarousel");
    const blogPrev = root.querySelector<HTMLButtonElement>("#blogPrev");
    const blogNext = root.querySelector<HTMLButtonElement>("#blogNext");
    let blogAutoScrollTimer = 0;
    let blogResumeTimer = 0;
    let blogAutoScrollPaused = false;

    const getBlogScrollAmount = () => {
      const firstCard = blogCarousel?.querySelector<HTMLElement>(".blog-card");
      if (!firstCard || !blogCarousel) return 360;
      const styles = getComputedStyle(blogCarousel);
      const gap = parseInt(styles.columnGap || styles.gap || "30", 10);
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

    const tickBlogAutoScroll = () => {
      if (!blogCarousel || reducedMotion || blogAutoScrollPaused) return;

      const maxScroll = blogCarousel.scrollWidth - blogCarousel.clientWidth;
      if (maxScroll > 4) {
        blogCarousel.scrollLeft += 0.75;
        if (blogCarousel.scrollLeft >= maxScroll - 2) {
          blogCarousel.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    };

    const startBlogAutoScroll = () => {
      if (!blogCarousel || reducedMotion) return;
      window.clearInterval(blogAutoScrollTimer);
      window.clearTimeout(blogResumeTimer);
      blogAutoScrollPaused = false;
      blogCarousel.classList.add("is-auto-scrolling");
      blogAutoScrollTimer = window.setInterval(tickBlogAutoScroll, 16);
    };

    const pauseBlogAutoScroll = (delay = 5500) => {
      blogAutoScrollPaused = true;
      window.clearInterval(blogAutoScrollTimer);
      window.clearTimeout(blogResumeTimer);
      blogCarousel?.classList.remove("is-auto-scrolling");
      if (!reducedMotion && delay > 0) {
        blogResumeTimer = window.setTimeout(startBlogAutoScroll, delay);
      }
    };

    const blogPrevClick = () => {
      pauseBlogAutoScroll();
      scrollBlogs(-1);
    };
    const blogNextClick = () => {
      pauseBlogAutoScroll();
      scrollBlogs(1);
    };
    const pauseBlog = () => pauseBlogAutoScroll(0);
    const touchBlog = () => pauseBlogAutoScroll(5500);

    blogPrev?.addEventListener("click", blogPrevClick);
    blogNext?.addEventListener("click", blogNextClick);
    blogCarousel?.addEventListener("pointerenter", pauseBlog);
    blogCarousel?.addEventListener("pointerleave", startBlogAutoScroll);
    blogCarousel?.addEventListener("focusin", pauseBlog);
    blogCarousel?.addEventListener("focusout", startBlogAutoScroll);
    blogCarousel?.addEventListener("touchstart", touchBlog, { passive: true });
    startBlogAutoScroll();

    cleanup.push(() => {
      window.clearInterval(blogAutoScrollTimer);
      window.clearTimeout(blogResumeTimer);
      blogPrev?.removeEventListener("click", blogPrevClick);
      blogNext?.removeEventListener("click", blogNextClick);
      blogCarousel?.removeEventListener("pointerenter", pauseBlog);
      blogCarousel?.removeEventListener("pointerleave", startBlogAutoScroll);
      blogCarousel?.removeEventListener("focusin", pauseBlog);
      blogCarousel?.removeEventListener("focusout", startBlogAutoScroll);
      blogCarousel?.removeEventListener("touchstart", touchBlog);
    });

    const reviewSlider = root.querySelector<HTMLElement>("#reviewSlider");
    const reviewDots = Array.from(root.querySelectorAll<HTMLButtonElement>(".review-dot"));
    let activeReview = 0;

    const setReview = (index: number) => {
      activeReview = index;
      if (reviewSlider) {
        reviewSlider.style.transform = `translateX(-${index * 100}%)`;
      }
      reviewDots.forEach((dot, idx) => dot.classList.toggle("active", idx === index));
    };

    reviewDots.forEach((dot, idx) => {
      const selectReview = () => setReview(idx);
      dot.addEventListener("click", selectReview);
      cleanup.push(() => dot.removeEventListener("click", selectReview));
    });

    if (reviewDots.length) {
      setReview(0);
    }

    const reviewTimer = reviewDots.length
      ? window.setInterval(() => {
          const next = (activeReview + 1) % reviewDots.length;
          setReview(next);
        }, 4200)
      : 0;

    cleanup.push(() => window.clearInterval(reviewTimer));

    return () => {
      cleanup.forEach((fn) => fn());
    };
  }, []);

  return null;
}
