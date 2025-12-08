import { Github, Linkedin, Mail } from "lucide-react";

export const Header = () => {
  return (
    <header className="glass-panel border-b border-border/50 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-primary-foreground font-mono font-bold text-lg">D</span>
          </div>
          <div>
            <h1 className="text-lg font-mono font-bold text-foreground">Dev Portfolio</h1>
            <p className="text-xs text-muted-foreground">Explore my projects</p>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
          >
            <Github className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
          >
            <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </a>
          <a
            href="mailto:dev@example.com"
            className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
          >
            <Mail className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </a>
        </nav>
      </div>
    </header>
  );
};
