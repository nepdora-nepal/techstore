"use client";

import React from "react";
import { Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
} from "next-share";

interface NewsShareButtonsProps {
    url: string;
    title: string;
}

const NewsShareButtons: React.FC<NewsShareButtonsProps> = ({ url, title }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
    };

    return (
        <div className="flex items-center gap-3">
            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest mr-2">Share Story</span>

            <FacebookShareButton url={url} quote={title}>
                <div className="w-10 h-10 rounded-full bg-secondary/50 text-muted-foreground flex items-center justify-center hover:bg-[#3b5998] hover:text-white transition-all cursor-pointer">
                    <Facebook size={18} />
                </div>
            </FacebookShareButton>

            <TwitterShareButton url={url} title={title}>
                <div className="w-10 h-10 rounded-full bg-secondary/50 text-muted-foreground flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-all cursor-pointer">
                    <Twitter size={18} />
                </div>
            </TwitterShareButton>

            <LinkedinShareButton url={url}>
                <div className="w-10 h-10 rounded-full bg-secondary/50 text-muted-foreground flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-all cursor-pointer">
                    <Linkedin size={18} />
                </div>
            </LinkedinShareButton>

            <Button
                variant="outline"
                size="icon"
                className="w-10 h-10 rounded-full bg-secondary/50 text-muted-foreground border-none hover:bg-primary hover:text-primary-foreground transition-all shadow-none"
                onClick={copyToClipboard}
            >
                <LinkIcon size={18} />
            </Button>
        </div>
    );
};

export default NewsShareButtons;

