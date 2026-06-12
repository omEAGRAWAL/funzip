import type {
  BlogPostItem,
  ItineraryDownloadItem,
  PackageItem,
} from "@/lib/types";

const now = new Date("2026-06-01T08:00:00.000Z");

export const seedPackages: PackageItem[] = [
  {
    id: "pkg-classic-kashmir",
    title: "Classic Kashmir Family Tour",
    slug: "classic-kashmir-family-tour-5-nights",
    seoTitle: "Classic Kashmir Family Tour Package | 5 Nights Srinagar Gulmarg Pahalgam",
    metaDescription:
      "Book a 5-night Kashmir family tour with Srinagar, Gulmarg, Pahalgam, houseboat stay, private cab, hotels, and day-wise itinerary.",
    canonicalUrl: null,
    ogImage:
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d",
    indexable: true,
    overview:
      "A balanced Kashmir family holiday covering Srinagar gardens, Dal Lake, Gulmarg meadows, Pahalgam valleys, and one memorable houseboat night without rushing the route.",
    destination: "Srinagar, Gulmarg, Pahalgam",
    duration: "5 nights / 6 days",
    price: 24999,
    priceNote: "per person on twin sharing",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Srinagar and Dal Lake evening",
        description:
          "Airport pickup, hotel check-in, Mughal Garden visit, and a relaxed Shikara ride on Dal Lake.",
      },
      {
        day: 2,
        title: "Srinagar to Gulmarg",
        description:
          "Drive to Gulmarg, take the Gondola as per ticket availability, and return to the hotel by evening.",
      },
      {
        day: 3,
        title: "Gulmarg to Pahalgam",
        description:
          "Scenic drive via saffron fields and Awantipora ruins with evening leisure beside the Lidder River.",
      },
      {
        day: 4,
        title: "Pahalgam valley day",
        description:
          "Visit Aru, Betaab, and Chandanwari by local union cab with time for photos and riverside walks.",
      },
      {
        day: 5,
        title: "Houseboat stay in Srinagar",
        description:
          "Return to Srinagar, shop for dry fruits and crafts, then check into a premium houseboat.",
      },
      {
        day: 6,
        title: "Departure",
        description:
          "Breakfast, checkout, and private transfer to Srinagar airport.",
      },
    ],
    inclusions: [
      "Airport pickup and drop",
      "Private cab for intercity transfers",
      "Hotel and houseboat stays",
      "Daily breakfast and dinner",
      "Shikara ride on Dal Lake",
    ],
    exclusions: [
      "Flights or train tickets",
      "Gulmarg Gondola tickets",
      "Pahalgam local union cab",
      "Lunch and personal expenses",
    ],
    hotels:
      "Handpicked 3-star or 4-star hotels in Srinagar, Gulmarg/Pahalgam, and a deluxe Dal Lake houseboat.",
    cabDetails:
      "Clean private sedan, SUV, or tempo traveller based on group size. Mountain-route local rules apply in Gulmarg and Pahalgam.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d",
        alt: "Dal Lake houseboats in Srinagar Kashmir",
      },
      {
        url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
        alt: "Snowy Gulmarg landscape in Kashmir",
      },
      {
        url: "https://images.unsplash.com/photo-1581793746485-04698e79a4e8",
        alt: "Green valley near Pahalgam Kashmir",
      },
    ],
    faqs: [
      {
        question: "Is this Kashmir package suitable for families with kids?",
        answer:
          "Yes. The route uses comfortable travel days, private transfers, and family-friendly stays.",
      },
      {
        question: "Can the hotel category be upgraded?",
        answer:
          "Yes. The admin can update the package price and hotel details for 4-star, 5-star, or boutique stays.",
      },
    ],
    reviews: [
      {
        name: "Ritika Sharma",
        rating: 5,
        text: "The pacing was perfect for our parents and kids. The Srinagar houseboat night was the highlight.",
      },
    ],
    schemaFields: { category: "Family Tour", availability: "InStock" },
    relatedPackages: [
      "kashmir-honeymoon-package-6-days",
      "gulmarg-snow-tour-package",
    ],
    relatedBlogs: [
      "best-time-to-visit-kashmir",
      "kashmir-family-trip-cost-guide",
    ],
    status: "PUBLISHED",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "pkg-honeymoon",
    title: "Kashmir Honeymoon Package",
    slug: "kashmir-honeymoon-package-6-days",
    seoTitle: "Kashmir Honeymoon Package for Couples | 6 Days Romantic Trip",
    metaDescription:
      "Plan a romantic 6-day Kashmir honeymoon with Srinagar, Gulmarg, Pahalgam, private cab, candlelight dinner options, and houseboat stay.",
    canonicalUrl: null,
    ogImage:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7",
    indexable: true,
    overview:
      "A romantic Kashmir itinerary designed for privacy, scenic stays, photo-friendly days, and enough slow time for couples to enjoy the mountains.",
    destination: "Srinagar, Gulmarg, Pahalgam",
    duration: "5 nights / 6 days",
    price: 31999,
    priceNote: "per person on twin sharing",
    itinerary: [
      {
        day: 1,
        title: "Srinagar arrival",
        description:
          "Private pickup, garden walk, and lakeside evening with optional cake or room decoration.",
      },
      {
        day: 2,
        title: "Gulmarg snow and Gondola",
        description:
          "Drive to Gulmarg for snow views, Gondola ride, photography, and leisure.",
      },
      {
        day: 3,
        title: "Gulmarg to Pahalgam",
        description:
          "Scenic transfer with saffron fields, apple orchards, and check-in at a riverside stay.",
      },
      {
        day: 4,
        title: "Pahalgam local valleys",
        description:
          "Explore Aru, Betaab Valley, and Chandanwari at a relaxed pace.",
      },
      {
        day: 5,
        title: "Srinagar houseboat",
        description:
          "Return to Srinagar for shopping, Shikara ride, and premium houseboat stay.",
      },
      {
        day: 6,
        title: "Departure",
        description: "Airport transfer after breakfast.",
      },
    ],
    inclusions: [
      "Private cab",
      "Romantic room setup on request",
      "Breakfast and dinner",
      "One Shikara ride",
      "Couple-friendly hotels",
    ],
    exclusions: [
      "Airfare",
      "Adventure activities",
      "Entry tickets",
      "Personal shopping",
    ],
    hotels:
      "Boutique hotels and houseboats with scenic rooms; upgrades available for premium honeymoon stays.",
    cabDetails:
      "Private cab with driver for the full route except union-restricted local sightseeing points.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1605649487212-47bdab064df7",
        alt: "Couple friendly mountain landscape in Kashmir",
      },
      {
        url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        alt: "Romantic lakeside travel scene",
      },
    ],
    faqs: [
      {
        question: "Can you add candlelight dinner?",
        answer:
          "Yes. Candlelight dinner, floral decoration, and cake can be added as optional paid services.",
      },
      {
        question: "Which month is best for a Kashmir honeymoon?",
        answer:
          "March to June is ideal for gardens and valleys, while December to February is best for snow.",
      },
    ],
    reviews: [
      {
        name: "Aman and Nidhi",
        rating: 5,
        text: "Everything felt private and well planned. Gulmarg and the houseboat stay were beautiful.",
      },
    ],
    schemaFields: { category: "Honeymoon Package", availability: "InStock" },
    relatedPackages: [
      "classic-kashmir-family-tour-5-nights",
      "gulmarg-snow-tour-package",
    ],
    relatedBlogs: ["best-time-to-visit-kashmir"],
    status: "PUBLISHED",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "pkg-gulmarg-snow",
    title: "Gulmarg Snow Tour Package",
    slug: "gulmarg-snow-tour-package",
    seoTitle: "Gulmarg Snow Tour Package | Kashmir Winter Trip",
    metaDescription:
      "Book a focused Gulmarg snow package with Srinagar stay, private transfers, Gondola guidance, and winter-ready planning.",
    canonicalUrl: null,
    ogImage:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
    indexable: true,
    overview:
      "A short winter escape for travellers who want snow, Gulmarg views, warm stays, and simple transfers from Srinagar.",
    destination: "Srinagar and Gulmarg",
    duration: "3 nights / 4 days",
    price: 17999,
    priceNote: "per person on twin sharing",
    itinerary: [
      {
        day: 1,
        title: "Arrive in Srinagar",
        description:
          "Airport pickup, hotel check-in, and optional evening Shikara ride.",
      },
      {
        day: 2,
        title: "Full-day Gulmarg snow experience",
        description:
          "Private transfer to Gulmarg, snow activity time, and Gondola assistance.",
      },
      {
        day: 3,
        title: "Srinagar sightseeing",
        description:
          "Mughal gardens, old city views, local market time, and cafe stops.",
      },
      {
        day: 4,
        title: "Departure",
        description: "Breakfast and airport drop.",
      },
    ],
    inclusions: [
      "Srinagar hotel stay",
      "Private transfers",
      "Daily meals as per plan",
      "Gulmarg day excursion",
    ],
    exclusions: [
      "Snow gear rental",
      "Gondola tickets",
      "Skiing or ATV rides",
      "Flights",
    ],
    hotels:
      "Warm Srinagar hotel base with optional Gulmarg overnight upgrade during winter.",
    cabDetails:
      "Winter-ready private vehicle; snow-chain or union vehicle cost may apply depending on weather.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
        alt: "Gulmarg snow fields in winter",
      },
    ],
    faqs: [
      {
        question: "Is snow guaranteed in Gulmarg?",
        answer:
          "Snow is most likely from late December to February, but weather always varies by season.",
      },
    ],
    reviews: [
      {
        name: "Kabir Mehta",
        rating: 5,
        text: "The team helped us plan Gondola timing and avoid a lot of winter confusion.",
      },
    ],
    schemaFields: { category: "Winter Tour", availability: "InStock" },
    relatedPackages: ["classic-kashmir-family-tour-5-nights"],
    relatedBlogs: ["best-time-to-visit-kashmir"],
    status: "PUBLISHED",
    createdAt: now,
    updatedAt: now,
  },
];

export const seedBlogs: BlogPostItem[] = [
  {
    id: "blog-best-time",
    title: "Best Time to Visit Kashmir for Snow, Tulips, and Family Trips",
    slug: "best-time-to-visit-kashmir",
    seoTitle: "Best Time to Visit Kashmir | Month-by-Month Travel Guide",
    metaDescription:
      "Compare Kashmir seasons for snow, tulips, family tours, honeymoon trips, and budget travel before booking your itinerary.",
    canonicalUrl: null,
    ogImage:
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d",
    featuredImage:
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d",
    indexable: true,
    author: "Kashmir Vista Editorial Team",
    content: `## Quick answer
The best time to visit Kashmir depends on what you want from the trip. March to April is loved for tulips and spring gardens, May to June works well for family holidays, September to October is calm and scenic, and December to February is the main snow window for Gulmarg.

## Month-by-month planning
Spring brings flowers, softer weather, and excellent sightseeing in Srinagar. Summer is easier for kids and senior travellers because roads are more predictable. Autumn has golden Chinar trees and fewer crowds. Winter needs warmer packing and more flexible timing, but it rewards you with snow views.

## Package planning tip
If this is your first Kashmir trip, choose a route that includes Srinagar, Gulmarg, and Pahalgam. Short winter trips can focus on Srinagar and Gulmarg.`,
    faqs: [
      {
        question: "Which month is best for snow in Kashmir?",
        answer:
          "January and February usually offer the strongest snow chances, especially in Gulmarg.",
      },
      {
        question: "Is Kashmir good for a summer family trip?",
        answer:
          "Yes. May and June are popular for families because the weather is pleasant and the main routes are active.",
      },
    ],
    relatedPackages: [
      "classic-kashmir-family-tour-5-nights",
      "kashmir-honeymoon-package-6-days",
      "gulmarg-snow-tour-package",
    ],
    internalLinks: [
      {
        label: "Classic Kashmir Family Tour",
        href: "/kashmir-tour-packages/classic-kashmir-family-tour-5-nights",
      },
      {
        label: "Gulmarg Snow Tour Package",
        href: "/kashmir-tour-packages/gulmarg-snow-tour-package",
      },
    ],
    status: "PUBLISHED",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "blog-cost",
    title: "Kashmir Family Trip Cost Guide",
    slug: "kashmir-family-trip-cost-guide",
    seoTitle: "Kashmir Family Trip Cost | Hotels, Cab, Food and Itinerary Budget",
    metaDescription:
      "Understand Kashmir family trip cost by hotel category, cab type, route, travel month, meals, and sightseeing choices.",
    canonicalUrl: null,
    ogImage:
      "https://images.unsplash.com/photo-1581793746485-04698e79a4e8",
    featuredImage:
      "https://images.unsplash.com/photo-1581793746485-04698e79a4e8",
    indexable: true,
    author: "Kashmir Vista Editorial Team",
    content: `## What affects Kashmir trip cost?
The largest cost drivers are hotel category, travel month, cab size, number of nights, and whether the plan includes Gulmarg or Pahalgam overnight stays.

## Practical budget range
A comfortable family package usually starts with 3-star stays, private cab transfers, daily breakfast and dinner, and one houseboat night. Premium hotels, winter snow logistics, and last-minute travel dates increase the quote.

## How to save without hurting the trip
Book early, avoid unnecessary one-night hops, choose a private cab sized correctly for the group, and keep enough time in each destination.`,
    faqs: [
      {
        question: "Is a private cab worth it for a Kashmir family trip?",
        answer:
          "Yes. A private cab gives more control over stops, timing, luggage, and comfort.",
      },
    ],
    relatedPackages: ["classic-kashmir-family-tour-5-nights"],
    internalLinks: [
      {
        label: "Kashmir packages listing",
        href: "/kashmir-tour-packages",
      },
    ],
    status: "PUBLISHED",
    createdAt: now,
    updatedAt: now,
  },
];

export const seedItineraries: ItineraryDownloadItem[] = [
  {
    id: "iti-6-day",
    title: "Free 6-Day Kashmir Itinerary PDF",
    slug: "six-day-kashmir-itinerary",
    seoTitle: "Download Free 6-Day Kashmir Itinerary PDF",
    metaDescription:
      "Get a free 6-day Kashmir itinerary covering Srinagar, Gulmarg, Pahalgam, houseboat stay, cab planning, and sightseeing tips.",
    canonicalUrl: null,
    ogImage:
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d",
    indexable: true,
    destination: "Srinagar, Gulmarg, Pahalgam",
    description:
      "A practical Kashmir route plan for first-time travellers who want a balanced holiday without rushing.",
    pdfUrl: "https://example.com/free-6-day-kashmir-itinerary.pdf",
    leadFormCopy:
      "Share your phone number and get the free Kashmir itinerary download link instantly.",
    faqs: [
      {
        question: "Is the itinerary free?",
        answer:
          "Yes. The download link is shown after the lead form is submitted.",
      },
    ],
    status: "PUBLISHED",
    createdAt: now,
    updatedAt: now,
  },
];
