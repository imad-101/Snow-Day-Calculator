import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  tags: string[]
  featured: boolean
  seoTitle?: string
  seoDescription?: string
}

const postsDirectory = path.join(process.cwd(), "content/blog")

// Ensure content directory exists
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true })
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = await Promise.all(
      fileNames
        .filter((name) => name.endsWith(".md"))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.md$/, "")
          const fullPath = path.join(postsDirectory, fileName)
          const fileContents = fs.readFileSync(fullPath, "utf8")
          const { data, content } = matter(fileContents)

          return {
            slug,
            title: data.title || "Untitled",
            excerpt: data.excerpt || content.substring(0, 160) + "...",
            content,
            date: data.date || new Date().toISOString(),
            author: data.author || "Snow Day Calculator Team",
            tags: data.tags || [],
            featured: data.featured || false,
            seoTitle: data.seoTitle,
            seoDescription: data.seoDescription,
          }
        }),
    )

    return allPostsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error("Error reading blog posts:", error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    const processedContent = await remark().use(html).process(content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      title: data.title || "Untitled",
      excerpt: data.excerpt || content.substring(0, 160) + "...",
      content: contentHtml,
      date: data.date || new Date().toISOString(),
      author: data.author || "Snow Day Calculator Team",
      tags: data.tags || [],
      featured: data.featured || false,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
    }
  } catch (error) {
    console.error("Error reading blog post:", error)
    return null
  }
}

export async function createPost(postData: Omit<BlogPost, "slug"> & { slug?: string }): Promise<boolean> {
  try {
    const slug =
      postData.slug ||
      postData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

    const fullPath = path.join(postsDirectory, `${slug}.md`)

    const frontMatter = {
      title: postData.title,
      excerpt: postData.excerpt,
      date: postData.date,
      author: postData.author,
      tags: postData.tags,
      featured: postData.featured,
      seoTitle: postData.seoTitle,
      seoDescription: postData.seoDescription,
    }

    const fileContent = matter.stringify(postData.content, frontMatter)
    fs.writeFileSync(fullPath, fileContent)

    return true
  } catch (error) {
    console.error("Error creating blog post:", error)
    return false
  }
}

export async function updatePost(slug: string, postData: Partial<BlogPost>): Promise<boolean> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return false
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    const updatedData = {
      ...data,
      ...postData,
      content: postData.content || content,
    }

    const fileContent = matter.stringify(updatedData.content, {
      title: updatedData.title,
      excerpt: updatedData.excerpt,
      date: updatedData.date,
      author: updatedData.author,
      tags: updatedData.tags,
      featured: updatedData.featured,
      seoTitle: updatedData.seoTitle,
      seoDescription: updatedData.seoDescription,
    })

    fs.writeFileSync(fullPath, fileContent)
    return true
  } catch (error) {
    console.error("Error updating blog post:", error)
    return false
  }
}

export async function deletePost(slug: string): Promise<boolean> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return false
    }

    fs.unlinkSync(fullPath)
    return true
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return false
  }
}
