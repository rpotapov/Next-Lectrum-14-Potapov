"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data, error } = await supabase
      .from("blog")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Failed to fetch blog post: ${error.message}`);
      return NextResponse.json(
        { message: error.message || "Failed to fetch post." },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { message: "Post not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { post: data, message: "Post fetched successfully.", status: 'OK' },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get post by ID error:", error);
    
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";

    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}