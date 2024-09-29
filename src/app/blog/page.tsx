"use client";

import { PostsList } from "@/components/Blog/BlogPostsList";
import { supabase } from "@/libs/supabase";
import { Session } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogPage() {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const getSession = async () => {
            const { data, error } = await supabase.auth.getSession();

            if (error) {
                console.error("Error fetching session:", error);
            } else {
                setSession(data.session);
            }

            setLoading(false);
        };

        getSession();
    }, []);

    useEffect(() => {
        if (!loading && !session) {
            router.push("/auth/signin");
        }
    }, [loading, session, router]);

    return (
        <div className="container mx-auto p-4 min-h-screen">
            {loading ? (
                <p className="text-lime-600">Loading...</p>
            ) : (
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
            )}
        </div>
    );
}