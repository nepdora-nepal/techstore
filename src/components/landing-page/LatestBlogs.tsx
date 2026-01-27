"use client";

import React from 'react';
import { useRecentBlogs } from '@/hooks/use-blogs';
import { Skeleton } from '@/components/ui/skeleton';
import BlogsCard from '@/components/blogs/BlogsCard';

export const LatestBlogs: React.FC = () => {
    const { data: blogs = [], isLoading } = useRecentBlogs();

    return (
        <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto ">
            <div className="mb-12">
                <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Insights & News</span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">From The Blog</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="aspect-[4/3] w-full rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-6 w-full" />
                                <div className="flex items-center gap-3 pt-2">
                                    <Skeleton className="h-8 w-8 rounded-full" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    blogs.slice(0, 3).map(blog => (
                        <BlogsCard key={blog.id} post={blog} />
                    ))
                )}
            </div>
        </section>
    );
};
