import type { Metadata } from "next"
import { AdminLoginForm } from "@/components/admin-login-form"
import { getAdminSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Admin Login - Snow Day Calculator",
  description: "Admin login for Snow Day Calculator blog management",
  robots: "noindex, nofollow",
}

export default async function AdminLoginPage() {
  const session = await getAdminSession()

  if (session?.isAuthenticated) {
    redirect("/admin")
  }

  return (
    <div className="min-h-screen bg-warm-cream flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Admin Login</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Sign in to manage blog posts</p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  )
}
