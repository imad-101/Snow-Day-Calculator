"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MarkdownEditor } from "@/components/markdown-editor"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { BlogPost } from "@/lib/blog"

interface EditPostPageProps {
  post: BlogPost
}

export function EditPostPage({ post }: EditPostPageProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSave = async (postData: Omit<BlogPost, "slug"> & { slug?: string }) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/posts/${post.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        router.push("/admin")
        router.refresh()
        return true
      } else {
        console.error("Failed to update post")
        return false
      }
    } catch (error) {
      console.error("Error updating post:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-warm-cream">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.push("/admin")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Post: {post.title}</h1>
        </div>

        <MarkdownEditor initialPost={post} onSave={handleSave} isLoading={isLoading} />
      </div>
    </div>
  )
}
