"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useBlog } from '@/hooks/use-blogs';
import { Skeleton } from '@/components/ui/skeleton';
import { sanitizeContent } from '@/utils/html-sanitizer';
import NewsShareButtons from './BlogsShareButtons';

const BlogDetailsContent = () => {
    const params = useParams();
    const slug = params.slug as string;
    const { data: blog, isLoading } = useBlog(slug);

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <Skeleton className="h-4 w-24 mx-auto mb-6" />
                <Skeleton className="h-10 w-3/4 mx-auto mb-6" />
                <div className="flex justify-center gap-4 mb-10">
                    <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="aspect-video w-full rounded-xl mb-12" />
                <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4 mx-auto" />
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl font-bold text-foreground mb-4">Article Not Found</h2>
                <div className="text-muted-foreground mb-8">The story you are looking for might have been moved or removed.</div>
                <Link href="/blogs" className="text-primary hover:underline font-bold">Back to Blogs</Link>
            </div>
        );
    }

    return (
        <div className="bg-white pt-20 pb-0 min-h-screen">
            <div className="container mx-auto mb-12 px-4 md:px-8">
                <nav className="mb-6">
                    <ol className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-500">
                        <li>
                            <Link href="/" className="font-medium transition-colors hover:text-blue-600">
                                Home
                            </Link>
                        </li>
                        <li>/</li>
                        <li>
                            <Link href="/blogs" className="font-medium transition-colors hover:text-blue-600">
                                Blogs
                            </Link>
                        </li>
                        <li>/</li>
                        <li className="line-clamp-1 text-center font-medium text-gray-900 max-w-[200px]">
                            {blog.title}
                        </li>
                    </ol>
                </nav>

                <div className="mx-auto mb-8 max-w-4xl text-center">
                    <h1 className="mb-4 text-3xl leading-[1.15] font-bold text-gray-900 md:text-5xl lg:text-6xl tracking-tight">
                        {blog.title}
                    </h1>
                    <div className="text-sm text-gray-500 mb-6">
                        last updated: {new Date(blog.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex justify-center">
                        <NewsShareButtons url={shareUrl} title={blog.title} />
                    </div>
                </div>

                <div className="mx-auto mb-10 aspect-[16/9] max-w-4xl overflow-hidden rounded-xl">
                    <Image
                        src={blog.thumbnail_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80'}
                        alt={blog.title}
                        width={1200}
                        height={600}
                        className="h-full w-full object-cover"
                        priority
                    />
                </div>

                <div className="prose prose-xl prose-slate rich-text mx-auto mb-40 max-w-3xl space-y-8 leading-relaxed rich-text">
                    <div
                        dangerouslySetInnerHTML={{ __html: sanitizeContent(blog.content) }}
                    />
                </div>
            </div>
        </div>
    );
};

export default BlogDetailsContent;


