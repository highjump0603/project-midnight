"use client";

import { motion } from "framer-motion";
import type { BlogPost } from "@/types/blog";
import BlogCard from "@/components/blog/BlogCard";

interface PostGalleryProps {
  posts: BlogPost[];
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PostGallery({ posts }: PostGalleryProps) {
  if (posts.length === 0) {
    return (
      <div className="py-20 text-center font-mono text-sm text-silver-400">
        // no posts yet
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      {posts.map((post) => (
        <motion.div key={post.id} variants={item}>
          <BlogCard post={post} />
        </motion.div>
      ))}
    </motion.div>
  );
}
