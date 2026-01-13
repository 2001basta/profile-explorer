import { Search, Filter } from "lucide-react";
import { Category, categories } from "@/data/projects";
import { cn } from "@/lib/utils";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategories: Category[];
  onCategoryToggle: (category: Category) => void;
}

const getCategoryStyles = (category: Category, isActive: boolean) => {
  const baseStyles: Record<Category, { active: string; inactive: string }> = {
    go: {
      active: "bg-tech-go/20 text-tech-go border-tech-go/50",
      inactive: "bg-secondary/50 text-muted-foreground border-border hover:border-tech-go/30 hover:text-tech-go",
    },
    rust: {
      active: "bg-tech-rust/20 text-tech-rust border-tech-rust/50",
      inactive: "bg-secondary/50 text-muted-foreground border-border hover:border-tech-rust/30 hover:text-tech-rust",
    },
    js: {
      active: "bg-tech-js/20 text-tech-js border-tech-js/50",
      inactive: "bg-secondary/50 text-muted-foreground border-border hover:border-tech-js/30 hover:text-tech-js",
    },
    python: {
      active: "bg-tech-python/20 text-tech-python border-tech-python/50",
      inactive: "bg-secondary/50 text-muted-foreground border-border hover:border-tech-python/30 hover:text-tech-python",
    },
    algorithms: {
      active: "bg-tech-algorithms/20 text-tech-algorithms border-tech-algorithms/50",
      inactive: "bg-secondary/50 text-muted-foreground border-border hover:border-tech-algorithms/30 hover:text-tech-algorithms",
    },
    devops: {
      active: "bg-tech-devops/20 text-tech-devops border-tech-devops/50",
      inactive: "bg-secondary/50 text-muted-foreground border-border hover:border-tech-devops/30 hover:text-tech-devops",
    },
    java: {
      active: "bg-blue-500/20 text-blue-400 border-blue-500/50",
      inactive: "bg-secondary/50 text-muted-foreground border-border hover:border-blue-500/30 hover:text-blue-400",
    },
    sh: {
      active: "bg-green-500/20 text-green-400 border-green-500/50",
      inactive: "bg-secondary/50 text-muted-foreground border-border hover:border-green-500/30 hover:text-green-400",
    },
    sql: {
      active: "bg-orange-500/20 text-orange-400 border-orange-500/50",
      inactive: "bg-secondary/50 text-muted-foreground border-border hover:border-orange-500/30 hover:text-orange-400",
    },
    html: {
      active: "bg-orange-600/20 text-orange-400 border-orange-600/50",
      inactive: "bg-secondary/50 text-muted-foreground border-border hover:border-orange-600/30 hover:text-orange-400",
    },
    css: {
      active: "bg-blue-600/20 text-blue-400 border-blue-600/50",
      inactive: "bg-secondary/50 text-muted-foreground border-border hover:border-blue-600/30 hover:text-blue-400",
    },
    docker: {
      active: "bg-sky-500/20 text-sky-400 border-sky-500/50",
      inactive: "bg-secondary/50 text-muted-foreground border-border hover:border-sky-500/30 hover:text-sky-400",
    },
    frontend: {
      active: "bg-pink-500/20 text-pink-400 border-pink-500/50",
      inactive: "bg-secondary/50 text-muted-foreground border-border hover:border-pink-500/30 hover:text-pink-400",
    },
    backend: {
      active: "bg-indigo-500/20 text-indigo-400 border-indigo-500/50",
      inactive: "bg-secondary/50 text-muted-foreground border-border hover:border-indigo-500/30 hover:text-indigo-400",
    },
    game: {
      active: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
      inactive: "bg-secondary/50 text-muted-foreground border-border hover:border-yellow-500/30 hover:text-yellow-400",
    },
    auth: {
      active: "bg-purple-600/20 text-purple-400 border-purple-600/50",
      inactive: "bg-secondary/50 text-muted-foreground border-border hover:border-purple-600/30 hover:text-purple-400",
    },
    ui: {
      active: "bg-amber-500/20 text-amber-400 border-amber-500/50",
      inactive: "bg-secondary/50 text-muted-foreground border-border hover:border-amber-500/30 hover:text-amber-400",
    },
    ux: {
      active: "bg-amber-500/20 text-amber-400 border-amber-500/50",
      inactive: "bg-secondary/50 text-muted-foreground border-border hover:border-amber-500/30 hover:text-amber-400",
    },
    unix: {
      active: "bg-amber-500/20 text-amber-400 border-amber-500/50",
      inactive: "bg-secondary/50 text-muted-foreground border-border hover:border-amber-500/30 hover:text-amber-400",
    },
  };

  return isActive ? baseStyles[category].active : baseStyles[category].inactive;
};

export const SearchFilter = ({
  searchQuery,
  onSearchChange,
  activeCategories,
  onCategoryToggle,
}: SearchFilterProps) => {
  return (
    <div className="glass-panel rounded-xl p-4 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search projects or technologies..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 border border-border/50 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all font-mono"
        />
      </div>

      {/* Category Filters */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            Filter by category
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = activeCategories.includes(category.id);
            return (
              <button
                key={category.id}
                onClick={() => onCategoryToggle(category.id)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all duration-200",
                  getCategoryStyles(category.id, isActive)
                )}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};