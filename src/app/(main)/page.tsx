import TechStoreHome from "@/components/home/TechStoreHome";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TechStore | Premium Electronics Store",
};

export default function HomePage() {
  return (
    <TechStoreHome />
  );
}
