import { categories } from "@/data/projects";

export const GraphLegend = () => {
  return (
    <div className="glass-panel rounded-xl p-4">
      <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
        Legend
      </h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-node-project shadow-lg" />
          <span className="text-sm text-foreground">Project</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rotate-45 bg-muted-foreground/50 border border-muted-foreground" />
          <span className="text-sm text-foreground">Technology</span>
        </div>
        <div className="h-px bg-border my-3" />
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: `hsl(var(--tech-${cat.id}))`,
                }}
              />
              <span className="text-xs text-muted-foreground">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
