import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery & Facility",
  description: "Explore the manufacturing facilities, product inventory, and testing capabilities of Shree Raj Steels.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
