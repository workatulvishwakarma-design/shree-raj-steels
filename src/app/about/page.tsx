import type { Metadata } from "next";
import { AboutContent } from "@/components/sections/AboutContent";

export const metadata: Metadata = {
  title: "About Us | 40+ Years in Pipe & Fittings Manufacturing",
  description: "Learn about Shree Raj Steels — a multi-functional enterprise integrating R&D, manufacturing, sales and service in pipes, fittings and flanges. ISO + PED certified.",
};

export default function AboutPage() {
  return <AboutContent />;
}
