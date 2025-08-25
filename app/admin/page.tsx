import type { Metadata } from "next"
import { requireAdminAuth } from "@/lib/auth"
import { getAllPosts } from "@/lib/blog"
import { AdminDashboard } from "@/components/admin-dashboard"

export const metadata: Metadata = {
  title: "Admin Dashboard - Snow Day Calculator",
  description: "Blog management dashboard",
  robots: "noindex, nofollow",
}

export default async function AdminPage() {
  await requireAdminAuth()
  const posts = await getAllPosts()

  return <AdminDashboard posts={posts} />
}
