import { STARTING_AGE, STARTING_FIRM_CAPITAL, STARTING_FIRM_PROFIT_MARGIN, STARTING_SAVINGS_AMT, STARTING_SPENDING_AMT, STARTING_WAGE_OFFERS } from "../util/constants"
import type { WorkOffer } from "../util/types"


export namespace GeneralComponents{
    export class Inventory{
        invetory: Record<number, number> = {}
    }
}

export namespace AgentComponents{
    export class Age{
        lifeStage: "child" | "working" | "retired" = "working"
        ageMonths: number = STARTING_AGE*12
    }
    export class Skill{
        xp: number = 0
        labourTier: number = 1
    }
    export class Wallet{
        spending: number = STARTING_SPENDING_AMT
        savings: number = STARTING_SAVINGS_AMT
    }
    export class QOL{
        QOL: number = 0
    }
    export class Employment{
        firmID: number | null = null
        isEmployed: boolean = false
        minWage: number = 100
    }
}

export namespace FirmComponents{
    export class Finance{
        money: number = STARTING_FIRM_CAPITAL
        targetProfitMargin: number = STARTING_FIRM_PROFIT_MARGIN
        labourCostLastTick: number | null = null
    }
    export class Labour{
        employeeIDs: number[] = []
        employeHireAmt: number = 0
        wageOffers: Record<number, number> = STARTING_WAGE_OFFERS
    }
}

export namespace SingletonComponents{
    export class Stats{
        unEmployedAmt: number = 0
        firmsAmt: number = 0
    }
    export class WorkOffers{
        offers: WorkOffer[] = []
    }
    export class Logs{
        allLogs: string[] = ["test"]
        importantLogs: string[] = []
    }
}