import { getPostById } from "@/app/blog/actions/getPostById";
import { notFound } from "next/navigation";

type BlogPostProps = {
    params: {
        blogId: string;
    };
};

export default async function BlogPostPage({ params }: BlogPostProps) {
    const { blogId } = params;

    const post = await getPostById(blogId);

    if (!post) {
        return notFound();
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-50">
            <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-3xl">
                <h1 className="text-4xl mb-4 text-green-600 font-bold">{post.title}</h1>
                <p className="text-gray-700">{post.description}</p>
                <div className="mt-4 text-sm text-gray-500">
                    <span>Posted on: {new Date(post.created_at).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
}