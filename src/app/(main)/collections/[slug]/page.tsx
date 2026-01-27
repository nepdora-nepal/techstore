import ProductDetailsView from "@/components/products/ProductDetailsView";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Product Details - TechStore",
    description: "View product details and purchase at TechStore.",
};

export default function ProductDetailsPage() {
    return <ProductDetailsView />;
}
