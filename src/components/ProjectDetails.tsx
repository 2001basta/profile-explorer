import { motion, AnimatePresence } from "framer-motion";
import { X, Code2, Lightbulb, Tag, ChevronDown } from "lucide-react";
import { Project, getCategoryColor } from "@/data/projects";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface ProjectDetailsProps {
  project: Project | null;
  onClose: () => void;
}

const getTechTagClass = (category: string): string => {
  const classes: Record<string, string> = {
    go: "tech-tag-go",
    rust: "tech-tag-rust",
    js: "tech-tag-js",
    python: "tech-tag-python",
    algorithms: "tech-tag-algorithms",
    devops: "tech-tag-devops",
  };
  return classes[category] || "tech-tag-devops";
};

export const ProjectDetails = ({ project, onClose }: ProjectDetailsProps) => {
  const isMobile = useIsMobile();

  if (!project) return null;

  const categoryColor = getCategoryColor(project.category);

  // Mobile: Bottom drawer
  if (isMobile) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed inset-x-0 bottom-0 z-50 max-h-[80vh] overflow-hidden"
        >
          <div className="glass-panel rounded-t-2xl shadow-2xl">
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between px-5 pb-4">
              <div className="flex-1">
                <div
                  className="inline-block w-3 h-3 rounded-full mr-2 mb-1"
                  style={{ backgroundColor: categoryColor }}
                />
                <h2 className="text-xl font-mono font-bold text-foreground inline">
                  {project.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="px-5 pb-8 overflow-y-auto max-h-[60vh] space-y-5">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-primary" />
                  <span className="text-sm font-mono text-muted-foreground">Technologies</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn("tech-tag", getTechTagClass(project.category))}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-mono text-muted-foreground">Features</span>
                </div>
                <ul className="space-y-1.5">
                  {project.features.map((feature, index) => (
                    <li
                      key={index}
                      className="text-sm text-foreground/90 flex items-start gap-2"
                    >
                      <span className="text-primary mt-1.5">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-accent" />
                  <span className="text-sm font-mono text-muted-foreground">Skills Learned</span>
                </div>
                <ul className="space-y-1.5">
                  {project.skillsLearned.map((skill, index) => (
                    <li
                      key={index}
                      className="text-sm text-foreground/90 flex items-start gap-2"
                    >
                      <span className="text-accent mt-1.5">✦</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Desktop: Side panel
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50"
      >
        <div className="h-full glass-panel border-l shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-border/50">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full glow-primary"
                    style={{ backgroundColor: categoryColor, boxShadow: `0 0 12px ${categoryColor}60` }}
                  />
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
                <h2 className="text-2xl font-mono font-bold text-foreground">
                  {project.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors group"
              >
                <X className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            {/* Tags */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono text-muted-foreground">Technologies</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={cn("tech-tag", getTechTagClass(project.category))}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono text-muted-foreground">Features</span>
              </div>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="text-sm text-foreground/90 flex items-start gap-2"
                  >
                    <span className="text-primary mt-0.5">▸</span>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Skills Learned */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-accent" />
                <span className="text-sm font-mono text-muted-foreground">Skills Learned</span>
              </div>
              <ul className="space-y-2">
                {project.skillsLearned.map((skill, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="text-sm text-foreground/90 flex items-start gap-2"
                  >
                    <span className="text-accent mt-0.5">✦</span>
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
