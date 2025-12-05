import { ECS } from "entecs"
import { DEATH_AGE, RETIREMENT_AGE } from "../util/constants"
import { AgentComponents as ac, FirmComponents as fc, SingletonComponents as sc} from "./components"
import type { WorkOffer } from "../util/types"
import { getAgentsPerTier } from "./systemsUtil"

export function ageSystem(_: number, ecs: ECS) {
    const components = ecs.queryComponents([ac.Age])
    for (const [id, age] of components) {
        age.ageMonths++
        if(age.ageMonths/12 < 18){
            age.lifeStage = "child"
        }else if(age.ageMonths/12 < RETIREMENT_AGE){
            age.lifeStage = "working"
        }else if(age.ageMonths/12 < DEATH_AGE){
            age.lifeStage = "retired"
        }else{
            ecs.removeEntity(id)
        }
    }
}

export function postWorkOffersSystem(_: number, ecs: ECS){
    const firms = ecs.queryComponents([fc.Finance, fc.Labour])
    const agentsPerTier = getAgentsPerTier(ecs)

    const offers: WorkOffer[] = []

    for(const [firmID, finance, labour] of firms){
        if(labour.employeHireAmt <= 0)  labour.employeHireAmt = 1
        let positionsAvaliable = labour.employeHireAmt
        let labourCost = 0


        for(const [tier, agentsAvaliableForTier] of agentsPerTier.entries()){

            const avalPositions = Math.min(agentsAvaliableForTier, positionsAvaliable)
            positionsAvaliable -= avalPositions

            const payForTier = labour.wageOffers[tier]

            if((payForTier * positionsAvaliable) + labourCost > finance.money){
                const budgetLeft  = finance.money - labourCost
                positionsAvaliable = Math.floor(budgetLeft/payForTier)
            }

            offers.push({
                firmID: firmID,
                labourTier: tier,
                pay: payForTier,
                positionsAvaliable: avalPositions
            })

            labourCost += (positionsAvaliable * payForTier)
            if(positionsAvaliable <= 0) break
        }
       
    }

    ecs.getSingletonComponent(sc.WorkOffers).offers = [...offers]
}