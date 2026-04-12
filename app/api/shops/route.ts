import { apiClient } from "@/lib/apiClient"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await apiClient("/api/v1/shop")
    return NextResponse.json(response.data)
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch shops" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log("POST /api/shops body:", body)
    const response = await apiClient("/api/v1/shop/create", {
      method: "POST",
      body: JSON.stringify(body)
    })
    console.log("POST /api/shops apiClient response:", response)
    return NextResponse.json(response.data)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("POST /api/shops error:", errorMessage)
    return NextResponse.json(
      { message: "Failed to create shop", error: errorMessage },
      { status: 400 }
    )
  }
}