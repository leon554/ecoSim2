import { useEffect, useState } from "react"
import { ecs } from "./loigc/setup/setup"
import { AgentComponents as AC, GeneralComponents as GC, FirmComponents as FC, SingletonComponents as sc} from "./loigc/ecs/components"
import Agents from "./components/Agents"
import Firms from "./components/Firms"

function App() {

    const [version, setVersion] = useState(0)

    const agents = ecs.queryComponents([AC.Age, AC.Skill, AC.QOL, 
        AC.Wallet, AC.Employment, GC.Inventory
    ])
    const firms = ecs.queryComponents([FC.Finance, FC.Labour, GC.Inventory])

    const workOffers = ecs.getSingletonComponent(sc.WorkOffers).offers

    useEffect(() => {
        const intervalId = setInterval(() => {
            ecs.update(1)
            setVersion(p => p + 1)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [])

    return (
        <div className="w-full flex flex-col items-center p-5 gap-4">
            <p>Version: {version}</p>
            <div className="flex w-[80%] flex-wrap gap-2 bg-neutral-100 outline-1 rounded-md outline-neutral-200 p-2">
                {workOffers.map(o => {
                    return(
                        <div className="text-xs outline-1 p-2 outline-neutral-300 rounded-md bg-neutral-200 flex-1 whitespace-nowrap">
                            <p className="text-sm font-medium">Firm ID: {o.firmID}</p>
                            <p>Tier: {o.labourTier}, Pay: ${o.pay}</p>
                            <p>Avaliable Positions: {o.positionsAvaliable}</p>
                        </div>
                    )
                })}
            </div>
            <Agents agents={agents}/>
            <Firms firms={firms}/>
        </div>
    )
}
export default App
