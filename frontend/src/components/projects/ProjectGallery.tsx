"use client";

import { motion } from "framer-motion";
import type { Project } from "@/types/project";
import ProjectCard from "@/components/projects/ProjectCard";

interface ProjectGalleryProps {
  projects: Project[];
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
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProjectGallery({ projects }: ProjectGalleryProps) {
  if (projects.length === 0) {
    return (
      <div className="py-20 text-center font-mono text-sm text-silver-400">
        // no projects yet
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {projects.map((project) => (
        <motion.div key={project.id} variants={item}>
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
}
