import { type NextRequest, NextResponse } from "next/server"
import { remark } from "remark"
import html from "remark-html"

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json()

    if (!content) {
      return NextResponse.json({ html: "" })
    }

    const processedContent = await remark().use(html).process(content)
    const htmlContent = processedContent.toString()

    return NextResponse.json({ html: htmlContent })
  } catch (error) {
    console.error("Preview generation error:", error)
    return NextResponse.json({ error: "Failed to generate preview" }, { status: 500 })
  }
}
