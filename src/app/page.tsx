/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { CalendarDays, IndianRupee, MapPin } from "lucide-react";
import { HomeLeadForm } from "@/components/home-lead-form";
import { HomeMotion } from "@/components/home-motion";
import { absoluteUrl, getSiteConfig, whatsappUrl } from "@/lib/config";
import { getBlogs, getItineraries, getPackages } from "@/lib/data";
import { JsonLd, organizationSchema, pageMetadata } from "@/lib/seo";
import "./home.css";

export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "Kashmir Tour Packages, Honeymoon Trips and Family Holidays",
  description:
    "Book Kashmir tour packages with Srinagar, Gulmarg, Pahalgam, houseboat stays, private cabs, and free itinerary downloads.",
  path: "/",
});

function formatPrice(price: number) {
  return `₹${price.toLocaleString("en-IN")}`;
}

function starsFor(rating: number) {
  const fullStars = Math.max(1, Math.min(5, Math.round(rating)));
  return `${"★".repeat(fullStars)}${"☆".repeat(5 - fullStars)}`;
}

function compactDuration(duration: string) {
  const days = duration.match(/(\d+)\s*days?/i);
  return days ? `${days[1]} Days` : duration;
}

function firstPackageImage(
  item: Awaited<ReturnType<typeof getPackages>>[number] | undefined,
  fallback: string,
) {
  const image = item?.images[0];
  return {
    url: image?.url || item?.ogImage || fallback,
    alt: image?.alt || item?.title || "Kashmir mountain landscape",
  };
}

export default async function Home() {
  const [packages, blogs, itineraries] = await Promise.all([
    getPackages(),
    getBlogs(),
    getItineraries(),
  ]);

  const config = getSiteConfig();
  const heroPackage = packages[0];
  const heroImage = firstPackageImage(heroPackage, config.defaultOgImage);
  const secondaryImage = firstPackageImage(packages[1] || heroPackage, heroImage.url);
  const packageCards = packages.slice(0, 8);
  const minPrice = packages.length
    ? Math.min(...packages.map((item) => item.price))
    : 12999;
  const routeStops =
    heroPackage?.destination
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 4) || [];
  const routeText = routeStops.length
    ? routeStops.join(" to ")
    : "Srinagar to Gulmarg to Pahalgam to Sonmarg";
  const packageOptions = packages.length
    ? packages.map((item) => item.title).slice(0, 8)
    : ["Honeymoon Package", "Family Package", "Group Package", "Custom Package"];

  const reviews = packages
    .flatMap((item) =>
      item.reviews.map((review) => ({
        ...review,
        context: item.title,
      })),
    )
    .slice(0, 5);
  const reviewCards = reviews.length
    ? reviews
    : [
        {
          name: "Funzip Guest",
          rating: 5,
          text: "The route, stays, cab plan, and local support made Kashmir feel calm and easy.",
          context: "Custom Kashmir Trip",
        },
      ];
  const averageRating =
    reviewCards.reduce((total, review) => total + review.rating, 0) /
    reviewCards.length;

  const storyCards = [
    ...blogs.map((item) => ({
      href: `/travel-blog/${item.slug}`,
      title: item.title,
      image: item.featuredImage || item.ogImage || config.defaultOgImage,
      alt: item.title,
      tag: "Guide",
    })),
    ...itineraries.map((item) => ({
      href: `/free-kashmir-itinerary/${item.slug}`,
      title: item.title,
      image: item.ogImage || config.defaultOgImage,
      alt: item.title,
      tag: "Itinerary",
    })),
  ].slice(0, 8);

  return (
    <>
      <JsonLd data={organizationSchema()} />
      <div className="funzip-home">
        <div className="cursor-glow" aria-hidden="true" />

        <header className="site-header" id="top">
          <nav className="nav">
            <a href="#top" className="brand" aria-label={`${config.brandName} home`}>
              <span className="brand-mark">FZ</span>
              <span>
                <strong>{config.brandName}</strong>
              </span>
            </a>

            <button
              className="menu-toggle"
              aria-label="Open menu"
              aria-expanded="false"
              type="button"
            >
              <span />
              <span />
              <span />
            </button>

            <div className="nav-links">
              <a href="#packages">Packages</a>
              <a href="#reviews">Reviews</a>
              <a href="#blogs">Blogs</a>
              <a href="#contact" className="nav-cta">
                Plan Trip
              </a>
            </div>
          </nav>
        </header>

        <main>
          <section
            className="splash-hero"
            aria-label="Heaven Exists, It's Kashmir destination splash"
          >
            <img className="splash-bg" src={heroImage.url} alt={heroImage.alt} />
            <div className="splash-overlay" aria-hidden="true" />
            <strong className="splash-watermark" aria-hidden="true">
              Heaven Exists, <br />
              It&apos;s Kashmir
            </strong>

            <div className="splash-content">
              <div className="splash-copy">
                <div className="splash-badge">
                  <span aria-hidden="true" />
                  <small>Welcome to Kashmir</small>
                </div>

                <h1>
                  Explore beyond Maps
                  <br />
                  With {config.brandName}
                </h1>

                <div className="splash-actions">
                  <a className="splash-cta" href="#packages">
                    <span>Explore Destination</span>
                    <i aria-hidden="true" />
                  </a>
                  <a
                    className="splash-add"
                    href="#contact"
                    aria-label="Add destination"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="hero section-pad">
            <div className="hero-bg-orb orb-one" />
            <div className="hero-bg-orb orb-two" />

            <div className="hero-copy reveal">
              <span className="eyebrow">
                Kashmir Tourism • Honeymoon • Family • Adventure
              </span>
              <h1>
                Your dream Kashmir trip, now planned from live package data.
              </h1>
              <p>
                Browse real packages, prices, routes, reviews, and travel guides
                managed from the backend, wrapped in the same premium lavender
                travel experience.
              </p>
              <div className="hero-actions">
                <a className="primary-btn" href="#packages">
                  Explore Packages
                </a>
                <a className="secondary-btn" href="#contact">
                  Get Free Quote
                </a>
              </div>

              <div className="trust-bar">
                <div>
                  <strong>{averageRating.toFixed(1)}★</strong>
                  <span>Guest rating</span>
                </div>
                <div>
                  <strong>{packages.length}+</strong>
                  <span>Live packages</span>
                </div>
                <div>
                  <strong>24/7</strong>
                  <span>Trip support</span>
                </div>
              </div>
            </div>

            <div className="hero-visual reveal delay-1">
              <div className="hero-card main-card">
                <img src={secondaryImage.url} alt={secondaryImage.alt} />
                <div className="floating-badge">
                  <span>Starting from</span>
                  <strong>{formatPrice(minPrice)}</strong>
                </div>
              </div>

              <div className="glass-card route-card">
                <small>Popular Route</small>
                <strong>{routeText}</strong>
                <div className="route-line">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="glass-card weather-card">
                <span>❄️</span>
                <div>
                  <strong>Snow Season</strong>
                  <small>Dec to Mar</small>
                </div>
              </div>
            </div>
          </section>

          <section className="rating-strip reveal">
            <div>
              <span>Google</span>
              <strong>{averageRating.toFixed(1)}/5</strong>
              <small>Verified Reviews</small>
            </div>
            <div>
              <span>Packages</span>
              <strong>{packages.length || "Live"}</strong>
              <small>Backend managed tours</small>
            </div>
            <div>
              <span>Travel Guides</span>
              <strong>{blogs.length + itineraries.length}</strong>
              <small>Blogs and itineraries</small>
            </div>
            <div>
              <span>Safe Travel</span>
              <strong>24/7</strong>
              <small>Support during trip</small>
            </div>
          </section>

          <section className="section-pad package-section" id="packages">
            <div className="package-section-head reveal">
              <div className="section-head">
                <span className="eyebrow">Single Row Sliding Packages</span>
                <h2>Kashmir packages in a clean swipeable carousel.</h2>
                <p>
                  Packages are rendered from the backend while the supplied
                  one-row arrows, swipe behavior, and auto-scroll motion stay in
                  place.
                </p>
              </div>

              <div className="package-top-actions">
                <Link className="package-view-all" href="/kashmir-tour-packages">
                  <span>View All Packages</span>
                  <i aria-hidden="true" />
                </Link>

                <div className="package-controls" aria-label="Package carousel controls">
                  <button
                    className="carousel-arrow left"
                    id="packagePrev"
                    aria-label="Previous packages"
                    type="button"
                  >
                    &lsaquo;
                  </button>
                  <button
                    className="carousel-arrow right"
                    id="packageNext"
                    aria-label="Next packages"
                    type="button"
                  >
                    &rsaquo;
                  </button>
                </div>
              </div>
            </div>

            <div className="package-carousel-wrap reveal">
              <div className="package-carousel" id="packageCarousel">
                {packageCards.map((item) => {
                  const image = firstPackageImage(item, config.defaultOgImage);

                  return (
                    <article className="package-card" key={item.slug}>
                      <div className="package-img">
                        <img src={image.url} alt={image.alt} />
                      </div>
                      <div className="package-body">
                        <h3>{item.title}</h3>
                        <div className="package-meta">
                          <div className="package-location">
                            <MapPin size={15} aria-hidden="true" />
                            <span>{item.destination}</span>
                          </div>
                          <div className="package-details-row">
                            <span>
                              <IndianRupee size={15} aria-hidden="true" />
                              Start From {formatPrice(item.price)}
                            </span>
                            <span>
                              <CalendarDays size={15} aria-hidden="true" />
                              {compactDuration(item.duration)}
                            </span>
                          </div>
                        </div>
                        <Link
                          className="package-detail-btn"
                          href={`/kashmir-tour-packages/${item.slug}`}
                        >
                          View Package Details
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="section-pad reviews-section" id="reviews">
            <div className="section-head reveal">
              <span className="eyebrow">Customer Rating Slideshow</span>
              <h2>Reviews presented in aesthetic star cards.</h2>
              <p>
                Testimonial cards use package review data from the backend and
                keep the same dot-controlled auto slideshow.
              </p>
            </div>

            <div className="reviews-shell reveal">
              <div className="review-slider" id="reviewSlider">
                {reviewCards.map((review, index) => (
                  <article className="review-card" key={`${review.name}-${index}`}>
                    <div className="review-stars">{starsFor(review.rating)}</div>
                    <p>“{review.text}”</p>
                    <div className="review-meta">
                      <strong>{review.name}</strong>
                      <span>{review.context}</span>
                    </div>
                  </article>
                ))}
              </div>

              <div className="review-controls">
                {reviewCards.map((review, index) => (
                  <button
                    className={`review-dot ${index === 0 ? "active" : ""}`}
                    aria-label={`Review slide ${index + 1}`}
                    key={`${review.name}-dot-${index}`}
                    type="button"
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="section-pad blog-section" id="blogs">
            <div className="blog-section-head reveal">
              <div className="section-head">
                <span className="eyebrow">Magazine Style Blogs</span>
                <h2>Stories for elegant Kashmir explorers.</h2>
                <p>
                  Backend blogs and itinerary downloads appear inside the same
                  horizontal story carousel.
                </p>
              </div>

              <div className="blog-top-actions">
                <Link className="blog-view-all" href="/travel-blog">
                  <span>View All Blogs</span>
                  <i aria-hidden="true" />
                </Link>

                <div className="blog-controls" aria-label="Blog carousel controls">
                  <button
                    className="blog-arrow left"
                    id="blogPrev"
                    aria-label="Previous blogs"
                    type="button"
                  >
                    &lsaquo;
                  </button>
                  <button
                    className="blog-arrow right"
                    id="blogNext"
                    aria-label="Next blogs"
                    type="button"
                  >
                    &rsaquo;
                  </button>
                </div>
              </div>
            </div>

            <div className="blog-carousel-wrap reveal">
              <div className="blog-carousel" id="blogCarousel">
                {storyCards.map((item, index) => (
                  <Link
                    className="blog-card blog-reveal"
                    href={item.href}
                    key={`${item.href}-${index}`}
                  >
                    <img src={item.image} alt={item.alt} />
                    <span className="blog-tag">{item.tag}</span>
                    <h3>{item.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="section-pad quote-section" id="contact">
            <div className="quote-card reveal">
              <div>
                <span className="eyebrow">Plan your Kashmir trip</span>
                <h2>Get a free custom itinerary in minutes.</h2>
                <p>
                  Choose a backend-managed package, share your name and phone,
                  and the lead goes straight into the existing admin system.
                </p>
              </div>

              <HomeLeadForm
                sourcePage={absoluteUrl("/")}
                leadType="Homepage"
                packageOptions={packageOptions}
              />
            </div>
          </section>
        </main>

        <footer className="footer" id="footer">
          <div className="footer-inner">
            <div className="footer-hero">
              <h2>Expedition Expertise at Your Service</h2>
              <a className="footer-cta" href="#contact">
                <span>Begin Your Journey</span>
                <i aria-hidden="true" />
              </a>
            </div>

            <div className="footer-links">
              <nav aria-label="Footer main pages">
                <h3>Main Page</h3>
                <a href="#top">Home</a>
                <a href="#reviews">About</a>
                <a href="#packages">Package</a>
                <Link href="/kashmir-tour-packages">Destination</Link>
                <a href="#contact">Contact</a>
              </nav>

              <nav aria-label="Contact links">
                <h3>Contact</h3>
                <a href={whatsappUrl("Hi, I want help planning a Kashmir trip.")}>
                  WhatsApp
                </a>
                <a href={`tel:${config.phone}`}>{config.phone}</a>
                <a href={`mailto:${config.email}`}>{config.email}</a>
                <Link href="/travel-blog">Travel Blog</Link>
              </nav>
            </div>

            <div className="footer-bottom">
              <p>&copy; 2026 {config.brandName}. All Rights Reserved.</p>
              <div>
                <Link href="/about">Privacy Policy</Link>
                <Link href="/contact">Terms & Conditions</Link>
              </div>
              <a className="footer-credit" href={`mailto:${config.email}`}>
                {config.address}
              </a>
            </div>

            <strong className="footer-watermark" aria-hidden="true">
              {config.brandName.toUpperCase()}
            </strong>
          </div>
        </footer>

        <div className="floating-actions" aria-label="Quick contact actions">
          <a
            className="whatsapp"
            href={whatsappUrl("Hi, I want help planning a Kashmir trip.")}
            aria-label="Chat on WhatsApp"
          >
            WA
          </a>
          <a className="call" href={`tel:${config.phone}`} aria-label="Call now">
            Call
          </a>
        </div>

        <HomeMotion />
      </div>
    </>
  );
}
