import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products — Pipes, Fittings, Flanges & Special Alloys",
  description:
    "Explore our complete range of seamless pipes, elbows, tees, reducers, pipe caps, flanges, flat products and special alloy fittings. All grades and specifications available.",
  alternates: { canonical: "/products" },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
