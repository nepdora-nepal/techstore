import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Shield, Truck, Plus, Minus, Star, ShoppingCart, Check, RefreshCw } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/hooks/use-cart';
import { useAddToWishlist, useRemoveFromWishlist, useWishlist } from '@/hooks/use-wishlist';
import { useAuth } from '@/hooks/use-auth';
import { getImageUrl } from '@/config/site';
import { toast } from 'sonner';
import WishlistButton from './WishlistButton';
import { sanitizeHtmlContent } from '@/utils/html-sanitizer';

interface ProductDetailsProps {
    product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const { data: wishlistItems } = useWishlist();
    const addToWishlistMutation = useAddToWishlist();
    const removeFromWishlistMutation = useRemoveFromWishlist();
    const [selectedImage, setSelectedImage] = useState<string | null>(product.thumbnail_image);

    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);

    const isWishlisted = wishlistItems?.some(item => item.product.id === product.id);
    const isWishlistPending = addToWishlistMutation.isPending || removeFromWishlistMutation.isPending;
    const images = product.images && product.images.length > 0
        ? product.images.map(img => img.image)
        : [product.thumbnail_image].filter((img): img is string => !!img);

    const reviewsCount = product.reviews_count || 0;
    const price = typeof product.price === 'string' ? parseFloat(product.price) : (product.price || 0);
    const marketPrice = product.market_price ? parseFloat(product.market_price) : price * 1.2;
    const discountPercentage = marketPrice > price
        ? Math.round(((marketPrice - price) / marketPrice) * 100)
        : 0;

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

    return (
        <div className="min-h-screen bg-white py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb */}
                <nav className="text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-brand-600">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href={`/collections`} className="capitalize hover:text-brand-600">
                        {product.category?.name || "Tech"}
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 truncate">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-20">

                    {/* Image Gallery Section */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-8 overflow-hidden shadow-sm group relative">
                            <Image
                                src={getImageUrl(selectedImage || product.thumbnail_image || "") || '/images/placeholder.svg'}
                                alt={product.name}
                                width={600}
                                height={600}
                                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-4 right-4 flex flex-col gap-2">
                                <WishlistButton
                                    isActive={isWishlisted}
                                    isLoading={isWishlistPending}
                                    onToggle={handleWishlistToggle}
                                />

                            </div>
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        className={`aspect-square border rounded-lg p-2 flex items-center justify-center transition-all ${selectedImage === img ? 'border-brand-600 ring-1 ring-brand-600' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={getImageUrl(img || "") || '/images/placeholder.svg'}
                                                alt={`Thumbnail ${idx + 1}`}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">{product.name}</h1>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded text-yellow-700 font-bold text-sm border border-yellow-100">
                                <span className="text-base">{product.average_rating || 0}</span>
                                <Star className="fill-yellow-400 text-yellow-400 w-4 h-4" />
                            </div>
                            <span className="text-gray-400 text-sm">Based on {reviewsCount} reviews</span>
                            <span className="text-gray-300">|</span>
                            <span className="text-green-600 font-medium text-sm flex items-center gap-1">
                                <Shield size={14} /> In Stock
                            </span>
                        </div>

                        <div className="flex items-baseline gap-4 mb-8">
                            <span className="text-4xl font-bold text-slate-900">${price.toFixed(2)}</span>
                            {marketPrice > price && (
                                <>
                                    <span className="text-xl text-gray-400 line-through">${marketPrice.toFixed(2)}</span>
                                    <span className="text-red-600 font-bold bg-red-50 px-2 py-1 rounded-md text-sm">
                                        Save {discountPercentage}%
                                    </span>
                                </>
                            )}
                        </div>

                        <div className="text-gray-600 leading-relaxed mb-8 border-b border-gray-100 pb-8"
                            dangerouslySetInnerHTML={{ __html: sanitizeHtmlContent(product.description || "") }}>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <div className="flex items-center border border-gray-300 rounded-full w-max">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-3 hover:bg-gray-50 text-gray-600 rounded-l-full transition-colors"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="font-semibold w-8 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-3 hover:bg-gray-50 text-gray-600 rounded-r-full transition-colors"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={adding}
                                className={`
                                    flex-1 font-bold py-3 px-8 rounded-full shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95
                                    ${adding ? 'bg-green-600 text-white shadow-green-200' : 'bg-brand-600 text-white hover:bg-brand-700 hover:shadow-brand-500/25'}
                                `}
                            >
                                {adding ? (
                                    <>
                                        <Check size={20} className="animate-bounce" /> Added to Cart
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart size={20} /> Add to Cart
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Value Props */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <Truck className="text-gray-500" size={20} />
                                <div className="text-sm">
                                    <p className="font-semibold text-gray-900">Global Delivery</p>
                                    <p className="text-gray-500">In 3-5 days</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <RefreshCw className="text-gray-500" size={20} />
                                <div className="text-sm">
                                    <p className="font-semibold text-gray-900">Free Returns</p>
                                    <p className="text-gray-500">Within 30 days</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;