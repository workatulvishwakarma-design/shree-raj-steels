import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ChevronLeft, ArrowRight, Share2, FileText, ChevronRight } from "lucide-react";
import { BLOG_POSTS } from "@/data/blog-posts";
import Breadcrumb from "@/components/ui/Breadcrumb";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  
  if (!post) {
    return { title: "Post Not Found" };
  }
  
  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Get 3 related posts (same category or random)
  const relatedPosts = BLOG_POSTS
    .filter(p => p.slug !== post.slug)
    .sort((a, b) => {
      if (a.category === post.category && b.category !== post.category) return -1;
      if (a.category !== post.category && b.category === post.category) return 1;
      return 0;
    })
    .slice(0, 3);

  // Schema.org Article markup
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [
      `https://www.shreerajsteels.com${post.featuredImage}`
    ],
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "author": [{
      "@type": "Person",
      "name": post.author,
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Shree Raj Steels",
    },
    "description": post.seoDescription
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Convert headings to safe IDs
  const getHeadingId = (heading: string) => {
    return heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-navy-900 pt-28 pb-20 relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 bg-grid-texture"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-navy-800 to-transparent"></div>

        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex justify-center mb-6">
            <Breadcrumb 
              items={[
                { label: "Home", href: "/" }, 
                { label: "Blog", href: "/blog" },
                { label: "Article" }
              ]} 
            />
          </div>
          
          <div className="inline-block px-4 py-1.5 bg-gold-500 text-navy-900 text-xs font-bold tracking-wider uppercase rounded-full mb-6">
            {post.category}
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-playfair)] font-bold text-white leading-tight mb-8">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300 font-medium">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gold-500" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gold-500" />
              <span>{formatDate(post.publishDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold-500" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="aspect-[21/9] w-full relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
          {post.featuredImage ? (
            <Image 
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-navy-800" />
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Sidebar (Table of Contents) */}
            <div className="lg:w-1/4 hidden lg:block">
              <div className="sticky top-32">
                <h3 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-4">
                  <FileText className="w-5 h-5 text-gold-500" />
                  Table of Contents
                </h3>
                <nav className="flex flex-col gap-3">
                  {post.sections.map((section, idx) => (
                    <a 
                      key={idx} 
                      href={`#${getHeadingId(section.heading)}`}
                      className={`text-sm hover:text-gold-600 transition-colors ${
                        section.level === 'h2' ? 'font-semibold text-gray-800' : 'text-gray-500 pl-4'
                      }`}
                    >
                      {section.heading}
                    </a>
                  ))}
                </nav>

                {/* Tags */}
                <div className="mt-12">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div className="mt-12">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Share2 className="w-4 h-4" /> Share Article
                  </h3>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-full bg-navy-50 flex items-center justify-center text-navy-900 hover:bg-gold-500 hover:text-white transition-colors">
                      <span className="font-bold text-sm">in</span>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-navy-50 flex items-center justify-center text-navy-900 hover:bg-gold-500 hover:text-white transition-colors">
                      <span className="font-bold text-sm">X</span>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-navy-50 flex items-center justify-center text-navy-900 hover:bg-gold-500 hover:text-white transition-colors" title="Copy Link">
                      <FileText className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Article Body */}
            <article className="lg:w-3/4">
              <div className="prose prose-lg prose-navy max-w-none">
                
                {/* Introduction / Excerpt */}
                <p className="text-xl text-gray-600 leading-relaxed font-medium mb-10 border-l-4 border-gold-500 pl-6">
                  {post.excerpt}
                </p>

                {/* Sections */}
                {post.sections.map((section, idx) => (
                  <div key={idx} className="mb-10">
                    {section.level === 'h2' ? (
                      <h2 
                        id={getHeadingId(section.heading)}
                        className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-navy-900 mb-6 mt-12 scroll-mt-32"
                      >
                        {section.heading}
                      </h2>
                    ) : (
                      <h3 
                        id={getHeadingId(section.heading)}
                        className="text-2xl font-[family-name:var(--font-playfair)] font-semibold text-navy-800 mb-4 mt-8 scroll-mt-32"
                      >
                        {section.heading}
                      </h3>
                    )}
                    
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {section.content}
                    </p>

                    {/* Insert a pull quote after the second section if available */}
                    {idx === 1 && post.pullQuotes.length > 0 && (
                      <div className="my-12 p-8 bg-navy-50 rounded-2xl relative">
                        <div className="absolute top-4 left-4 text-gold-500/20 text-6xl font-serif leading-none">"</div>
                        <p className="text-xl md:text-2xl font-[family-name:var(--font-playfair)] text-navy-900 font-bold italic relative z-10 text-center px-4">
                          {post.pullQuotes[0]}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Author Bio */}
              <div className="mt-16 pt-8 border-t border-gray-100 flex items-center gap-6 bg-gray-50 p-8 rounded-2xl">
                <div className="w-16 h-16 rounded-full bg-navy-900 flex items-center justify-center text-gold-500 flex-shrink-0">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-navy-900 mb-1">Written by {post.author}</h4>
                  <p className="text-sm text-gray-600">The engineering and research team at Shree Raj Steels, bringing you over 40 years of industry expertise.</p>
                </div>
              </div>

            </article>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-navy-900 py-16">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-white mb-6">
            Looking for Premium Steel Pipes & Fittings?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact Shree Raj Steels for bulk requirements, technical consultation, and competitive pricing on industrial piping materials.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/quote" className="px-8 py-4 bg-gold-500 text-navy-900 font-bold rounded-lg hover:bg-gold-400 transition-colors">
              Request a Quote
            </Link>
            <Link href="/contact" className="px-8 py-4 border border-white/20 text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-[#F8F6F0]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-navy-900 mb-4">
                  Related Articles
                </h2>
                <p className="text-gray-600">Continue reading our latest industry insights.</p>
              </div>
              <Link href="/blog" className="hidden sm:flex items-center gap-2 text-gold-500 font-bold hover:text-gold-600 transition-colors">
                View All Posts <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:border-gold-500/30 hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[16/9] relative overflow-hidden bg-navy-800">
                    {related.featuredImage && (
                      <Image 
                        src={related.featuredImage}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                  </div>
                  <div className="p-6">
                    <div className="text-xs font-bold text-gold-500 uppercase tracking-wider mb-2">
                      {related.category}
                    </div>
                    <h3 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-navy-900 mb-3 group-hover:text-gold-600 transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500">{formatDate(related.publishDate)}</span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gold-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-10 text-center sm:hidden">
              <Link href="/blog" className="inline-flex items-center gap-2 text-gold-500 font-bold hover:text-gold-600 transition-colors">
                View All Posts <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
