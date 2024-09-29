import { updatePost } from "@/app/blog/actions/updatePost";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { id, title, description } = await request.json();

    const updatedFields = {
      title,
      description,
    };

    await updatePost(id, updatedFields);

    return NextResponse.json(
      { message: "Post updated successfully.", status: 'OK' },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update post error:", error);
    
    const message =
    error instanceof Error ? error.message : "An unexpected error occurred.";

  return NextResponse.json(
    { message },
    { status: 500 }
  );
  }
}