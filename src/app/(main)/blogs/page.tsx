import { Suspense } from "react";
import BlogListingContent from "@/components/news/BlogListingContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "News - TechStore",
    description: "Read the latest news and stories from TechStore.",
};

export default function BlogListingPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BlogListingContent />
        </Suspense>
    );
}
