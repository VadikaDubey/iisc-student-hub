import { Suspense } from "react";
import Container from "@/components/container";
import ResourceArchive from "./resources";
import Loading from "@/components/loading";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function ResourcesPage({ searchParams }) {
  // Await searchParams if using Next.js 15+
  const resolvedSearchParams = await searchParams; 

  return (
    <Container className="relative">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
          Resources & Links
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
          Organised quick links to useful resources, mainly for undergraduate students.
        </p>
        <p className="mt-1 text-lg text-gray-600 dark:text-gray-300">
          If you have any suggestions for resources to add, please reach out to us!
        </p>
      </div>
      
      <Suspense
        key={resolvedSearchParams.page || "1"}
        fallback={<Loading />}>
        <ResourceArchive searchParams={resolvedSearchParams} />
      </Suspense>
    </Container>
  );
}