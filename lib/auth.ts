import type { NextRequest } from "next/server"

// Simple authentication - in production, use proper JWT or session management
const ADMIN_CREDENTIALS = {
  username: "mohamed_admin",
  password: "MGZ_Portfolio_2025!", // Change this to a secure password
}

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password
}

export function createAuthToken(username: string): string {
  // Simple token - in production, use proper JWT
  return Buffer.from(`${username}:${Date.now()}`).toString("base64")
}

export function validateAuthToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString()
    const [username, timestamp] = decoded.split(":")
    const tokenAge = Date.now() - Number.parseInt(timestamp)

    // Token expires after 24 hours
    return username === ADMIN_CREDENTIALS.username && tokenAge < 24 * 60 * 60 * 1000
  } catch {
    return false
  }
}

export function getAuthFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization")
  if (!authHeader?.startsWith("Bearer ")) return null
  return authHeader.substring(7)
}
