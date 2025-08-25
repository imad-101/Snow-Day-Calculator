import type { Metadata } from "next"
import { requireAdminAuth } from "@/lib/auth"
import { CreatePostPage } from "@/components/create-post-page"

export const metadata: Metadata = {
  title: "Create New Post - Admin",
  description: "Create a new blog post",
  robots: "noindex, nofollow",
}

export default async function NewPostPage() {
  await requireAdminAuth()
  return <CreatePostPage />
}
