import type { Metadata } from "next"
import { requireAdminAuth } from "@/lib/auth"
import { getPostBySlug } from "@/lib/blog"
import { EditPostPage } from "@/components/edit-post-page"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Edit Post - Admin",
  description: "Edit blog post",
  robots: "noindex, nofollow",
}

interface EditPostPageProps {
  params: {
    slug: string
  }
}

export default async function EditPost({ params }: EditPostPageProps) {
  await requireAdminAuth()
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return <EditPostPage post={post} />
}
