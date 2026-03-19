import { apiClient } from "@/lib/apiClient";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await apiClient(`/api/v1/events/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Event not found" },
      { status: 404 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const response = await apiClient(`/api/v1/events/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update event" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await apiClient(`/api/v1/events/${id}`, {
      method: "DELETE",
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete event" },
      { status: 400 }
    );
  }
}
