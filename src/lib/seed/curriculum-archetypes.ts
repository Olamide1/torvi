import { PM_ARCHETYPE_CURRICULUM } from "./curriculum-archetypes-pm";
import { OPS_ARCHETYPE_CURRICULUM } from "./curriculum-archetypes-ops";
import { CONSULTANT_ARCHETYPE_CURRICULUM } from "./curriculum-archetypes-consultant";

export type { ArchetypeGuideData } from "./curriculum-archetypes-pm";

export const ARCHETYPE_CURRICULUM = [
  ...PM_ARCHETYPE_CURRICULUM,
  ...OPS_ARCHETYPE_CURRICULUM,
  ...CONSULTANT_ARCHETYPE_CURRICULUM,
];
