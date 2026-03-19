import { apiClient } from "@/lib/apiClient"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const response = await apiClient(`/api/v1/news/${id}`)
    return NextResponse.json(response.data)
  } catch (error) {
    return NextResponse.json(
      { message: "News not found" },
      { status: 404 }
    )
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const response = await apiClient(`/api/v1/news/${id}`, {
      method: "PUT",
      body: JSON.stringify(body)
    })
    return NextResponse.json(response.data)
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update news" },
      { status: 400 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const response = await apiClient(`/api/v1/news/${id}`, {
      method: "DELETE"
    })
    return NextResponse.json(response.data)
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete news" },
      { status: 400 }
    )
  }
}
