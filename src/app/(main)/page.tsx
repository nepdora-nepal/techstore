import TechStoreHome from "@/components/home/TechStoreHome";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "TechStore | Premium Electronics Store",
};

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TechStoreHome />
    </Suspense>
  );
}
