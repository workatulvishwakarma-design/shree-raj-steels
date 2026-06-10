import blogPostsJson from "./blog-posts.json";

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  author: string;
  publishDate: string;
  readingTime: string;
  featuredImage: string;
  category: 'Pipes' | 'Tubes' | 'Industry Insights' | 'Manufacturing';
  tags: string[];
  sections: { heading: string; level: 'h2' | 'h3'; content: string }[];
  pullQuotes: string[];
}

export const BLOG_CATEGORIES = ['All', 'Pipes', 'Tubes', 'Industry Insights', 'Manufacturing'] as const;

export const BLOG_POSTS: BlogPost[] = blogPostsJson as BlogPost[];
