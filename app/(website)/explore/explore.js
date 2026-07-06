import PostList from "@/components/postlist";
import { getPostsByCategory, getAllPosts } from "@/lib/sanity/client";

export default async function Explore() {
  // 1. Fetch data from your category helper
  const categoryData = await getPostsByCategory("hostels");
  
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
    <div className="mt-8 space-y-10">
      
      {/* 🗺️ GENIALLY INTERACTIVE IISc MAP EMBED */}
      <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-md">
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

      {/* 📂 GRID DISPLAY OF HOSTEL POSTS */}
      <div>
        <h2 className="text-xl font-bold mb-4 dark:text-white">Hostel Directories & Reviews</h2>
        
        {posts.length === 0 ? (
          <div className="flex h-40 items-center justify-center border border-dashed rounded-xl border-gray-300 dark:border-gray-700">
            <span className="text-lg text-gray-500">
              No hostel entries matching the "hostels" category found yet! Check Sanity to ensure a post has this category assigned.
            </span>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
            {posts.map((post) => (
              <PostList key={post._id} post={post} aspect="square" />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}