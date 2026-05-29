'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Clock, Calendar, ArrowRight, Tag } from 'lucide-react';
import { BLOG_POSTS, BLOG_CATEGORIES, BlogPost } from '@/data/blog-posts';
import Breadcrumb from '@/components/ui/Breadcrumb';

export default function BlogContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<typeof BLOG_CATEGORIES[number]>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Filter posts
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy-900 pt-28 pb-16 relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 bg-grid-texture"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-navy-800 to-transparent"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb 
            items={[
              { label: "Home", href: "/" }, 
              { label: "Blog" }
            ]} 
          />
          
          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-[family-name:var(--font-playfair)] font-bold text-white leading-tight mb-6">
              Steel Industry Insights &amp; Knowledge
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Expert guides, manufacturing insights, and the latest trends in the steel pipes, tubes, and fittings industry.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl">
              <input 
                type="text" 
                placeholder="Search articles, topics, or tags..." 
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-white/10 border border-white/20 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="py-20 bg-[#F8F6F0] min-h-[500px]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Categories Filter */}
          <div className="flex flex-wrap items-center gap-3 mb-12 border-b border-gray-200 pb-6">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-wider mr-2">Filter by:</span>
            {BLOG_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === category 
                    ? 'bg-navy-900 text-white shadow-md' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gold-500 hover:text-navy-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="mb-8 text-gray-500 text-sm">
            Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, filteredPosts.length)} of {filteredPosts.length} articles
          </div>

          {/* Blog Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post: BlogPost) => (
                <article 
                  key={post.slug} 
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-gold-500/30 transition-all duration-300 group flex flex-col h-full"
                >
                  {/* Image Container */}
                  <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/9] overflow-hidden">
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 bg-gold-500 text-navy-900 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                        {post.category}
                      </span>
                    </div>
                    {post.featuredImage ? (
                      <Image 
                        src={post.featuredImage} 
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-navy-800 to-navy-600" />
                    )}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                  </Link>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(post.publishDate)}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readingTime}
                      </div>
                    </div>

                    <Link href={`/blog/${post.slug}`} className="block group-hover:text-gold-600 transition-colors">
                      <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-navy-900 mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="pt-4 border-t border-gray-100 mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center">
                          <span className="text-navy-900 font-bold text-xs">S</span>
                        </div>
                        <span className="text-sm font-semibold text-navy-900">{post.author}</span>
                      </div>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="flex items-center gap-1 text-sm font-bold text-gold-500 group-hover:text-gold-600 transition-colors"
                      >
                        Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-navy-900 mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search term or category filter.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All');
                }}
                className="mt-6 px-6 py-2 bg-navy-900 text-white font-semibold rounded-lg hover:bg-navy-800 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-200 bg-white text-navy-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gold-500 transition-colors"
              >
                &larr;
              </button>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold transition-colors ${
                    currentPage === i + 1 
                      ? 'bg-gold-500 text-white border-gold-500' 
                      : 'border border-gray-200 bg-white text-navy-900 hover:bg-gray-50 hover:border-gold-500'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-200 bg-white text-navy-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gold-500 transition-colors"
              >
                &rarr;
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
