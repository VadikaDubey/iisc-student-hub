import { Suspense } from "react";
import Container from "@/components/container";
import Explore from "./explore";
import Loading from "@/components/loading";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function ExplorePage() {
  return (
    <Container className="relative">
      <h1 className="text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
        Campus Map Explorer
      </h1>
      <div className="text-center">
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Click an area on the map or select a hostel down below.
        </p>
      </div>
      
      {/* Suspense watches over our map and data load */}
      <Suspense fallback={<Loading />}>
        <Explore />
      </Suspense>
    </Container>
  );
}