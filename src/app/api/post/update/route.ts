import { updatePost } from "@/app/blog/actions/updatePost";
import { NextResponse } from "next/server";

export async function POST(request) {
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

    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}