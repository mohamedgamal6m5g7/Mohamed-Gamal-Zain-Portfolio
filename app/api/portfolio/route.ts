import { type NextRequest, NextResponse } from "next/server"
import { loadPortfolioData } from "@/lib/data-manager"

export async function GET(request: NextRequest) {
  try {
    const data = await loadPortfolioData()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 })
  }
}
