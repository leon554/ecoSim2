import type { ECS } from "entecs";
import { AgentComponents as ac } from "./components";
import type { WorkOffer } from "../util/types";
import { SingletonComponents as sc } from "./components";

export function getAgentsPerTier(ecs: ECS){
    const workersPerTier = new Map<number, number>()
    
    ecs.getComponents(ac.Skill).forEach(s => {
        workersPerTier.set(s.labourTier, (workersPerTier.get(s.labourTier) ?? 0) + 1)
    })

    return workersPerTier
}

export function getOffersPerTier(ecs: ECS){
    const offersPerTier = new Map<number, WorkOffer[]>()

    ecs.getSingletonComponent(sc.WorkOffers).offers
        .sort((a, b) => a.pay - b.pay)
        .forEach(o => {
            offersPerTier.set(o.labourTier, [...(offersPerTier.get(o.labourTier) ?? []), o])
        })

    return offersPerTier
}