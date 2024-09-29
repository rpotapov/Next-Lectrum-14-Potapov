import { getPosts as fetchPosts } from "@/app/blog/actions/getPosts";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await fetchPosts();

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";

    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}