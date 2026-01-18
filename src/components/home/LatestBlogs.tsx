"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useRecentBlogs } from '@/hooks/use-blogs';
import { Skeleton } from '@/components/ui/skeleton';

export const LatestBlogs: React.FC = () => {
    const { data: blogs = [], isLoading } = useRecentBlogs();

    return (
        <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto bg-background">
            <div className="mb-12">
                <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Insights & News</span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">From The Blog</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="aspect-video rounded-2xl mb-4" />
                    ))
                ) : (
                    blogs.slice(0, 3).map(blog => (
                        <article key={blog.id} className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-border">
                            <div className="aspect-video overflow-hidden">
                                <img
                                    src={blog.thumbnail_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80'}
                                    alt={blog.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6 flex flex-col h-full">
                                <div className="flex items-center gap-4 mb-3">
                                    <span className="text-xs font-bold text-primary uppercase">{blog.tags?.[0]?.name || 'News'}</span>
                                    <span className="text-xs text-muted-foreground">{new Date(blog.created_at).toLocaleDateString()}</span>
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    {blog.title}
                                </h3>
                                <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                                    {blog.content.replace(/<[^>]*>/g, '').slice(0, 150)}...
                                </p>
                                <Link href={`/news/${blog.slug}`} className="text-sm font-bold flex items-center gap-2 text-foreground group-hover:text-primary mt-auto">
                                    Read More <ArrowRight size={16} />
                                </Link>
                            </div>
                        </article>
                    ))
                )}
            </div>
        </section>
    );
};
