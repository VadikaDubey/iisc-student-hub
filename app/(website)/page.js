import HomePage from "./home";
import {
  getAllPosts,
  getPostsByCategory,
} from "@/lib/sanity/client";

export default async function IndexPage() {
  const posts = await getAllPosts();

  const importantLinksData =
    await getPostsByCategory("important-links");

  let importantLinks = [];

  if (Array.isArray(importantLinksData)) {
    importantLinks = importantLinksData;
  } else if (
    importantLinksData &&
    Array.isArray(importantLinksData.posts)
  ) {
    importantLinks = importantLinksData.posts;
  } else if (
    importantLinksData &&
    typeof importantLinksData === "object"
  ) {
    const foundArray = Object.values(
      importantLinksData
    ).find((val) => Array.isArray(val));

    if (foundArray) importantLinks = foundArray;
  }

  return (
    <HomePage
      posts={posts}
      importantLinks={importantLinks}
    />
  );
}