import { ECS } from "entecs";
import { addInitialUnemployedCount, createBaseAgents, createBaseFirms } from "../util/componentSetup";
import { ageSystem, postWorkOffersSystem } from "../ecs/systems";
import { SingletonComponents as SC} from "../ecs/components";


export const ecs = new ECS()

createBaseAgents(ecs, 50)
createBaseFirms(ecs, 5)

ecs.addSingletonComponent(addInitialUnemployedCount(new SC.Stats(), ecs))
ecs.addSingletonComponent(new SC.WorkOffers())

ecs.addSystem(ageSystem, 100)
ecs.addSystem(postWorkOffersSystem, 99)