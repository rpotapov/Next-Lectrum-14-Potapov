"use client";

import { PostsList } from "@/components/Blog/BlogPostsList";
import { useAuthStore } from '@/store/auth.store';
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BlogPage() {
    const router = useRouter();
    const { session } = useAuthStore();

    if (!session) {
        router.push("/auth/signin");
        return null;
    }

    return (
        <div className="container mx-auto p-4 min-h-screen">
            <>
                <h1 className="text-center text-4xl font-bold text-green-600 mb-8">Blog Posts</h1>

                <Link
                    href="/blog/create"
                    className="bg-green-500 text-white px-4 py-2 rounded-md mb-8 hover:bg-green-600"
                >
                    Add Post
                </Link>

                <PostsList />
            </>
        </div>
    );
}