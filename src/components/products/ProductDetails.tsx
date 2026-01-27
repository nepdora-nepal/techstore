import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Share2, Shield, Truck, Plus, Minus, Star, ShoppingCart, Check, RefreshCw } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/hooks/use-cart';
import { useAddToWishlist, useRemoveFromWishlist, useWishlist } from '@/hooks/use-wishlist';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import WishlistButton from './WishlistButton';

interface ProductDetailsProps {
    product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const { data: wishlistItems } = useWishlist();
    const addToWishlistMutation = useAddToWishlist();
    const removeFromWishlistMutation = useRemoveFromWishlist();

    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);

    const isWishlisted = wishlistItems?.some(item => item.product.id === product.id);
    const isWishlistPending = addToWishlistMutation.isPending || removeFromWishlistMutation.isPending;

    const handleWishlistToggle = (active: boolean) => {
        if (!isAuthenticated) {
            toast.error("Please login to add items to wishlist");
            return;
        }

        if (active) {
            addToWishlistMutation.mutate(product.id);
        } else {
            const wishlistItem = wishlistItems?.find(item => item.product.id === product.id);
            if (wishlistItem) {
                removeFromWishlistMutation.mutate(wishlistItem.id);
            }
        }
    };

    const handleAddToCart = () => {
        setAdding(true);
        addToCart(product, quantity);
        toast.success("Added to Bag");
        setTimeout(() => setAdding(false), 2000);
    };

    const reviewsCount = product.reviews_count || 0;
    const price = typeof product.price === 'string' ? parseFloat(product.price) : (product.price || 0);
    const marketPrice = product.market_price ? parseFloat(product.market_price) : price * 1.2;

    return (
        <div className="bg-white">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-10">
                <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
                <span>/</span>
                <Link href={`/collections`} className="hover:text-brand-600 transition-colors">{product.category?.name || "Tech"}</Link>
                <span>/</span>
                <span className="text-navy-950 truncate max-w-[200px]">{product.name}</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-12 mb-20">
                {/* Image Gallery */}
                <div className="lg:w-1/2">
                    <div className="bg-gray-50 rounded-[2.5rem] p-12 border border-gray-100 flex items-center justify-center relative min-h-[500px]">
                        <Image
                            src={product.thumbnail_image || '/images/placeholder.svg'}
                            className="max-h-[500px] w-auto object-contain mix-blend-multiply drop-shadow-2xl"
                            alt={product.name}
                            width={500}
                            height={500}
                            priority
                        />
                        <div className="absolute top-6 right-6 flex flex-col gap-3">
                            <WishlistButton
                                isActive={isWishlisted}
                                isLoading={isWishlistPending}
                                onToggle={handleWishlistToggle}
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="w-12 h-12 bg-white rounded-2xl shadow-xl shadow-gray-200/50 hover:bg-brand-600 hover:text-white transition-all transform hover:scale-110"
                            >
                                <Share2 size={20} />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Product Info */}
                <div className="lg:w-1/2 space-y-8">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="px-3 py-1 bg-brand-50 text-brand-600 text-xs font-black uppercase tracking-wider rounded-lg border border-brand-100">Official TechStore</span>
                            <div className="flex items-center gap-1 text-yellow-500">
                                <Star size={16} className="fill-current" />
                                <span className="text-sm font-bold text-navy-950">{product.average_rating || 0}</span>
                                <span className="text-xs text-gray-400">({reviewsCount} reviews)</span>
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-navy-950 leading-tight mb-4">{product.name}</h1>
                        <div className="flex items-baseline gap-4">
                            <span className="text-4xl font-black text-brand-600">${price.toFixed(2)}</span>
                            <span className="text-xl text-gray-300 line-through">${marketPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    <p className="text-lg text-slate-500 leading-relaxed font-medium">
                        {product.description}
                    </p>

                    <div className="pt-6 space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center border border-gray-200 rounded-2xl p-1 bg-gray-50">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-all shadow-sm active:scale-90"
                                >
                                    <Minus size={20} />
                                </button>
                                <span className="w-12 text-center font-black text-lg">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-all shadow-sm active:scale-90"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={adding}
                                className="flex-1 h-[60px] bg-navy-950 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-sm hover:bg-brand-600 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3"
                            >
                                {adding ? <Check size={20} /> : <ShoppingCart size={20} />}
                                {adding ? 'Added to Bag' : 'Add to Shopping Bag'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                            {[
                                { icon: Truck, title: 'Global Delivery', sub: 'In 3-5 days' },
                                { icon: Shield, title: 'Official Support', sub: '12 Months' },
                                { icon: RefreshCw, title: 'Free Returns', sub: 'Within 30 days' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <item.icon size={20} className="text-brand-600" />
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-navy-950">{item.title}</p>
                                        <p className="text-[10px] text-gray-400 font-bold">{item.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
