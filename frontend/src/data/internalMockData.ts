export type Program = "B.Tech CSE" | "B.Tech IT" | "MCA";
export type Role = "Software Developer" | "Data Analyst" | "Cloud Engineer";

export const roles: Role[] = ["Software Developer", "Data Analyst", "Cloud Engineer"];
export const programs: Program[] = ["B.Tech CSE", "B.Tech IT", "MCA"];

export const summary = {
  gapScore: 72,
  covered: 38,
  missing: 27,
  excess: 12,
  datasetDate: "13 May 2026",
};

export const topMissingSkills = [
  { skill: "Kubernetes", demand: 92, covered: false },
  { skill: "System Design", demand: 89, covered: false },
  { skill: "AWS", demand: 86, covered: false },
  { skill: "Docker", demand: 84, covered: false },
  { skill: "GraphQL", demand: 73, covered: false },
  { skill: "Kafka", demand: 68, covered: false },
];

export const marketTopSkills = [
  { skill: "JavaScript", score: 95 },
  { skill: "React", score: 89 },
  { skill: "Node.js", score: 86 },
  { skill: "SQL", score: 83 },
  { skill: "AWS", score: 81 },
];

export const coveredSkills = ["DSA", "DBMS", "Operating Systems", "Computer Networks", "OOP"];

export const programComparison = [
  { program: "B.Tech CSE", gap: 72 },
  { program: "B.Tech IT", gap: 64 },
  { program: "MCA", gap: 58 },
];

export const skillCoverageMatrix = [
  { skill: "Docker", cse: false, it: false, mca: true },
  { skill: "Kubernetes", cse: false, it: false, mca: false },
  { skill: "React", cse: true, it: true, mca: true },
  { skill: "AWS", cse: false, it: true, mca: true },
  { skill: "GraphQL", cse: false, it: false, mca: false },
];

export const reportExports = [
  { id: "pdf", label: "Summary PDF", description: "Council-ready summary with gap score and missing skills." },
  { id: "csv", label: "Missing Skills CSV", description: "Machine-readable list of missing and excess skills." },
  { id: "table", label: "Program Comparison CSV", description: "Role vs program comparison for departmental review." },
];
