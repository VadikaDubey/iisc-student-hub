"use client";

import { useEffect, useMemo, useState, useRef } from "react";
// Replace this with your actual import path
import questions from "./questions.json"; 

export default function DotWiki() {
  const [search, setSearch] = useState("");
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });
  const containerRef = useRef(null);

  // 1. Track mouse relative to the page (handles scrolling perfectly)
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.pageX, y: e.pageY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Simple seed random helper
  const seededRandom = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // 2. Position dots using absolute pixel values based on a standard sandbox size
  const positionedQuestions = useMemo(() => {
    const placedDots = [];
    const MIN_DISTANCE = 30; // In pixels now! Much easier to control.
    
    // Define a bounding box in pixels where dots can spawn
    const WIDTH = 1400;
    const HEIGHT = 800;
    
    // Avoid spawning dots directly behind the header text/input
    const HEADER_ZONE = {
      left: 450,
      right: 950,
      top: 0,
      bottom: 80,
    };

    return questions.map((question) => {
      let position = null;
      let attempt = 0;

      while (!position && attempt < 1500) {
        // Spawn randomly within our pixel canvas
        const x = seededRandom(question.id * 13 + attempt * 7) * (WIDTH - 300) + 100;
        const y = seededRandom(question.id * 17 + attempt * 11) * (HEIGHT - 100) + 10;

        const insideHeader =
          x > HEADER_ZONE.left &&
          x < HEADER_ZONE.right &&
          y > HEADER_ZONE.top &&
          y < HEADER_ZONE.bottom;

        if (insideHeader) {
          attempt++;
          continue;
        }

        const tooClose = placedDots.some((dot) => {
          const dx = dot.x - x;
          const dy = dot.y - y;
          return Math.sqrt(dx * dx + dy * dy) < MIN_DISTANCE;
        });

        if (tooClose) {
          attempt++;
          continue;
        }

        position = {
          x,
          y,
          drift: seededRandom(question.id * 31) * 8,
        };
        placedDots.push(position);
      }

      return { ...question, position };
    });
  }, []);

  const filteredQuestions = positionedQuestions.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
  );

  const sizeMap = { 5: 28, 4: 22, 3: 18, 2: 14, 1: 10 };

  const rect = containerRef.current?.getBoundingClientRect();

  const canvasX = rect
    ? rect.left + window.scrollX
    : 0;

  const canvasY = rect
    ? rect.top + window.scrollY
    : 0;

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-black text-white pb-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)] pointer-events-none" />

      {/* Header Section */}
      <section className="relative z-20 flex flex-col items-center pt-20 pointer-events-auto">
        <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
          DotWiki Q&A
        </h1>
        <p className="mt-4 max-w-xl px-6 text-center text-zinc-400">
          Useful things you didn't know you needed.
        </p>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search DotWiki..."
          className="mt-8 w-full max-w-md rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur outline-none focus:border-white/30 transition-all text-center"
        />
      </section>

      {/* Physics Canvas Area */}
      <div 
        ref={containerRef} 
        className="relative mx-auto max-w-[1400px] h-[800px] mt-10 structural-canvas"
      >
        
        {filteredQuestions.map((item) => {
          if (!item.position) return null;

          const { position } = item;

          // Relative mouse position within our explicit pixel grid
          const mouseX = mouse.x - canvasX;
          const mouseY = mouse.y - canvasY;

          const dx = mouseX - position.x;
          const dy = mouseY - position.y; 
          const distance = Math.sqrt((mouseX - position.x) ** 2 + (mouseY - position.y) ** 2);

          // 3. Adjusted Radii (since we are using true pixels now!)
          const ATTRACT_RADIUS = 20;
          const REPEL_RADIUS = 150;

          let offsetX = 0;
          let offsetY = 0;

          if (distance > 0) {
            if (distance < ATTRACT_RADIUS) {
              // Smooth pull towards cursor
              const attractStrength = (ATTRACT_RADIUS - distance) * 0.4;
              offsetX = (dx / distance) * attractStrength;
              offsetY = (dy / distance) * attractStrength;
            } else if (distance < REPEL_RADIUS) {
              // Smooth push away from cursor
              const t =
                Math.max(
                  0,
                  (REPEL_RADIUS - distance) /
                    REPEL_RADIUS
                );

              const repelStrength =
                Math.pow(t, 2) * 40;
              offsetX = -(dx / distance) * repelStrength;
              offsetY = -(dy / distance) * repelStrength;
            }
          }

          const MAX_OFFSET = 24;

          offsetX = Math.max(
            -MAX_OFFSET,
            Math.min(MAX_OFFSET, offsetX)
          );

          offsetY = Math.max(
            -MAX_OFFSET,
            Math.min(MAX_OFFSET, offsetY)
          );

          const finalX = position.x + offsetX;
          const finalY = position.y + offsetY;

          return (
            <div
              key={item.id}
              className="
                group
                absolute
                left-0
                top-0
                will-change-transform
                transition-transform
                duration-150
              "
              style={{
                // 4. Using pure translate3d for buttery-smooth performance without layout thrashing
                transform: `translate3d(${finalX}px, ${finalY}px, 0)`,
              }}
            >
              {/* Floating Animation Element */}
              <div
                className="relative"
                style={{
                  animation: `float ${5 + position.drift}s ease-in-out infinite`,
                }}
              >
                {/* Dot */}
                <div
                  className="
                    rounded-full
                    bg-white/60
                    cursor-pointer
                    transition-all
                    duration-300
                    group-hover:scale-150
                    group-hover:bg-white
                    group-hover:shadow-[0_0_15px_rgba(255,255,255,0.7)]
                  "
                  style={{
                    width: `${sizeMap[item.importance] || 18}px`,
                    height: `${sizeMap[item.importance] || 18}px`,
                  }}
                />

                {/* Tooltip Card */}
                <div
                  className="
                    absolute
                    left-1/2
                    bottom-full
                    mb-4
                    pointer-events-none
                    opacity-0
                    scale-95
                    w-80
                    -translate-x-1/2
                    rounded-2xl
                    border
                    border-white/10
                    bg-zinc-950/95
                    p-4
                    shadow-[0_20px_50px_rgba(0,0,0,0.8)]
                    backdrop-blur-xl
                    transition-all
                    duration-200
                    group-hover:opacity-100
                    group-hover:scale-100
                    group-hover:pointer-events-auto
                    z-50
                  "
                >
                  <h3 className="mb-2 text-sm font-semibold text-white">
                    {item.question}
                  </h3>
                  <p className="text-xs leading-relaxed text-zinc-400">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </main>
  );
}



