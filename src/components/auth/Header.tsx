import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        <Link href="/" className="flex items-center gap-3 py-5 w-fit group">
          {/* Logo box */}
          <div className="w-11 h-11 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center text-white font-extrabold text-2xl tracking-tight shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform">
            T
          </div>

          {/* Brand name */}
          <span className="text-2xl font-bold tracking-tight text-navy-950 hidden sm:block group-hover:text-brand-600 transition-colors">
            TechStore
          </span>
        </Link>
      </div>
    </header>
  );
}
