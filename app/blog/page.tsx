import type { Metadata } from "next"
import { getAllPosts } from "@/lib/blog"
import { BlogListPage } from "@/components/blog-list-page"

export const metadata: Metadata = {
  title: "Snow Day Blog - Weather Insights & School Closure Tips",
  description:
    "Expert insights on snow day predictions, school closure policies, and winter weather preparedness. Stay informed with our comprehensive guides and tips.",
  keywords:
    "snow day blog, school closures, winter weather, snow day predictions, weather insights, educational resources",
  openGraph: {
    title: "Snow Day Blog - Weather Insights & School Closure Tips",
    description: "Expert insights on snow day predictions, school closure policies, and winter weather preparedness.",
    type: "website",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Snow Day Blog - Weather Insights & School Closure Tips",
    description: "Expert insights on snow day predictions, school closure policies, and winter weather preparedness.",
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Snow Day Calculator Blog",
    description: "Expert insights on snow day predictions, school closure policies, and winter weather preparedness",
    url: "/blog",
    publisher: {
      "@type": "Organization",
      name: "Snow Day Calculator",
      url: "/",
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: post.author,
      },
      url: `/blog/${post.slug}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogListPage posts={posts} />
    </>
  )
}
