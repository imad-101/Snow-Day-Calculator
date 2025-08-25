import { type NextRequest, NextResponse } from "next/server"
import { requireAdminAuth } from "@/lib/auth"
import { createPost } from "@/lib/blog"

export async function POST(request: NextRequest) {
  try {
    await requireAdminAuth()
    const postData = await request.json()

    const success = await createPost(postData)

    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
    }
  } catch (error) {
    console.error("Create post error:", error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
