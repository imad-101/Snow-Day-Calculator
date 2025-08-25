import { cookies } from "next/headers"

// Simple admin credentials - in production, use proper authentication
const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "snowday2024"
const SESSION_COOKIE = "admin-session"

export interface AdminSession {
  username: string
  isAuthenticated: boolean
  loginTime: number
}

export async function authenticateAdmin(username: string, password: string): Promise<boolean> {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

export async function createAdminSession(): Promise<string> {
  const sessionData: AdminSession = {
    username: ADMIN_USERNAME,
    isAuthenticated: true,
    loginTime: Date.now(),
  }

  // In a real app, you'd use proper session management
  const sessionToken = Buffer.from(JSON.stringify(sessionData)).toString("base64")

  const cookieStore = cookies()
  cookieStore.set(SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 24 hours
  })

  return sessionToken
}

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get(SESSION_COOKIE)?.value

    if (!sessionToken) {
      return null
    }

    const sessionData = JSON.parse(Buffer.from(sessionToken, "base64").toString())

    // Check if session is expired (24 hours)
    if (Date.now() - sessionData.loginTime > 60 * 60 * 24 * 1000) {
      return null
    }

    return sessionData
  } catch (error) {
    console.error("Error getting admin session:", error)
    return null
  }
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function requireAdminAuth(): Promise<AdminSession> {
  const session = await getAdminSession()

  if (!session || !session.isAuthenticated) {
    throw new Error("Unauthorized")
  }

  return session
}
