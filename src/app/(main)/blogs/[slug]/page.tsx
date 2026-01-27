import BlogDetailsContent from "@/components/blogs/BlogDetailsContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "News Details - TechStore",
    description: "Read the full story at TechStore.",
};

export default function BlogDetailPage() {
    return <BlogDetailsContent />;
}
