import { getPosts as fetchPosts } from "@/app/blog/actions/getPosts";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await fetchPosts();

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}