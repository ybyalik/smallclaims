import type { NeighborIssue } from "./types";
import { propertyDamage } from "./property-damage";
import { deadTreeFell } from "./dead-tree-fell";
import { treeEncroachment } from "./tree-encroachment";
import { noise } from "./noise";
import { harassment } from "./harassment";
import { waterRunoff } from "./water-runoff";
import { fenceDispute } from "./fence-dispute";
import { blockingDriveway } from "./blocking-driveway";
import { constructionDamage } from "./construction-damage";
import { smokeAndOdors } from "./smoke-and-odors";

export const NEIGHBOR_ISSUES: readonly NeighborIssue[] = [
  propertyDamage,
  deadTreeFell,
  treeEncroachment,
  noise,
  harassment,
  waterRunoff,
  fenceDispute,
  blockingDriveway,
  constructionDamage,
  smokeAndOdors,
] as const;

export const NEIGHBOR_ISSUES_BY_SLUG: Record<string, NeighborIssue> = Object.fromEntries(
  NEIGHBOR_ISSUES.map((i) => [i.slug, i])
);

export function getNeighborIssue(slug: string): NeighborIssue | null {
  return NEIGHBOR_ISSUES_BY_SLUG[slug] ?? null;
}

export type { NeighborIssue } from "./types";
