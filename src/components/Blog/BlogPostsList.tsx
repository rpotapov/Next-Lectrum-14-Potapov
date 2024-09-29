import deletePost from "@/app/blog/actions/deletePost/intex";
import { getPosts } from "@/app/blog/actions/getPosts";
import Link from "next/link";

export async function PostsList() {
    const { data: posts } = await getPosts();

    if (!posts?.length) {
        return <p className="text-gray-500">No posts available.</p>;
    }

    return (
        <section className="mt-8">
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white rounded-lg shadow-lg p-6 transform transition duration-300 lg:hover:scale-105 lg:hover:shadow-2xl"
                    >
                        <h2 className="text-2xl font-semibold text-green-700 mb-2">
                            {post.title}
                        </h2>
                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                        <div className="flex justify-between items-center mt-4">
                            <Link
                                href={`/blog/${post.id}`}
                                className="text-green-500 font-semibold hover:underline"
                            >
                                Read More
                            </Link>
                            <div className="flex space-x-4">
                                <Link
                                    href={{
                                        pathname: "/blog/create",
                                        query: { postId: post.id, isUpdatePost: true }
                                    }}
                                    className="text-blue-500 hover:text-blue-700"
                                    aria-label="Edit Post"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15.232 5.232a3 3 0 00-4.243 0L4 13.586V17h3.414l6.989-6.989a3 3 0 000-4.243zM16.95 3.05a3 3 0 010 4.243l-1.414 1.414-4.243-4.243L12.707 2.5a3 3 0 014.243 0z"
                                        />
                                    </svg>
                                </Link>
                                <form action={deletePost}>
                                    <input type="hidden" name="id" value={post.id} />
                                    <button
                                        type="submit"
                                        className="text-red-500 hover:text-red-700"
                                        aria-label="Delete Post"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}