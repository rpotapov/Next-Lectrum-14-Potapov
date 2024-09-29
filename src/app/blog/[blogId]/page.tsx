'use client'

import { usePostStore } from "@/store/posts.store";
import { notFound } from "next/navigation";
import { useEffect } from "react";

type BlogPostProps = {
    params: {
        blogId: string;
    };
};

export default function BlogPostPage({ params }: BlogPostProps) {
    const { blogId } = params;
    const { getPostById, selectedPost } = usePostStore();

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
                        Posted on: {<span>
                            Posted on: {selectedPost.created_at ? new Date(selectedPost.created_at).toLocaleDateString() : 'Date not available'}
                        </span>}
                    </span>
                </div>
            </div>
        </div>
    );
}