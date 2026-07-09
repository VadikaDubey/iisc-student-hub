"use client";

import Container from "@/components/container";

const diningHalls = [
  // --- NORTH / NORTH-CENTRAL CAMPUS (Emerald & Amber Themes) ---
  {
    name: "A-Mess",
    location: "North Campus",
    theme: {
      badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
      cardBg: "bg-gradient-to-br from-white to-emerald-50/20 hover:border-emerald-300",
    },
    description:
      "A predominantly vegetarian dining hall catering heavily to traditional South Indian culinary choices, popular among long-term research scholars.",
    amenities: [
      "South Indian Vegetarian",
      "Filtered RO Water",
      "Spacious Handwash Area",
      "Token Biometric System",
      "Indoor Seating",
    ],
  },
  {
    name: "B-Mess",
    location: "North-Central Campus",
    theme: {
      badge: "bg-amber-100 text-amber-800 border-amber-200",
      cardBg: "bg-gradient-to-br from-white to-amber-50/20 hover:border-amber-300",
    },
    description:
      "A versatile composite dining hall renowned for its North Indian menu rotations, offering both vegetarian options and regular non-vegetarian specials.",
    amenities: [
      "North Indian Cuisine",
      "Non-Vegetarian Extras",
      "Sweet/Dessert Counters",
      "Digital Biometric Entry",
      "High-Capacity Indoor Seating",
    ],
  },
  {
    name: "D-Mess",
    location: "North Campus",
    theme: {
      badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
      cardBg: "bg-gradient-to-br from-white to-emerald-50/20 hover:border-emerald-300",
    },
    description:
      "A bustling central dining facility serving a balanced, multi-regional menu structure preferred by postgraduate and undergraduate students alike.",
    amenities: [
      "Mixed Regional Cuisine",
      "Vegetarian & Non-Veg Counters",
      "Special Festival Menus",
      "Filtered Drinking Water",
      "Large Dining Hallways",
    ],
  },

  // --- NORTH-WEST CAMPUS (Purple Theme) ---
  {
    name: "C-Mess",
    location: "North-West Campus",
    theme: {
      badge: "bg-purple-100 text-purple-800 border-purple-200",
      cardBg: "bg-gradient-to-br from-white to-purple-50/20 hover:border-purple-300",
    },
    description:
      "Strategically located near the New Girls Hostel and multi-story blocks, offering modern infrastructure and a wide variety of vegetarian and non-vegetarian menus.",
    amenities: [
      "Multi-Cuisine Options",
      "Modern Food-Heating Counters",
      "Hand Sanitization Hubs",
      "Spacious Modern Layout",
      "Quick-Service Queues",
    ],
  },

  // --- WEST CAMPUS (Indigo Theme) ---
  {
    name: "E-Mess",
    location: "West Campus",
    theme: {
      badge: "bg-indigo-100 text-indigo-800 border-indigo-200",
      cardBg: "bg-gradient-to-br from-white to-indigo-50/20 hover:border-indigo-300",
    },
    description:
      "Located close to the Gymkhana and western hostel blocks, providing nutritious, fitness-friendly dietary schedules for an active student body.",
    amenities: [
      "Balanced Diet Menus",
      "Vegetarian & Non-Veg Options",
      "Proximity to Gymkhana",
      "RO Purified Water",
      "Comfortable Seating Spaces",
    ],
  },
];

export default function DiningHallsPage({
  resources = [],
}) {
  return (
    <Container>
      {/* HERO */}
      <section className="mb-14">
        <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-red-600 px-10 py-10 text-white shadow-xl">
          <h1 className="text-5xl font-extrabold font-serif">
            Dining Halls & Messes
          </h1>

          <p className="mt-3 max-w-3xl text-lg text-orange-100">
            Information regarding campus dining
            facilities, messes, cafeterias, meal
            services, dining support, and useful
            food-related resources.
          </p>
        </div>
      </section>

      {/* SECTION HEADER */}
      <div className="flex items-center gap-6 mb-10">
        <h2 className="text-4xl font-bold text-purple-950 font-serif shrink-0">
          Campus Dining
        </h2>

        <div className="h-px flex-1 bg-purple-200" />
      </div>

        <div className="mb-12 rounded-2xl border border-orange-200 bg-orange-50 px-5 py-4">
            <p className="font-semibold text-orange-900">
                Standard Daily Dining Hours
            </p>

            <p className="mt-1 text-sm text-orange-800">
                Breakfast: 7:30–9:30 AM • Lunch: 12:30–2:30 PM •
                Snacks: 4:30–6:00 PM • Dinner: 7:30–9:30 PM
            </p>
        </div>

      {/* MAIN GRID */}
      <div className="grid gap-10 lg:grid-cols-[3fr_1.15fr]">
        {/* LEFT SIDE */}
        <div>
          <div className="grid gap-6 md:grid-cols-2">
            {diningHalls.map((hall) => (
              <div
                key={hall.name}
                className={`
                  rounded-2xl
                  border border-purple-200
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                  ${hall.theme.cardBg}
                `}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xl font-bold text-purple-950">
                    {hall.name}
                  </h3>

                  <span
                    className={`inline-block rounded px-2 py-0.5 text-[11px] font-semibold shrink-0 uppercase tracking-wider ${hall.theme.badge}`}
                  >
                    {hall.location}
                  </span>
                </div>

                <p className="mt-3 text-purple-700 leading-relaxed text-sm">
                  {hall.description}
                </p>

                <div className="mt-4">
                  <p className="text-xs font-bold text-purple-900 uppercase tracking-wide mb-2">
                    Services & Amenities
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {hall.amenities.map(
                      (amenity) => (
                        <span
                          key={amenity}
                          className="
                            rounded-lg
                            bg-orange-50
                            border border-orange-200/60
                            px-2.5
                            py-1
                            text-xs
                            font-medium
                            text-orange-800
                            shadow-sm
                          "
                        >
                          {amenity}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="flex flex-col gap-6">
          {/* MESS PORTAL */}
          <div className="rounded-3xl bg-gradient-to-br from-orange-600 to-red-700 p-6 text-white shadow-xl">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span>🍽️</span> Dining Portal
            </h3>

            <p className="mt-3 text-sm text-orange-100 leading-relaxed">
              Access mess registrations,
              meal plans, dining schedules,
              and dining-related services.
            </p>

            <a href="https://digits.iisc.ac.in/projects-initiatives/all-portals-logins/" target="_blank" rel="noopener noreferrer">
            <button
              className="
                mt-5
                w-full
                rounded-xl
                bg-white
                px-4
                py-3
                font-semibold
                text-orange-700
                transition
                hover:bg-orange-50
                shadow-md
              "
            >
              Open Portal
            </button>
            </a>
          </div>

          {/* CONTACT */}
          <div className="rounded-3xl bg-orange-50/60 p-6 border border-orange-100/50">
            <h3 className="text-sm font-bold text-orange-900 uppercase tracking-wider flex items-center gap-2 mb-3">
              <span>📞</span> Dining Services
            </h3>

            <div className="space-y-1 text-sm font-medium text-orange-800 pl-1">
              <p>XXX-XXXX-XXXX </p>
              <p className="underline decoration-orange-300">
                Phone Number and Email coming soon
              </p>
            </div>
          </div>

          {/* RESOURCES */}
          <div className="rounded-3xl border border-purple-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-purple-950">
                Resources
              </h3>
            </div>

            <div className="divide-y divide-purple-100">
              {resources.slice(0, 8).map((post) => {
                const targetUrl =
                  post.body?.[0]?.children?.[0]?.text?.trim();

                if (!targetUrl) return null;

                return (
                  <a
                    key={post._id}
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex
                      items-center
                      gap-3
                      py-3.5
                      transition-all
                      duration-200
                      hover:translate-x-1
                      group
                    "
                  >
                    <span className="opacity-70 group-hover:opacity-100 transition-opacity shrink-0">
                      🔗
                    </span>

                    <span className="text-sm font-medium text-purple-900 group-hover:text-purple-950 transition-colors line-clamp-1">
                      {post.title}
                    </span>
                  </a>
                );
              })}

              {resources.length === 0 && (
                <p className="py-4 text-sm text-purple-400 italic">
                  No dining resources found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}