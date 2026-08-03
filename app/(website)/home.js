"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Container from "@/components/container";

const colors = [
  "from-violet-500 to-violet-600",
  "from-orange-500 to-red-500",
  "from-emerald-400 to-emerald-500",
  "from-sky-500 to-sky-600",
  "from-yellow-400 to-yellow-500",
  "from-pink-500 to-pink-600",
];

export default function HomePage({ 
  posts,
  importantLinks
 }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const trackRef = useRef(null);
  const ticking = useRef(false);
  const quickLinks = [
    {
      title: "Campus Map",
      href: "/explore",
      emoji: "🗺️",
      description: "Navigate the IISc campus and explore key locations.",
    },
    {
      title: "Resources", 
      href: "/resources",
      emoji: "🔗",
      description: "Important student links, portals, and useful tools.",
    },
    {
      title: "Contact & About",
      href: "/contact",
      emoji: "📞",
      description: "Any feedback for the site? Reach out to us here.",
    },
  ];

  useEffect(() => {
      const handleScroll = () => {
      if (!trackRef.current) return;
      if (ticking.current) return;

      ticking.current = true;

      requestAnimationFrame(() => {
        const rect = trackRef.current.getBoundingClientRect();

        const progress =
          -rect.top / (rect.height - window.innerHeight);

        const clampedProgress = Math.min(
          Math.max(progress, 0),
          1
        );

        setScrollProgress(clampedProgress);

        ticking.current = false;
    });
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
  }, []);

  const translateXValue = -(scrollProgress * 65);

  const introOpacity = Math.max(
    0,
    1 - scrollProgress * 2
  );

  const gridOpacity = Math.min(
    1,
    Math.max(0, (scrollProgress - 0.1) * 3)
  );

  return (
    <Container>
      {/* HERO */}
      <div className="min-h-[90vh] flex flex-col justify-start items-center pt-6">
        <section
          className="w-full min-h-[360px] [perspective:1000px] cursor-pointer select-none transition-all duration-300 rounded-3xl shadow-xl shadow-purple-200/50 hover:shadow-2xl hover:shadow-purple-300/60 hover:scale-[1.015]"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            className={`relative w-full h-full min-h-[360px] duration-700 [transform-style:preserve-3d] transition-transform ${
              isFlipped
                ? "[transform:rotateY(180deg)]"
                : ""
            }`}
          >
            {/* FRONT */}
            <div className="absolute inset-0 w-full h-full rounded-3xl bg-purple-50 px-12 py-20 text-purple-950 border border-purple-100 bg-[url('https://www.transparenttextures.com/patterns/flames.png')] bg-repeat [backface-visibility:hidden] flex flex-col justify-center">
              <h1 className="text-5xl font-extrabold tracking-tight font-serif">
                SITE STILL UNDER CONSTRUCTION, SOME INFORMATION MAY NOT BE ACCURATE OR UP TO DATE. USE AT YOUR OWN RISK.
              </h1>

              <p className="mt-4 max-w-2xl text-xl text-purple-700/80">
                An unofficial one-stop Student Hub for
                links and information regarding the IISc
                campus, all in one place. Particularly for undergraduate students.
              </p>

              <p className="mt-6 text-sm text-purple-500">
                Click anywhere on this card to flip
              </p>
            </div>

            {/* BACK */}
            <div className="absolute inset-0 w-full h-full rounded-3xl bg-purple-950 px-12 py-20 text-purple-50 border border-purple-800 bg-[url('https://www.transparenttextures.com/patterns/flames.png')] bg-repeat [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center">
              <h2 className="text-4xl font-extrabold tracking-tight font-serif text-purple-200">
                About IISc University
              </h2>

              <p className="mt-4 max-w-2xl text-lg text-purple-200/80 leading-relaxed">
                The Indian Institute of Science (IISc) is a
                premier public university for scientific
                research and higher education located in
                Bengaluru.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-10 text-purple-500 animate-bounce text-sm font-medium">
          ↓ Scroll to explore
        </div>

      </div>

      <div>
        <p>
          Warning: This site is currently optimised for desktop only. Some features may not work properly on mobile devices.
        </p>
      </div>

      {/* HORIZONTAL SECTION */}
      <div
        ref={trackRef}
        className="relative w-full h-[250vh]"
      >
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <div
            className="flex items-center gap-24 will-change-transform"
            style={{
              transform: `translate3d(${translateXValue}vw, 0, 0)`,
            }}
          >
            {/* TITLE PANEL */}
            <div
              className="w-[80vw] shrink-0 pl-4 transition-opacity duration-300"
              style={{
                opacity: introOpacity,
              }}
            >
              <h2 className="text-7xl font-black tracking-tight text-purple-950 font-serif">
                Explore IISc →
              </h2>

              <p className="text-xl text-purple-600 mt-2">
                Keep scrolling down
              </p>
            </div>

            {/* GRID PANEL */}
            <div
              className="w-[85vw] shrink-0 pr-8 transition-opacity duration-300"
              style={{
                opacity: gridOpacity,
              }}
            >
              <div className="relative w-80 h-80 flex items-center justify-center border border-red-500">
                <h2 className="absolute top-1/3 left-1/10 text-4xl font-bold text-purple-950 font-serif z-10">
                  Explore the Hub
                </h2>

                {/* Top */}
                <Link
                  href="#resources"
                  className="absolute top-0 left-0 -translate-x-1/2 w-24 h-24 rounded-full bg-purple-200 hover:bg-purple-300 flex items-center justify-center text-center"
                >
                  Resources
                </Link>

                {/* Right */}
                <Link
                  href="#hostels"
                  className="absolute right-20 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-purple-200 hover:bg-purple-300 flex items-center justify-center text-center"
                >
                  Hostels
                </Link>

                {/* Bottom Right */}
                <Link
                  href="#clubs"
                  className="absolute bottom-6 right-40 w-24 h-24 rounded-full bg-purple-200 hover:bg-purple-300 flex items-center justify-center text-center"
                >
                  Clubs
                </Link>

                {/* Bottom Left */}
                <Link
                  href="#academics"
                  className="absolute bottom-6 left-40 w-24 h-24 rounded-full bg-purple-200 hover:bg-purple-300 flex items-center justify-center text-center"
                >
                  Academics
                </Link>

                {/* Left */}
                <Link
                  href="#faq"
                  className="absolute left-20 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-purple-200 hover:bg-purple-300 flex items-center justify-center text-center"
                >
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK NAVIGATION */}
      <section className="w-full py-8">
        <div className="flex items-center gap-6 mb-12">
          <h2 className="text-4xl font-bold text-purple-950 font-serif shrink-0">
            Quick Navigation
          </h2>

          <div className="h-px flex-1 bg-purple-200" />
        </div>

        <div className="grid gap-12 lg:grid-cols-[3fr_1.15fr]">
          {/* NAVIGATION CARDS */}
          <div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {quickLinks.map((link, index) => {
                const color = colors[index % colors.length];

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group rounded-3xl bg-gradient-to-br ${color} p-8 text-white transition-all duration-300 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-2xl`}
                  >
                    <div className="mb-6 text-5xl transition-transform duration-300 group-hover:scale-110">
                      {link.emoji}
                    </div>

                    <h3 className="text-2xl font-bold">
                      {link.title}
                    </h3>

                    <p className="mt-2 text-base text-white/80">
                      {link.description}
                    </p>

                    <div className="mt-6 font-medium text-white/90">
                      Explore →
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* IMPORTANT LINKS */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-purple-950">
                Important Links
              </h3>

              <Link
                href="/resources"
                className="text-sm font-medium text-purple-600 transition hover:text-purple-800"
              >
                View All →
              </Link>
            </div>

            <div className="border-t border-purple-200 flex-1">
              {importantLinks.slice(0, 8).map((post) => {
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
                      group
                      relative
                      flex items-center gap-3
                      border-b border-purple-200
                      py-4 pl-0
                      transition-all duration-200
                      hover:translate-x-1
                    "
                  >
                    <span
                      className="
                        absolute left-0 top-0 h-full w-0
                        bg-purple-500
                        transition-all duration-200
                        group-hover:w-1
                      "
                    />

                    <span className="text-lg transition-transform duration-200 group-hover:translate-x-1">
                      🔗
                    </span>

                    <span className="line-clamp-2 text-sm font-medium text-purple-900 group-hover:text-purple-700">
                      {post.title}
                    </span>
                  </a>
                );
              })}

              {importantLinks.length === 0 && (
                <p className="py-4 text-sm text-purple-500">
                  No important links found.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CAMPUS MAGAZINES */}
      <section className="mt-32">
        <div className="flex items-center gap-6 mb-12">
          <h2 className="text-4xl font-bold text-purple-950 font-serif shrink-0">
            Campus Magazines
          </h2>

          <div className="h-px flex-1 bg-purple-200" />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <a
            href="https://connect.iisc.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              rounded-3xl
              border border-purple-200
              bg-white
              p-8
              min-h-[260px]
              transition-all duration-300
              hover:-translate-y-2
              hover:border-purple-300
              hover:shadow-xl
            "
          >
            <div className="mb-5 text-5xl">
              📰
            </div>

            <h3 className="text-2xl font-bold text-purple-950">
              Connect
            </h3>

            <p className="mt-3 text-purple-700 leading-relaxed">
              IISc's student magazine featuring campus news,
              student stories, interviews, events, opinions,
              and life around the institute.
            </p>

            <div className="mt-8 font-medium text-purple-600">
              Read Magazine →
            </div>
          </a>

          <a
            href="https://kernel.iisc.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              rounded-3xl
              border border-purple-200
              bg-white
              p-8
              min-h-[260px]
              transition-all duration-300
              hover:-translate-y-2
              hover:border-purple-300
              hover:shadow-xl
            "
          >
            <div className="mb-5 text-5xl">
              📚
            </div>

            <h3 className="text-2xl font-bold text-purple-950">
              Kernel
            </h3>

            <p className="mt-3 text-purple-700 leading-relaxed">
              IISc's science and research publication showcasing
              discoveries, ideas, scientific writing, and academic
              perspectives from across campus.
            </p>

            <div className="mt-8 font-medium text-purple-600">
              Read Magazine →
            </div>
          </a>
        </div>
      </section>
    </Container>
  );
}