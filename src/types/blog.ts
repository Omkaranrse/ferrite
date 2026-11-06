export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  originalUrl: string;
  publishedDate: string;
  formattedDate: string;
  category: string;
  featuredImage: string;
  featuredImageAlt: string;
  excerpt: string;
  readingTime: number;
  content: string;
  headings: TableOfContentsItem[];
  faqs?: FaqItem[];
  relatedSlugs: string[];
}

export interface PaginatedBlogResult {
  posts: BlogPost[];
  totalPages: number;
  totalPosts: number;
  currentPage: number;
}

