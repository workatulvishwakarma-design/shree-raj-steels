import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Data & Dimension Tables",
  description: "Comprehensive technical specifications, dimensions, and weights for pipes, fittings, and flanges.",
};

export default function TechnicalDataLayout({ children }: { children: React.ReactNode }) {
  return children;
}
