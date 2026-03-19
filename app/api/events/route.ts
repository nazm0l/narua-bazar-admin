import { apiClient } from "@/lib/apiClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await apiClient("/api/v1/events");
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const response = await apiClient("/api/v1/events/create", {
      method: "POST",
      body: JSON.stringify(body),
    });
    return NextResponse.json(response.data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Failed to create event", error: errorMessage },
      { status: 400 }
    );
  }
}
