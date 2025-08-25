import { type NextRequest, NextResponse } from "next/server"
import { requireAdminAuth } from "@/lib/auth"
import { updatePost, deletePost } from "@/lib/blog"

interface RouteParams {
  params: {
    slug: string
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAdminAuth()
    const postData = await request.json()

    const success = await updatePost(params.slug, postData)

    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
    }
  } catch (error) {
    console.error("Update post error:", error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAdminAuth()

    const success = await deletePost(params.slug)

    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
    }
  } catch (error) {
    console.error("Delete post error:", error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
