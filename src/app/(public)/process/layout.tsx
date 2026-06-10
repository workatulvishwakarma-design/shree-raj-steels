import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manufacturing Process",
  description: "Learn about the manufacturing processes for seamless pipes, ERW pipes, and pipe fittings at Shree Raj Steels.",
};

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
