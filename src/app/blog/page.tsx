import { Metadata } from 'next';
import BlogContent from '@/components/sections/BlogContent';

export const metadata: Metadata = {
  title: 'Blog & Industry Insights | Shree Raj Steels',
  description: 'Stay updated with the latest trends, manufacturing guides, and technical insights in the steel pipes, tubes, and fittings industry from Shree Raj Steels.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
