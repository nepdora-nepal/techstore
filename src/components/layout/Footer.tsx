import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useCreateNewsletter } from '@/hooks/use-newsletter';
import { useCategories } from '@/hooks/use-category';
import { toast } from 'sonner';
import { useSiteConfig } from '@/hooks/use-site-config';
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    Music2,
    MapPin,
    Phone,
    Mail,
    Clock
} from 'lucide-react';
import Image from 'next/image';

export const Footer: React.FC = () => {
    const [email, setEmail] = useState("");
    const createNewsletter = useCreateNewsletter();
    const { data: config } = useSiteConfig();
    const { data: categories, isLoading: isCategoriesLoading } = useCategories({ page_size: 5 });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        createNewsletter.mutate(
            { email },
            {
                onSuccess: () => {
                    toast.success("Subscribed successfully!");
                    setEmail("");
                },
                onError: (error: Error) => {
                    toast.error(error.message || "Failed to subscribe");
                },
            }
        );
    };

    return (
        <footer className="bg-primary text-primary-foreground/70 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                <div className="space-y-6">
                    <Link href="/" className="flex items-center gap-2">
                        {config?.logo ? (
                            <div className="relative overflow-hidden">
                                <Image
                                    src={config.logo}
                                    alt={config.business_name || "Logo"}
                                    width={200}
                                    height={200}
                                    className="object-contain  invert "
                                />
                            </div>
                        ) : (
                            <div className="w-10 h-10 bg-primary-foreground/10 rounded-xl flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-xl italic">S</span>
                            </div>
                        )}

                    </Link>
                    <p className="text-primary-foreground/60 leading-relaxed">
                        {config?.business_description || "Creating premium shopping experiences with a touch of elegance. We deliver only the finest curated collections."}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        {config?.facebook_url && (
                            <a href={config.facebook_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/10 hover:border-primary-foreground/30 transition-all">
                                <Facebook size={18} className="text-primary-foreground/80" />
                            </a>
                        )}
                        {config?.twitter_url && (
                            <a href={config.twitter_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/10 hover:border-primary-foreground/30 transition-all">
                                <Twitter size={18} className="text-primary-foreground/80" />
                            </a>
                        )}
                        {config?.instagram_url && (
                            <a href={config.instagram_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/10 hover:border-primary-foreground/30 transition-all">
                                <Instagram size={18} className="text-primary-foreground/80" />
                            </a>
                        )}
                        {config?.linkedin_url && (
                            <a href={config.linkedin_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/10 hover:border-primary-foreground/30 transition-all">
                                <Linkedin size={18} className="text-primary-foreground/80" />
                            </a>
                        )}
                        {config?.youtube_url && (
                            <a href={config.youtube_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/10 hover:border-primary-foreground/30 transition-all">
                                <Youtube size={18} className="text-primary-foreground/80" />
                            </a>
                        )}
                        {config?.tiktok_url && (
                            <a href={config.tiktok_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/10 hover:border-primary-foreground/30 transition-all">
                                <Music2 size={18} className="text-primary-foreground/80" />
                            </a>
                        )}
                    </div>
                </div>

                <div>
                    <h4 className="text-primary-foreground font-bold mb-6">Contact Us</h4>
                    <ul className="space-y-4 text-sm">
                        {config?.address && (
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-primary-foreground/40 shrink-0 mt-0.5" />
                                <span>{config.address}</span>
                            </li>
                        )}
                        {config?.phone && (
                            <li className="flex items-start gap-3">
                                <Phone size={18} className="text-primary-foreground/40 shrink-0 mt-0.5" />
                                <span>{config.phone}</span>
                            </li>
                        )}
                        {config?.email && (
                            <li className="flex items-start gap-3">
                                <Mail size={18} className="text-primary-foreground/40 shrink-0 mt-0.5" />
                                <span>{config.email}</span>
                            </li>
                        )}
                        {config?.working_hours && (
                            <li className="flex items-start gap-3">
                                <Clock size={18} className="text-primary-foreground/40 shrink-0 mt-0.5" />
                                <span>{config.working_hours}</span>
                            </li>
                        )}
                    </ul>
                </div>

                <div>
                    <h4 className="text-primary-foreground font-bold mb-6">Quick Links</h4>
                    <ul className="space-y-4">
                        <li><Link href="/" className="hover:text-primary-foreground transition-colors">Home</Link></li>
                        <li><Link href="/collections" className="hover:text-primary-foreground transition-colors">Shop</Link></li>
                        <li><Link href="/about" className="hover:text-primary-foreground transition-colors">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-primary-foreground transition-colors">Contact Us</Link></li>
                        <li><Link href="/blogs" className="hover:text-primary-foreground transition-colors">Blogs</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-primary-foreground font-bold mb-6">Categories</h4>
                    {isCategoriesLoading ? (
                        <div className="animate-pulse space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-4 bg-primary-foreground/10 rounded w-24"></div>
                            ))}
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {categories?.results && categories.results.length > 0 ? (
                                categories.results.map((category) => (
                                    <li key={category.id}>
                                        <Link
                                            href={`/collections?category=${category.slug}`}
                                            className="hover:text-primary-foreground transition-colors"
                                        >
                                            {category.name}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li><span className="text-primary-foreground/60">No categories found</span></li>
                            )}
                        </ul>
                    )}
                </div>

                <div>
                    <h4 className="text-primary-foreground font-bold mb-6">Newsletter</h4>
                    <p className="text-primary-foreground/60 mb-4 text-sm">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-primary-foreground/5 border-none rounded-lg px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/40 focus:ring-2 focus:ring-primary-foreground/20 outline-none"
                        />
                        <Button
                            type="submit"
                            disabled={createNewsletter.isPending}
                            className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-none"
                        >
                            {createNewsletter.isPending ? "Subscribing..." : "Subscribe"}
                        </Button>
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                <p>© {new Date().getFullYear()} SastoBazaar Shop Inc. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link href="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-primary-foreground transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};
