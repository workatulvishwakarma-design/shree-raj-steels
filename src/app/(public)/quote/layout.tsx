import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Get a detailed quote for pipe fittings, flanges and special alloy products from Shree Raj Steels.",
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
