"use client";

import addPost from "@/app/blog/actions/addPost";
import { getPostById } from "@/app/blog/actions/getPostById";
import { updatePost } from '@/app/blog/actions/updatePost';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

const BlogPostFormContent: React.FC = () => {
    const [post, setPost] = useState({ title: '', description: '' });
    const searchParams = useSearchParams();
    const postId = searchParams.get('postId');
    const isUpdatePost = searchParams.get('isUpdatePost');

    useEffect(() => {
        if (postId && isUpdatePost) {
            const getPost = async () => {
                const data = await getPostById(postId);
                setPost(data);
            };

            getPost();
        }
    }, [postId, isUpdatePost]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPost((prevPost) => ({
            ...prevPost,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isUpdatePost && postId) {
            await updatePost(postId, post);
        } else {
            await addPost(post);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-50">
            <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
                <h1 className="text-3xl mb-4 text-green-600 font-bold">{isUpdatePost ? 'Update Post' : 'Create Post'}</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Title"
                        value={post.title}
                        onChange={handleChange}
                        className="border border-lime-700 text-lime-700 p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-lime-400"
                    />
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        value={post.description}
                        onChange={handleChange}
                        className="border border-lime-700 text-lime-700 p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-lime-400"
                    />
                    <button
                        type="submit"
                        className="bg-green-300 text-white px-4 py-2 rounded-md hover:bg-green-400 w-full"
                    >
                        {isUpdatePost ? 'Update Post' : 'Create Post'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export const BlogPostForm: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BlogPostFormContent />
        </Suspense>
    );
};

export default BlogPostForm;