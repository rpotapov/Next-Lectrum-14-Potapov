'use client'

import { useEffect } from "react";
import { notFound } from "next/navigation";
import { usePostStore } from "@/store/posts.store";

type BlogPostProps = {
    params: {
        blogId: string;
    };
};

export default function BlogPostPage({ params }: BlogPostProps) {
    const { blogId } = params;
    const getPostById = usePostStore((state) => state.getPostById);
    const selectedPost = usePostStore((state) => state.selectedPost);

    useEffect(() => {
        if (blogId) {
            getPostById(blogId);
        }
    }, [blogId, getPostById]);

    if (!selectedPost) {
        return notFound();
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-50">
            <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-3xl">
                <h1 className="text-4xl mb-4 text-green-600 font-bold">
                    {selectedPost.title}
                </h1>
                <p className="text-gray-700">{selectedPost.description}</p>
                <div className="mt-4 text-sm text-gray-500">
                    <span>
                        Posted on: {new Date(selectedPost.created_at).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    );
}