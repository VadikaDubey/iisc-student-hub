import PostList from "@/components/postlist";
import { getPostsByCategory, getAllPosts } from "@/lib/sanity/client";
import Link from "next/link";

const colors = [
  "from-violet-500 to-violet-600",
  "from-orange-500 to-red-500",
  "from-emerald-400 to-emerald-500",
  "from-sky-500 to-sky-600",
  "from-yellow-400 to-yellow-500",
  "from-pink-500 to-pink-600",
];

export default async function Explore() {
  // 1. Fetch data from your category helper
  const categoryData = await getPostsByCategory("hostels");

  const quickLinks = [
    {
      title: "Hostels",
      href: "/hostels",
      emoji: "🏨",
      description: "Explore student housing options, amenities, and resources on campus.",
    },
    {
      title: "Dining Halls", 
      href: "/dining-halls",
      emoji: "🍽️",
      description: "Explore various dining options on campus.",
    }
  ];
  
  // 2. Extract posts safely whether categoryData is an array, an object, or contains an inner array
  let posts = [];
  if (Array.isArray(categoryData)) {
    posts = categoryData;
  } else if (categoryData && Array.isArray(categoryData.posts)) {
    posts = categoryData.posts;
  } else if (categoryData && typeof categoryData === "object") {
    // If it's wrapped in another property name, grab the first array found
    const foundArray = Object.values(categoryData).find(val => Array.isArray(val));
    if (foundArray) posts = foundArray;
  }

  // 3. 🚨 BULLETPROOF FALLBACK: If the template's custom query is failing,
  // we fetch all posts and filter them directly via code to get you unblocked immediately!
  if (posts.length === 0) {
    const allPosts = await getAllPosts();
    posts = allPosts.filter(post => {
      // Check if any of the post's categories match "hostels" or "hostel"
      const matchSlug = post.categories?.some(cat => 
        cat.slug?.current === "hostels" || cat.slug === "hostels" || cat.title?.toLowerCase() === "hostels"
      );
      const matchDirect = post.category === "hostels" || post.category?.slug?.current === "hostels";
      return matchSlug || matchDirect;
    });
  }

  return (
    <div className="mt-8 space-y-12">
      
      {/* 🗺️ GENIALLY INTERACTIVE IISc MAP EMBED */}
      <div className="w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg">
        <div style={{ width: "100%" }}>
          <div style={{ position: "relative", paddingBottom: "140.96%", paddingTop: 0, height: 0 }}>
            <iframe 
              title="IISc Map" 
              frameBorder="0" 
              width="857" 
              height="1208" 
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} 
              src="https://view.genially.com/6a49fb4dec68e78d37bd5684" 
              type="text/html" 
              allowScriptAccess="always" 
              allowFullScreen={true} 
              scrolling="yes" 
              allowNetworking="all"
            />
          </div> 
        </div>
      </div>

      {/* QUICK NAVIGATION */}
      <section className="w-full py-4">
        <div className="flex items-center gap-6 mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-purple-950 font-serif shrink-0">
            Quick Navigation
          </h2>
          <div className="h-px flex-1 bg-purple-200" />
        </div>

        {/* Updated Grid System: Uses the full page width cleanly */}
        <div className="grid gap-6 md:grid-cols-2 max-w-5xl">
          {quickLinks.map((link, index) => {
            const color = colors[index % colors.length];

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex flex-col justify-between rounded-2xl bg-gradient-to-br ${color} p-6 sm:p-8 text-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
              >
                <div>
                  <div className="mb-4 text-4xl sm:text-5xl transition-transform duration-300 group-hover:scale-110 origin-left">
                    {link.emoji}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                    {link.title}
                  </h3>

                  <p className="mt-2 text-sm sm:text-base text-white/85 leading-relaxed">
                    {link.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center font-semibold text-sm sm:text-base text-white group-hover:translate-x-1 transition-transform duration-200">
                  Explore <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}