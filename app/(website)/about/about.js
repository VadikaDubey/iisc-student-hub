import Container from "@/components/container";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";
import Link from "next/link";

/**
 * Will try to figure out how to fix the link to author bio part and description/bio in banner later.
 */

export default function About({ authors, settings }) {
  return (
    <Container>
      <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
        About
      </h1>
      <div className="text-center">
        <p className="text-lg">Hoping to make a difference in the IISc community.</p>
      </div>

      {authors[0] && (
        <div className="mt-10 mb-16 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col md:flex-row">
            {/* Text */}
            <div className="flex flex-1 flex-col justify-center p-8 md:p-12">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                {authors[0].name}
              </h2>

              {authors[0].designation && (
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                  {authors[0].designation}
                </p>
              )}
              <div className="mt-6">
                <p className="text-2xl font-medium tracking-tight text-gray-700 dark:text-gray-300">
                  Founder and Lead Developer
                </p>
              </div>
              <blockquote className="mt-6 border-l-4 border-brand-primary pl-5">
                <p className="text-xl italic leading-relaxed text-gray-700 dark:text-gray-300">
                  "Making stuff 'cuz why not?"
                </p>
              </blockquote>
            </div>

            {/* Image */}
            <div className="relative h-80 md:h-auto md:w-96">
              {urlForImage(authors[0]?.image) && (
                <Image
                  src={urlForImage(authors[0].image).src}
                  alt={authors[0].name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>
        </div>
      )}

      <div className="prose mx-auto mt-14 text-center dark:prose-invert">
        <p>
          Making this website was a labor of love, and we hope it serves as a valuable resource for the IISc community. We are committed to keeping the information up-to-date and relevant, and we welcome any feedback or suggestions you may have.
        </p>
        <p>
          If you have any questions, comments, or would like to contribute to the website, please don't hesitate to reach out to us. We are always looking for ways to improve and expand the content on this site.
        </p>
        <p>
          Thank you for visiting our website, and we hope you find it helpful and informative!
        </p>
        <p>
          <Link href="/contact">Get in touch</Link>
        </p>
      </div>
    </Container>
  );
}
