export type Category = "go" | "rust" | "js" | "python" | "algorithms" | "devops";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: Category;
  features: string[];
  skillsLearned: string[];
}

export const projects: Project[] = [
  {
    id: "microservice-gateway",
    title: "Microservice Gateway",
    description: "A high-performance API gateway built with Go that handles routing, rate limiting, and authentication for microservices architecture.",
    tags: ["Go", "gRPC", "Redis", "Docker", "Kubernetes"],
    category: "go",
    features: [
      "Dynamic service discovery",
      "JWT authentication middleware",
      "Rate limiting with Redis",
      "Health check monitoring",
      "Request/response transformation",
    ],
    skillsLearned: [
      "Concurrent programming in Go",
      "gRPC protocol design",
      "Container orchestration",
      "API gateway patterns",
    ],
  },
  {
    id: "rust-cli-toolkit",
    title: "CLI Toolkit",
    description: "A collection of blazingly fast command-line tools written in Rust for developer productivity.",
    tags: ["Rust", "CLI", "Tokio", "Serde"],
    category: "rust",
    features: [
      "File system watcher",
      "JSON/YAML converter",
      "Git workflow automation",
      "Performance benchmarking",
    ],
    skillsLearned: [
      "Rust ownership and borrowing",
      "Async programming with Tokio",
      "CLI design patterns",
      "Cross-platform compilation",
    ],
  },
  {
    id: "react-state-machine",
    title: "State Machine UI",
    description: "A React application demonstrating finite state machines for complex UI logic and form validation.",
    tags: ["React", "TypeScript", "XState", "Tailwind"],
    category: "js",
    features: [
      "Visual state machine editor",
      "Multi-step form wizard",
      "Real-time validation",
      "State persistence",
    ],
    skillsLearned: [
      "Finite state machine concepts",
      "Complex React state patterns",
      "TypeScript generics",
      "Test-driven development",
    ],
  },
  {
    id: "graph-algorithms-viz",
    title: "Graph Algorithms Visualizer",
    description: "Interactive visualization of classic graph algorithms including pathfinding, spanning trees, and network flow.",
    tags: ["TypeScript", "D3.js", "Algorithms", "Canvas"],
    category: "algorithms",
    features: [
      "Dijkstra's algorithm",
      "A* pathfinding",
      "Minimum spanning tree",
      "Network flow visualization",
    ],
    skillsLearned: [
      "Graph theory fundamentals",
      "Algorithm complexity analysis",
      "Canvas rendering optimization",
      "Interactive data visualization",
    ],
  },
  {
    id: "ml-pipeline",
    title: "ML Training Pipeline",
    description: "An end-to-end machine learning pipeline for training, evaluating, and deploying models.",
    tags: ["Python", "PyTorch", "MLflow", "Docker"],
    category: "python",
    features: [
      "Data preprocessing pipeline",
      "Distributed training",
      "Model versioning",
      "Automated deployment",
    ],
    skillsLearned: [
      "Deep learning fundamentals",
      "MLOps best practices",
      "Data pipeline design",
      "Model optimization",
    ],
  },
  {
    id: "k8s-operator",
    title: "Kubernetes Operator",
    description: "A custom Kubernetes operator for managing stateful applications with automated scaling and recovery.",
    tags: ["Go", "Kubernetes", "Operator SDK", "Prometheus"],
    category: "devops",
    features: [
      "Custom resource definitions",
      "Automated scaling policies",
      "Self-healing capabilities",
      "Metrics integration",
    ],
    skillsLearned: [
      "Kubernetes internals",
      "Operator pattern",
      "Custom controller development",
      "Cloud-native architecture",
    ],
  },
  {
    id: "sorting-visualizer",
    title: "Sorting Algorithm Visualizer",
    description: "Real-time visualization of various sorting algorithms with performance comparisons.",
    tags: ["JavaScript", "Algorithms", "Web Audio", "Animation"],
    category: "algorithms",
    features: [
      "10+ sorting algorithms",
      "Sound feedback",
      "Speed control",
      "Step-by-step mode",
    ],
    skillsLearned: [
      "Sorting algorithm complexity",
      "Audio API usage",
      "Animation optimization",
      "Algorithm comparison",
    ],
  },
  {
    id: "rust-wasm-image",
    title: "WASM Image Processor",
    description: "High-performance image processing library compiled to WebAssembly for browser-based editing.",
    tags: ["Rust", "WebAssembly", "Image Processing", "SIMD"],
    category: "rust",
    features: [
      "Real-time filters",
      "Batch processing",
      "Format conversion",
      "SIMD optimization",
    ],
    skillsLearned: [
      "WebAssembly integration",
      "Image processing algorithms",
      "SIMD programming",
      "Memory management",
    ],
  },
  {
    id: "node-event-system",
    title: "Event-Driven System",
    description: "A scalable event-driven architecture with message queuing and event sourcing patterns.",
    tags: ["Node.js", "TypeScript", "RabbitMQ", "PostgreSQL"],
    category: "js",
    features: [
      "Event sourcing",
      "CQRS pattern",
      "Message replay",
      "Dead letter handling",
    ],
    skillsLearned: [
      "Event-driven architecture",
      "Message queue patterns",
      "Database transactions",
      "System resilience",
    ],
  },
  {
    id: "go-distributed-cache",
    title: "Distributed Cache",
    description: "A distributed caching system with consistent hashing and replication for high availability.",
    tags: ["Go", "Distributed Systems", "Raft", "gRPC"],
    category: "go",
    features: [
      "Consistent hashing",
      "Raft consensus",
      "Auto-rebalancing",
      "Hot key detection",
    ],
    skillsLearned: [
      "Distributed systems design",
      "Consensus algorithms",
      "Cache invalidation strategies",
      "Networking protocols",
    ],
  },
];

export const categories: { id: Category; label: string; color: string }[] = [
  { id: "go", label: "Go", color: "tech-go" },
  { id: "rust", label: "Rust", color: "tech-rust" },
  { id: "js", label: "JavaScript", color: "tech-js" },
  { id: "python", label: "Python", color: "tech-python" },
  { id: "algorithms", label: "Algorithms", color: "tech-algorithms" },
  { id: "devops", label: "DevOps", color: "tech-devops" },
];

export const getAllTags = (): string[] => {
  const tagSet = new Set<string>();
  projects.forEach((project) => {
    project.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
};

export const getCategoryColor = (category: Category): string => {
  const colors: Record<Category, string> = {
    go: "#00ADD8",
    rust: "#F74C00",
    js: "#F7DF1E",
    python: "#3776AB",
    algorithms: "#A855F7",
    devops: "#22C55E",
  };
  return colors[category];
};

export const getTagCategory = (tag: string): Category => {
  const tagToCategory: Record<string, Category> = {
    Go: "go",
    gRPC: "go",
    Rust: "rust",
    Tokio: "rust",
    WebAssembly: "rust",
    React: "js",
    TypeScript: "js",
    JavaScript: "js",
    "Node.js": "js",
    XState: "js",
    "D3.js": "js",
    Python: "python",
    PyTorch: "python",
    MLflow: "python",
    Algorithms: "algorithms",
    Canvas: "algorithms",
    Animation: "algorithms",
    Docker: "devops",
    Kubernetes: "devops",
    Redis: "devops",
    Prometheus: "devops",
    RabbitMQ: "devops",
    PostgreSQL: "devops",
  };
  return tagToCategory[tag] || "devops";
};
