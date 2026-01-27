"use client";

import React, { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useBlogs } from '@/hooks/use-blogs';
import { Skeleton } from '@/components/ui/skeleton';
import { BlogPost, BlogFilters } from '@/types/blog';
import BlogsCard from './BlogsCard';
import Pagination from '@/components/ui/pagination-custom';

const BlogListingContent = () => {
    const searchParams = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || "";
    const tags = searchParams.getAll("tags");

    const queryFilters: BlogFilters = useMemo(
        () => ({
            page,
            search,
            tags: tags.length > 0 ? tags : undefined,
            is_published: true,
            page_size: 12
        }),
        [page, search, tags]
    );

    const { data: blogsData, isLoading, error } = useBlogs(queryFilters);
    const blogs = blogsData?.results || [];
    const totalBlogs = blogsData?.count || 0;
    const totalPages = Math.ceil(totalBlogs / 12);

    return (
        <div className="bg-white ">
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="mb-10 flex flex-col gap-1">
                        <h1 className="text-4xl font-bold text-gray-900">
                            Read Latest Blogs from TechStore
                        </h1>
                        <p className="text-gray-600">
                            Stay updated with the latest news, tips, and insights from our team.
                        </p>
                    </div>

                    {error ? (
                        <div className="py-20 text-center">
                            <h3 className="text-xl font-bold text-slate-900">Failed to load blogs</h3>
                            <p className="text-slate-600">Please try again later.</p>
                        </div>
                    ) : isLoading ? (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="space-y-4">
                                    <Skeleton className="h-[240px] w-full rounded-xl" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-1/4" />
                                        <Skeleton className="h-6 w-full" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : blogs.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {blogs.map((blog: BlogPost) => (
                                    <BlogsCard key={blog.id} post={blog} />
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="flex justify-center pt-12">
                                    <Pagination
                                        currentPage={page}
                                        totalPages={totalPages}
                                        onPageChange={(p) => {
                                            const params = new URLSearchParams(searchParams.toString());
                                            params.set("page", p.toString());
                                            window.location.search = params.toString();
                                        }}
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="py-20 text-center">
                            <h3 className="text-xl font-bold text-slate-900">No stories found</h3>
                            <p className="text-slate-600">Check back later for fresh insights and stories.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default BlogListingContent;


