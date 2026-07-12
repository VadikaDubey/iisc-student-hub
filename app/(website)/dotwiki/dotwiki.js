"use client";

import { useEffect, useMemo, useState } from "react";
import questions from "./questions.json";

export default function DotWiki() {
const [search, setSearch] = useState("");
const [mouse, setMouse] = useState({ x: -9999, y: -9999 });

useEffect(() => {
const handleMouseMove = (e) => {
setMouse({
x: e.clientX,
y: e.clientY,
});
};


window.addEventListener("mousemove", handleMouseMove);

return () => {
  window.removeEventListener("mousemove", handleMouseMove);
};


}, []);

const seededRandom = (seed) => {
const x = Math.sin(seed) * 10000;
return x - Math.floor(x);
};

const positionedQuestions = useMemo(() => {
const placedDots = [];


const MIN_DISTANCE = 8;

const HEADER_ZONE = {
  left: 5,
  right: 95,
  top: 0,
  bottom: 23,
};

return questions.map((question) => {
  let position = null;
  let attempt = 0;

  while (!position && attempt < 500) {
    const x =
      seededRandom(question.id * 13 + attempt * 7) * 90 + 5;

    const y =
      seededRandom(question.id * 17 + attempt * 11) * 70 + 20;

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

      return (
        Math.sqrt(dx * dx + dy * dy) < MIN_DISTANCE
      );
    });

    if (tooClose) {
      attempt++;
      continue;
    }

    position = {
      x,
      y,
      drift:
        seededRandom(question.id * 31) * 8,
    };

    placedDots.push(position);
  }

  return {
    ...question,
    position,
  };
});


}, []);

const filteredQuestions = positionedQuestions.filter(
(item) =>
item.question
.toLowerCase()
.includes(search.toLowerCase()) ||
item.answer
.toLowerCase()
.includes(search.toLowerCase())
);

const sizeMap = {
5: 28,
4: 22,
3: 18,
2: 14,
1: 10,
};

return ( <main className="relative min-h-[200vh] overflow-hidden bg-black text-white"> <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />


  <section className="relative z-20 flex flex-col items-center pt-20">
    <h1 className="text-5xl font-bold">
      DotWiki Q&amp;A
    </h1>

    <p className="mt-4 max-w-xl px-6 text-center text-zinc-400">
      Useful things you didn't know you needed.
    </p>

    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search DotWiki..."
      className="
        mt-8
        w-full
        max-w-md
        rounded-xl
        border
        border-white/10
        bg-white/5
        px-4
        py-3
        backdrop-blur
        outline-none
      "
    />
  </section>

  <div className="absolute inset-0">
    {filteredQuestions.map((item) => {
      if (!item.position) return null;

      const { position } = item;

      const mouseX =
        typeof window !== "undefined"
          ? (mouse.x / window.innerWidth) * 100
          : 0;

      const mouseY =
        typeof window !== "undefined"
          ? (mouse.y / window.innerHeight) * 100
          : 0;

      const dx = position.x - mouseX;
      const dy = position.y - mouseY;

      const distance = Math.sqrt(
        dx * dx + dy * dy
      );

      const repel = Math.max(
        0,
        18 - distance
      );

      const offsetX =
        distance > 0
          ? (dx / distance) * repel
          : 0;

      const offsetY =
        distance > 0
          ? (dy / distance) * repel
          : 0;

      return (
        <div
          key={item.id}
          className="group absolute"
          style={{
            left: `calc(${position.x}% + ${offsetX}px)`,
            top: `calc(${position.y}% + ${offsetY}px)`,
            animation: `float ${5 + position.drift}s ease-in-out infinite`,
          }}
        >
          <div
            className="
              rounded-full
              bg-white/70
              cursor-pointer
              transition-all
              duration-300
              group-hover:scale-150
              group-hover:bg-white
            "
            style={{
              width: `${sizeMap[item.importance] || 18}px`,
              height: `${sizeMap[item.importance] || 18}px`,
            }}
          />

          <div
            className="
              absolute
              left-1/2
              top-1/2
              hidden
              w-80
              -translate-x-1/2
              -translate-y-1/2
              rounded-2xl
              border
              border-white/10
              bg-zinc-900/95
              p-4
              shadow-2xl
              backdrop-blur-xl
              group-hover:block
              z-50
            "
          >
            <h3 className="mb-2 text-sm font-semibold">
              {item.question}
            </h3>

            <p className="text-xs leading-relaxed text-zinc-300">
              {item.answer}
            </p>
          </div>
        </div>
      );
    })}
  </div>

  <style jsx>{`
    @keyframes float {
      0% {
        transform: translateY(0px);
      }

      50% {
        transform: translateY(-10px);
      }

      100% {
        transform: translateY(0px);
      }
    }
  `}</style>
</main>


);
}


