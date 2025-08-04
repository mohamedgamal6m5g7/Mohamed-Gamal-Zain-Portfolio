import { type NextRequest, NextResponse } from "next/server"
import { getAuthFromRequest, validateAuthToken } from "@/lib/auth"
import { loadPortfolioData, savePortfolioData } from "@/lib/data-manager"

export async function GET(request: NextRequest) {
  const token = getAuthFromRequest(request)

  if (!token || !validateAuthToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await loadPortfolioData()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const token = getAuthFromRequest(request)

  if (!token || !validateAuthToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const updatedData = await request.json()
    await savePortfolioData(updatedData)
    return NextResponse.json({ success: true, message: "Data updated successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 })
  }
}
