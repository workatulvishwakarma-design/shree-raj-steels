import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Shree Raj Steels. We are available Monday to Saturday to handle your inquiries regarding pipe fittings, flanges and special alloy products.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
