import HostelsPage from "./hostels";
import {
  getPostsByCategory,
} from "@/lib/sanity/client";

export default async function Page() {
  const resourcesData =
    await getPostsByCategory(
      "housing-amenities-and-dining-links"
    );

  let resources = [];

  if (Array.isArray(resourcesData)) {
    resources = resourcesData;
  } else if (
    resourcesData &&
    Array.isArray(resourcesData.posts)
  ) {
    resources = resourcesData.posts;
  } else if (
    resourcesData &&
    typeof resourcesData === "object"
  ) {
    const foundArray = Object.values(
      resourcesData
    ).find((val) => Array.isArray(val));

    if (foundArray) resources = foundArray;
  }

  return (
    <HostelsPage
      resources={resources}
    />
  );
}