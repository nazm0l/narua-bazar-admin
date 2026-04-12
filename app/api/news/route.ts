import { apiClient } from "@/lib/apiClient"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await apiClient("/api/v1/news")
    return NextResponse.json(response.data)
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch news" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const response = await apiClient("/api/v1/news/create", {
      method: "POST",
      body: JSON.stringify(body)
    })
    return NextResponse.json(response.data)
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create news", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    )
  }
}
