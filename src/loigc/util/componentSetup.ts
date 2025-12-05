import type { ECS } from "entecs";
import { AgentComponents as AC, GeneralComponents as GC, FirmComponents as FC, SingletonComponents as SC} from "../ecs/components";
import { STARTING_AGENT_INVETORY, STARTING_FIRM_INVETORY } from "./constants";


export function createBaseAgents(ecs: ECS, amt: number){
    const ids = ecs.createEntities(amt)

    ids.forEach(id => {
        ecs.addComponent(id, new AC.Age())
        ecs.addComponent(id, new AC.Employment())
        ecs.addComponent(id, new AC.QOL())
        ecs.addComponent(id, new AC.Skill())
        ecs.addComponent(id, new AC.Wallet())
        const inv = new GC.Inventory()
        inv.invetory = {...STARTING_AGENT_INVETORY}
        ecs.addComponent(id, inv)
    })
}

export function createBaseFirms(ecs: ECS, amt: number){
    const ids = ecs.createEntities(amt)

    ids.forEach(id => {
        ecs.addComponent(id, new FC.Finance())
        ecs.addComponent(id, new FC.Labour())
        const inv = new GC.Inventory()
        inv.invetory = {...STARTING_FIRM_INVETORY}
        ecs.addComponent(id, inv)
    })
}

export function addInitialUnemployedCount(stats: SC.Stats, ecs: ECS){
    const employComps = ecs.getComponents(AC.Employment)
    stats.unEmployedAmt = employComps.length
    return stats
}