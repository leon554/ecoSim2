import type { ECS } from "entecs";
import { AgentComponents as ac } from "./components";

export function getAgentsPerTier(ecs: ECS){
    const workersPerTier = new Map<number, number>()
    
    ecs.getComponents(ac.Skill).forEach(s => {
        workersPerTier.set(s.labourTier, (workersPerTier.get(s.labourTier) ?? 0) + 1)
    })

    return workersPerTier
}