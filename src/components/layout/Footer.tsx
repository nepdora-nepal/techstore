"use client";

import React from "react";
import Link from "next/link";
import NextImage from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useCategories } from "@/hooks/use-category";
import { useSiteConfig } from "@/hooks/use-site-config";
const Footer: React.FC = () => {
  const { data: categoriesData } = useCategories();
  const { data: siteConfig } = useSiteConfig();
  const categories = categoriesData?.results || [];
  return (
    <footer className="bg-navy-950 text-white pt-20 pb-10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 px-4">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              {siteConfig?.logo ? (
                <NextImage
                  src={siteConfig.logo}
                  alt={siteConfig.business_name || "TechStore"}
                  width={160}
                  height={48}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <>
                  <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    {siteConfig?.business_name ? siteConfig.business_name.charAt(0) : 'T'}
                  </div>
                  <span className="text-2xl font-black tracking-tight">
                    {siteConfig?.business_name || 'TechStore'}
                  </span>
                </>
              )}
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              {siteConfig?.business_details || "Curating the world's most advanced electronics for the modern professional. Precision, performance, and aesthetic."}
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, url: siteConfig?.facebook_url },
                { Icon: Twitter, url: siteConfig?.twitter_url },
                { Icon: Instagram, url: siteConfig?.instagram_url },
                { Icon: Youtube, url: siteConfig?.youtube_url }
              ].map(({ Icon, url }, i) => (
                <a
                  key={i}
                  href={url || "#"}
                  className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand-600 transition-all border border-white/5 hover:border-brand-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              Categories{" "}
              <div className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
            </h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              {categories.length > 0 ? (
                categories.slice(0, 3).map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/category/${cat.slug}`}
                      className="hover:text-brand-400 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <Link
                    href="/category/electronics"
                    className="hover:text-brand-400 transition-colors"
                  >
                    Smart Devices
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              Support <div className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
            </h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li>
                <Link
                  href="/faq"
                  className="hover:text-brand-400 transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/warranty"
                  className="hover:text-brand-400 transition-colors"
                >
                  Warranty & Tech Support
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="hover:text-brand-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              Contact Us{" "}
              <div className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
            </h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-500 shrink-0" />
                <span>
                  {siteConfig?.address || "123 Tech Avenue, Silicon Valley California, 94000, USA"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-500 shrink-0" />
                <span>{siteConfig?.phone || "+977-9800000000"}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-500 shrink-0" />
                <span>{siteConfig?.email || "support@techstore.com"}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-500 font-bold tracking-widest uppercase">
            © {new Date().getFullYear()} {siteConfig?.business_name || 'TechStore'}. Powered by Innovation.
          </p>
          <div className="flex gap-8 text-xs font-bold text-slate-500 tracking-widest uppercase">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-white transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-64 -mt-64 w-[500px] h-[500px] bg-brand-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-64 -mb-64 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
    </footer>
  );
};

export default Footer;
