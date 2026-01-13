import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { SearchFilter } from "@/components/SearchFilter";
import { ProjectGraph } from "@/components/ProjectGraph";
import { ProjectDetails } from "@/components/ProjectDetails";
import { GraphLegend } from "@/components/GraphLegend";
import { Project, Category } from "@/data/projects";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState<Category[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const isMobile = useIsMobile();

  const handleCategoryToggle = useCallback((category: Category) => {    
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }, []);

  const handleSelectProject = useCallback((project: Project | null) => {
    setSelectedProject(project);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-foreground mb-3">
            Project <span className="text-primary">Network</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore my projects through an interactive graph. Click on project nodes to see details,
            or use filters to focus on specific technologies.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0 space-y-4">
            <SearchFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeCategories={activeCategories}
              onCategoryToggle={handleCategoryToggle}
            />
            {!isMobile && <GraphLegend />}
          </aside>

          {/* Graph Container */}
          <div className="flex-1 min-h-[500px] lg:min-h-[600px]">
            <div className="glass-panel rounded-xl h-full overflow-hidden">
              <ProjectGraph
                searchQuery={searchQuery}
                activeCategories={activeCategories}
                onSelectProject={handleSelectProject}
                selectedProject={selectedProject}
              />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground font-mono">
            <span className="text-primary">●</span> Drag to pan
            <span className="mx-3">|</span>
            <span className="text-primary">●</span> Scroll to zoom
            <span className="mx-3">|</span>
            <span className="text-primary">●</span> Click nodes for details
          </p>
        </div>
      </main>

      {/* Project Details Panel */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetails project={selectedProject} onClose={handleCloseDetails} />
        )}
      </AnimatePresence>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {selectedProject && isMobile && (
          <div
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            onClick={handleCloseDetails}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
