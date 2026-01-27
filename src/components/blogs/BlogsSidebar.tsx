"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecentBlogs, useBlogTags } from "@/hooks/use-blogs";
import Link from "next/link";
import { format } from "date-fns";
import { Search, Calendar, Clock } from "lucide-react";

export const SearchBar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(
        searchParams.get("search") || ""
    );

    useEffect(() => {
        setSearchTerm(searchParams.get("search") || "");
    }, [searchParams]);

    const executeSearch = useCallback((value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set("search", value);
        } else {
            params.delete("search");
        }
        params.delete("page");
        router.push(`/blogs?${params.toString()}`);
    }, [searchParams, router]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== (searchParams.get("search") || "")) {
                executeSearch(searchTerm);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm, searchParams, executeSearch]);

    return (
        <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-border bg-secondary/30 py-4 pr-4 pl-12 text-sm transition-all outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary"
            />
        </div>
    );
};

export const TagList = () => {
    const { data: tags } = useBlogTags();
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentTags = searchParams.getAll("tags");

    const handleTagClick = (slug: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (currentTags.includes(slug)) {
            params.delete("tags");
            currentTags.filter(t => t !== slug).forEach(t => params.append("tags", t));
        } else {
            params.append("tags", slug);
        }
        params.delete("page");
        router.push(`/blogs?${params.toString()}`);
    };

    if (!tags || tags.length === 0) return null;

    return (
        <div className="space-y-6">
            <h4 className="text-lg font-bold text-foreground">Popular Tags</h4>
            <div className="flex flex-wrap gap-2">
                {tags.map(tag => {
                    const isActive = currentTags.includes(tag.slug);
                    return (
                        <span
                            key={tag.id}
                            onClick={() => handleTagClick(tag.slug)}
                            className={`cursor-pointer rounded-full border px-4 py-1.5 text-xs font-bold transition-all ${isActive
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-white text-muted-foreground hover:bg-secondary hover:text-foreground"
                                }`}
                        >
                            {tag.name}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export const RecentPosts = () => {
    const { data: posts } = useRecentBlogs();

    if (!posts || posts.length === 0) return null;

    return (
        <div className="space-y-6">
            <h4 className="text-lg font-bold text-foreground">Recent Stories</h4>
            <div className="space-y-6">
                {posts.slice(0, 4).map(post => (
                    <Link
                        key={post.id}
                        href={`/blogs/${post.slug}`}
                        className="group flex cursor-pointer gap-4"
                    >
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-border">
                            <Image
                                src={post.thumbnail_image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=200&q=80"}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                        <div className="flex min-w-0 flex-col justify-center">
                            <h5 className="line-clamp-2 text-sm font-bold text-foreground transition-colors group-hover:text-primary leading-snug">
                                {post.title}
                            </h5>
                            <div className="mt-2 flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                <span className="flex items-center gap-1">
                                    <Calendar size={10} className="text-primary" />
                                    {format(new Date(post.created_at), "MMM d, yyyy")}
                                </span>
                                {post.time_to_read && (
                                    <>
                                        <span className="h-1 w-1 rounded-full bg-border" />
                                        <span className="flex items-center gap-1">
                                            <Clock size={10} className="text-primary" />
                                            {post.time_to_read} MIN READ
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

const NewsSidebar: React.FC = () => {
    return (
        <div className="sticky top-24 flex flex-col gap-12">
            <SearchBar />
            <RecentPosts />
            <TagList />
        </div>
    );
};

export default NewsSidebar;
