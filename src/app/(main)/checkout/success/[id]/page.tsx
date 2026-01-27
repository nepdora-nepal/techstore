import OrderSuccessContent from "@/components/checkout/OrderSuccessContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Order Success - TechStore",
    description: "Your order has been placed successfully at TechStore.",
};

export default function OrderSuccessPage() {
    return <OrderSuccessContent />;
}
