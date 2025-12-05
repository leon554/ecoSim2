import { ECS } from "entecs";
import { addInitialUnemployedCount, createBaseAgents, createBaseFirms } from "../util/componentSetup";
import { acceptWorkOffersSystem, ageSystem, postWorkOffersSystem } from "../ecs/systems";
import { SingletonComponents as sc, FirmComponents as fc} from "../ecs/components";
import { Events } from "../ecs/events";


export const ecs = new ECS()

createBaseAgents(ecs, 50)
createBaseFirms(ecs, 5)

ecs.addSingletonComponent(addInitialUnemployedCount(new sc.Stats(), ecs))
ecs.addSingletonComponent(new sc.WorkOffers())
ecs.addSingletonComponent(new sc.Logs())

ecs.addSystem(ageSystem, 100)
ecs.addSystem(postWorkOffersSystem, 99)
ecs.addSystem(acceptWorkOffersSystem, 98)


ecs.on(Events.OfferAccepted, (e) => {
    const firm = ecs.getComponent(e.firmID, fc.Labour)
    firm?.employeeIDs.push(e.agentID)
    ecs.getSingletonComponent(sc.Logs).allLogs.push(`Firm (${e.firmID}) recieved offer acceptance from (${e.agentID})`)
})