import Link from "next/link";
import { getPostsByCategory, getAllPosts } from "@/lib/sanity/client";

export default async function Resources() {
  // Fetch posts from the "resources" category
  let categoryData = await getPostsByCategory("resources");

  let posts = [];

  if (Array.isArray(categoryData)) {
    posts = categoryData;
  } else if (categoryData && Array.isArray(categoryData.posts)) {
    posts = categoryData.posts;
  } else if (categoryData && typeof categoryData === "object") {
    const foundArray = Object.values(categoryData).find((val) =>
      Array.isArray(val)
    );
    if (foundArray) posts = foundArray;
  }

  // Fallback: manually filter all posts if the category query fails
  if (posts.length === 0) {
    const allPosts = await getAllPosts();

    posts = allPosts.filter((post) => {
      const matchSlug = post.categories?.some(
        (cat) =>
          cat.slug?.current === "resources" ||
          cat.slug === "resources"
      );

      const matchDirect =
        post.category === "resources" ||
        post.category?.slug?.current === "resources";

      return matchSlug || matchDirect;
    });
  }

  // Group resource posts by their OTHER category slug
  const groupedPosts = {
    "Important Links": [],
    "Housing, Amenities, & Dining Links": [],
    "Club Links": [],
    "Other Links": [],
  };

  posts.forEach((post) => {
    const categorySlugs =
      post.categories?.map((cat) => cat.slug?.current || cat.slug) || [];

    const extraSlugs = categorySlugs.filter(
      (slug) => slug && slug !== "resources"
    );

    if (extraSlugs.includes("important-links")) {
      groupedPosts["Important Links"].push(post);
    } else if (
      extraSlugs.includes("housing-amenities-and-dining-links")
    ) {
      groupedPosts["Housing, Amenities, & Dining Links"].push(post);
    } else if (extraSlugs.includes("club-links")) {
      groupedPosts["Club Links"].push(post);
    } else {
      groupedPosts["Other Links"].push(post);
    }
  });

  const sectionOrder = [
    "Important Links",
    "Housing, Amenities, & Dining Links",
    "Club Links",
    "Other Links",
  ];

  return (
    <>
      {posts.length === 0 ? (
        <div className="flex h-40 items-center justify-center border border-dashed rounded-xl border-gray-300 dark:border-gray-700">
          <span className="text-lg text-gray-500">
            No resource entries matching the "resources" category found yet!
            Check Sanity to ensure a post has this category assigned.
          </span>
        </div>
      ) : (
        <div className="mt-10 max-w-4xl mx-auto w-full space-y-6">
          {sectionOrder.map((sectionName) => {
            const sectionPosts = groupedPosts[sectionName];

            if (sectionPosts.length === 0) return null;

            return (
              <details
                key={sectionName}
                open
                className="overflow-hidden rounded-2xl border border-gray-200 dark:border-zinc-800"
              >
                <summary className="cursor-pointer select-none px-6 py-4 text-lg font-bold bg-gray-50 dark:bg-zinc-900 dark:text-white">
                  {sectionName} ({sectionPosts.length})
                </summary>

                <div className="p-4 flex flex-col gap-4">
                  {sectionPosts.map((post) => {
                    const slug = post.slug?.current || "";

                    const targetUrl =
                      post.body?.[0]?.children?.[0]?.text?.trim() ||
                      `/resources/${slug}`;

                    const isExternal = targetUrl.startsWith("http");

                    return (
                      <Link
                        key={post._id}
                        href={targetUrl}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="group flex flex-col sm:flex-row sm:items-center gap-4 p-6 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md hover:border-purple-200 dark:hover:border-purple-900/50"
                      >
                        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-50 dark:bg-purple-950/30 text-2xl shrink-0 transition-transform duration-200 group-hover:scale-110">
                          🔗
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors duration-200">
                            {post.title}
                          </h3>

                          {post.excerpt && (
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                              {post.excerpt}
                            </p>
                          )}
                        </div>

                        <div className="hidden sm:block text-gray-400 group-hover:text-purple-600 transition-transform duration-200 group-hover:translate-x-1 px-2">
                          ↗
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </details>
            );
          })}
        </div>
      )}
    </>
  );
}