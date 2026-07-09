"use client";

import Container from "@/components/container";

const hostels = [
  // --- NORTH CAMPUS (Emerald Theme) ---
  {
    name: "E-Block (Heritage Block)",
    location: "North Campus",
    theme: {
      badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
      cardBg: "bg-gradient-to-br from-white to-emerald-50/20 hover:border-emerald-300",
    },
    description:
      "The oldest standing two-story hostel block on campus; it features a long-corridor structure with a cozy, tight-knit student community primarily housing senior research scholars.",
    residents: "~150 to 200 Research Scholars",
    amenities: [
      "WiFi",
      "Central reading room",
      "Shared common TV lounge",
      "Proximity to mess",
      "Bike parking",
      "Courtyard sit-out spaces"
    ],
  },

  // --- NORTH-CENTRAL CAMPUS (Amber Theme) ---
  {
    name: "A-Block",
    location: "North-Central Campus",
    theme: {
      badge: "bg-amber-100 text-amber-800 border-amber-200",
      cardBg: "bg-gradient-to-br from-white to-amber-50/20 hover:border-amber-300",
    },
    description:
      "Highly sought-after by students due to its airy rooms, personal balconies, and vibrant social culture, primarily catering to late-stage M.Tech and Ph.D. research scholars.",
    residents: "~250 to 300 Postgraduates & PhDs",
    amenities: [
      "WiFi",
      "LAN",
      "Personal balconies",
      "Shared laundry facilities",
      "Reading room",
      "Courtyard badminton court"
    ],
  },
  {
    name: "B-Block",
    location: "North-Central Campus",
    theme: {
      badge: "bg-amber-100 text-amber-800 border-amber-200",
      cardBg: "bg-gradient-to-br from-white to-amber-50/20 hover:border-amber-300",
    },
    description:
      "A historic block sharing a similarly green courtyard layout to A-Block, offering spacious single-occupancy rooms and a calm environment for senior postgraduates.",
    residents: "~200 to 250 Postgraduates",
    amenities: [
      "WiFi",
      "Shared common room",
      "Indoor carrom & chess",
      "Study lounge",
      "Centralized water coolers"
    ],
  },

  // --- WEST CAMPUS (Indigo Theme) ---
  {
    name: "S-Block",
    location: "West Campus",
    theme: {
      badge: "bg-indigo-100 text-indigo-800 border-indigo-200",
      cardBg: "bg-gradient-to-br from-white to-indigo-50/20 hover:border-indigo-300",
    },
    description:
      "A smaller, low-rise residential block with a quiet, relaxed atmosphere, frequently used to accommodate early-year undergraduate batches.",
    residents: "~150 to 180 Undergraduate Students",
    amenities: [
      "WiFi",
      "Internal common sitting area",
      "Water purifiers",
      "Access to West Campus eateries"
    ],
  },
  {
    name: "U-Block",
    location: "West Campus",
    theme: {
      badge: "bg-indigo-100 text-indigo-800 border-indigo-200",
      cardBg: "bg-gradient-to-br from-white to-indigo-50/20 hover:border-indigo-300",
    },
    description:
      "Primarily accommodates newer undergraduate and master's students, offering functional modern living spaces with quick access to central academic pathways.",
    residents: "~250 Undergraduate & Master's Students",
    amenities: [
      "WiFi",
      "Study lounges on floors",
      "Indoor games room",
      "Direct access to composite messes"
    ],
  },
  {
    name: "Rohini Block",
    location: "West Campus",
    theme: {
      badge: "bg-indigo-100 text-indigo-800 border-indigo-200",
      cardBg: "bg-gradient-to-br from-white to-indigo-50/20 hover:border-indigo-300",
    },
    description:
      "A prime residential spot for sports enthusiasts, offering research scholars immediate access to the greenest athletic hubs and running tracks on campus.",
    residents: "~200 Research Scholars",
    amenities: [
      "WiFi",
      "LAN",
      "Reading room",
      "Immediate Gymkhana & gym access",
      "Athletics track proximity",
      "Central recreation TV room"
    ],
  },
  {
    name: "Ashwini Block",
    location: "West Campus",
    theme: {
      badge: "bg-indigo-100 text-indigo-800 border-indigo-200",
      cardBg: "bg-gradient-to-br from-white to-indigo-50/20 hover:border-indigo-300",
    },
    description:
      "A companion block to Rohini, housing active postgraduate students who balance long laboratory hours with close proximity to fitness infrastructure and evening cafes.",
    residents: "~200 Postgraduates & PhDs",
    amenities: [
      "WiFi",
      "LAN",
      "Study areas",
      "Bicycle parking zones",
      "Walking routes to evening cafes"
    ],
  },

  // --- NORTH-WEST CAMPUS (Purple Theme) ---
  {
    name: "New Girls Hostel (NGH) Tower",
    location: "North-West Campus",
    theme: {
      badge: "bg-purple-100 text-purple-800 border-purple-200",
      cardBg: "bg-gradient-to-br from-white to-purple-50/20 hover:border-purple-300",
    },
    description:
      "A premier high-rise residential tower dedicated to female master's and Ph.D. scholars, offering an active, secure, and modern community layout.",
    residents: "~500 to 600 Female Research Scholars",
    amenities: [
      "WiFi",
      "LAN",
      "24/7 Security desk",
      "Multi-floor study lounges",
      "Modern laundry utility room",
      "Indoor table tennis"
    ],
  },
  {
    name: "New Boys Hostel (NBH) / SD Block",
    location: "North-West Campus",
    theme: {
      badge: "bg-purple-100 text-purple-800 border-purple-200",
      cardBg: "bg-gradient-to-br from-white to-purple-50/20 hover:border-purple-300",
    },
    description:
      "A massive, modern multi-story complex housing a diverse mix of junior M.Tech and Ph.D. scholars, defined by its high-density student communities and structured study zones.",
    residents: "~600+ Postgraduates & PhDs",
    amenities: [
      "WiFi",
      "Spacious common room",
      "Indoor recreation area",
      "Multi-floor study lounges",
      "In-house laundry facilities",
      "Elevator systems"
    ],
  },

  // --- CENTRAL-EAST CAMPUS (Slate Theme) ---
  {
    name: "Aryabhata Apartments",
    location: "Central-East Campus",
    theme: {
      badge: "bg-slate-100 text-slate-800 border-slate-200",
      cardBg: "bg-gradient-to-br from-white to-slate-50/20 hover:border-slate-300",
    },
    description:
      "A specialized residential block tailored exclusively for married Ph.D. scholars and post-doctoral fellows, providing a quiet, family-friendly neighborhood layout.",
    residents: "~150 to 200 Married Units",
    amenities: [
      "Dedicated apartment WiFi",
      "Intercom system",
      "Attached independent kitchens",
      "Private balconies",
      "Children's play area",
      "Proximity to health center"
    ],
  },
];

export default function HostelsPage({
  resources = [],
}) {
  return (
    <Container>
      {/* HERO */}
      <section className="mb-14">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-blue-800 px-10 py-10 text-white shadow-xl">
          <h1 className="text-5xl font-extrabold font-serif">
            Hostels & Amenities
          </h1>

          <p className="mt-3 max-w-3xl text-lg text-blue-100">
            Information regarding student housing,
            hostel amenities, maintenance support,
            accommodation resources, and useful
            housing-related links.
          </p>
        </div>
      </section>

      {/* SECTION HEADER */}
      <div className="flex items-center gap-6 mb-10">
        <h2 className="text-4xl font-bold text-purple-950 font-serif shrink-0">
          Campus Housing
        </h2>

        <div className="h-px flex-1 bg-purple-200" />
      </div>

      {/* MAIN GRID */}
      <div className="grid gap-10 lg:grid-cols-[3fr_1.15fr]">
        {/* LEFT SIDE: HOSTELS */}
        <div>
          <div className="grid gap-6 md:grid-cols-2">
            {hostels.map((hostel) => (
              <div
                key={hostel.name}
                className={`
                  rounded-2xl
                  border border-purple-200
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                  ${hostel.theme.cardBg}
                `}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xl font-bold text-purple-950">
                    {hostel.name}
                  </h3>
                  
                  {/* Location Badge */}
                  <span className={`inline-block rounded px-2 py-0.5 text-[11px] font-semibold shrink-0 uppercase tracking-wider ${hostel.theme.badge}`}>
                    {hostel.location}
                  </span>
                </div>

                <p className="mt-3 text-purple-700 leading-relaxed text-sm">
                  {hostel.description}
                </p>

                <div className="mt-4">
                  <p className="text-xs font-bold text-purple-900 uppercase tracking-wide">
                    Residents
                  </p>

                  <p className="mt-0.5 text-sm text-purple-700">
                    {hostel.residents}
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-bold text-purple-900 uppercase tracking-wide mb-2">
                    Amenities
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {hostel.amenities.map(
                      (amenity) => (
                        <span
                          key={amenity}
                          className="
                            rounded-lg
                            bg-emerald-50
                            border border-emerald-200/60
                            px-2.5
                            py-1
                            text-xs
                            font-medium
                            text-emerald-800
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
          
          {/* HOUSING PORTAL */}
          <div className="rounded-3xl bg-gradient-to-br from-purple-900 to-indigo-950 p-6 text-white shadow-xl">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span>🏠</span> Housing Portal
            </h3>

            <p className="mt-3 text-sm text-purple-200 leading-relaxed">
              Access accommodation information,
              room allocations, and housing-related
              services.
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
                text-purple-950
                transition
                hover:bg-purple-50
                shadow-md
              "
            >
              Open Portal
            </button>
            </a>
          </div>

          {/* CONTACT */}
          <div className="rounded-3xl bg-purple-50/60 p-6 border border-purple-100/50">
            <h3 className="text-sm font-bold text-purple-900 uppercase tracking-wider flex items-center gap-2 mb-3">
              <span>📞</span> Housing Services
            </h3>

            <div className="space-y-1 text-sm font-medium text-purple-800 pl-1">
              <p>XXX-XXXX-XXXX </p>
              <p className="underline decoration-purple-300">Phone Number and Email coming soon</p>
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
                    <span className="opacity-70 group-hover:opacity-100 transition-opacity shrink-0">🔗</span>

                    <span className="text-sm font-medium text-purple-900 group-hover:text-purple-950 transition-colors line-clamp-1">
                      {post.title}
                    </span>
                  </a>
                );
              })}

              {resources.length === 0 && (
                <p className="py-4 text-sm text-purple-400 italic">
                  No housing resources found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}