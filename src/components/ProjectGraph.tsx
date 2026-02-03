import { useEffect, useRef, useCallback, useState } from "react";
import { Network, Options, Data } from "vis-network";
import { DataSet } from "vis-data";
import { projects, Project, Category, getCategoryColor, getTagCategory } from "@/data/projects";

interface ProjectGraphProps {
  searchQuery: string;
  activeCategories: Category[];
  onSelectProject: (project: Project | null) => void;
  selectedProject: Project | null;
}

interface NodeData {
  id: string;
  label: string;
  type: "project" | "tag";
  projectData?: Project;
  category?: Category;
}

export const ProjectGraph = ({
  searchQuery,
  activeCategories,
  onSelectProject,
  selectedProject,
}: ProjectGraphProps) => {

  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const getFilteredData = useCallback((): Data => {
    const filteredProjects = projects.filter((project) => {
      const matchesCategory = activeCategories.length === 0 || activeCategories.includes(project.category);
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });

    const nodes: NodeData[] = [];
    const edges: { from: string; to: string; color?: string }[] = [];
    const tagSet = new Set<string>();

    // Add project nodes
    filteredProjects.forEach((project) => {
      nodes.push({
        id: project.id,
        label: project.title,
        type: "project",
        projectData: project,
        category: project.category,
      });

      project.tags.forEach((tag) => {
        tagSet.add(tag);
        edges.push({
          from: project.id,
          to: `tag-${tag}`,
          color: getCategoryColor(getTagCategory(tag)) + "40",
        });
      });
    });

    // Add tag nodes
    tagSet.forEach((tag) => {
      const category = getTagCategory(tag);
      nodes.push({
        id: `tag-${tag}`,
        label: tag,
        type: "tag",
        category,
      });
    });

    const visNodes = new DataSet(
      nodes.map((node) => ({
        id: node.id,
        label: node.label,
        shape: node.type === "project" ? "dot" : "diamond",
        size: node.type === "project" ? 25 : 15,
        color: {
          background: node.type === "project"
            ? getCategoryColor(node.category!)
            : getCategoryColor(node.category!) + "80",
          border: node.type === "project"
            ? getCategoryColor(node.category!)
            : getCategoryColor(node.category!),
          highlight: {
            background: getCategoryColor(node.category!),
            border: "#ffffff",
          },
          hover: {
            background: getCategoryColor(node.category!),
            border: "#ffffff",
          },
        },
        font: {
          color: "#E2E8F0",
          size: node.type === "project" ? 14 : 11,
          face: "JetBrains Mono, monospace",
        },
        borderWidth: 2,
        shadow: {
          enabled: true,
          color: getCategoryColor(node.category!) + "40",
          size: 10,
          x: 0,
          y: 0,
        },
        title: node.type === "project" ? node.projectData?.description : node.label,
      }))
    );

    const visEdges = new DataSet(
      edges.map((edge, index) => ({
        id: index,
        from: edge.from,
        to: edge.to,
        color: {
          color: edge.color || "#334155",
          highlight: "#22D3EE",
          hover: "#22D3EE",
        },
        width: 1,
        smooth: {
          enabled: true,
          type: "continuous",
          roundness: 0.5,
        },
      }))
    );

    return { nodes: visNodes, edges: visEdges };
  }, [searchQuery, activeCategories]);

  useEffect(() => {

    if (!containerRef.current) return;

    const data = getFilteredData();

    const options: Options = {
      autoResize: true,
      nodes: {
        shape: "dot",
        scaling: {
          min: 10,
          max: 30,
        },
      },
      edges: {
        width: 1,
        smooth: {
          enabled: true,
          type: "continuous",
          roundness: 0.5,
        },
      },
      physics: {
        enabled: true,
        barnesHut: {
          gravitationalConstant: -3000,
          centralGravity: 0.3,
          springLength: 150,
          springConstant: 0.04,
          damping: 0.09,
        },
        stabilization: {
          enabled: true,
          iterations: 100,
          updateInterval: 25,
        },
      },
      interaction: {
        hover: true,
        hoverConnectedEdges: true,
        selectConnectedEdges: true,
        tooltipDelay: 200,
        zoomView: true,
        dragView: true,
        dragNodes: true,
      },
      layout: {
        improvedLayout: true,
        randomSeed: 42,
      },
    };

    const network = new Network(containerRef.current, data, options);
    networkRef.current = network;

    network.on("click", (params) => {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0] as string;
        if (!nodeId.startsWith("tag-")) {

          const project = projects.find((p) => p.id === nodeId);
          if (project) {
            onSelectProject(project);
          }
        }
      } else {
        onSelectProject(null);
      }
    });

    network.on("hoverNode", (params) => {
      if (!params) return;
      console.log("hoverNode", params);

      setHoveredNode(params.node as string);
      const connectedNodes = network.getConnectedNodes(params.node);
      const connectedEdges = network.getConnectedEdges(params.node);

      // Highlight connected nodes and edges
      network.selectNodes([params.node, ...connectedNodes] as string[]);
    });

    network.on("blurNode", () => {

      console.log("blurNode");

      setHoveredNode(null);
      if (!selectedProject) {
        network.unselectAll();
      }
    });

    return () => {
      network.destroy();
    };
  }, [getFilteredData, onSelectProject]);

  // Highlight selected project
  useEffect(() => {

    if (networkRef.current && selectedProject) {
      networkRef.current.selectNodes([selectedProject.id]);
      networkRef.current.focus(selectedProject.id, {
        scale: 1.2,
        animation: {
          duration: 500,
          easingFunction: "easeInOutQuad",
        },
      });
    }
  }, [selectedProject]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[100vh] min-h-[400px] rounded-lg bg-gradient-to-br from-background via-card to-background overflow-auto"
    />

  );
};
