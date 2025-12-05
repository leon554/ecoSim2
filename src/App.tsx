import { useEffect, useState } from "react"
import { ecs } from "./loigc/setup/setup"
import { AgentComponents as AC, GeneralComponents as GC, FirmComponents as FC, SingletonComponents as sc} from "./loigc/ecs/components"
import Agents from "./components/Agents"
import Firms from "./components/Firms"
import WorkOffers from "./components/WorkOffers"

function App() {

    const [version, setVersion] = useState(0)

    const agents = ecs.queryComponents([AC.Age, AC.Skill, AC.QOL, 
        AC.Wallet, AC.Employment, GC.Inventory
    ])
    const firms = ecs.queryComponents([FC.Finance, FC.Labour, GC.Inventory])

    const workOffers = ecs.getSingletonComponent(sc.WorkOffers).offers
    const logs = ecs.getSingletonComponent(sc.Logs).allLogs

    useEffect(() => {
        const intervalId = setInterval(() => {
            ecs.update(1)
            setVersion(p => p + 1)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [])

    return (
        <div className="w-full flex flex-col items-center p-5 gap-4">
            <p className="bg-indigo-200 rounded-2xl px-5 py-1">Tick: {version}</p>
            <div className="w-ful grid justify-items-center max-md:grid-cols-1 grid-cols-3 gap-5">
                <WorkOffers workOffers={workOffers}/>
                <Agents agents={agents}/>
                <Firms firms={firms}/>
                <p>
                    sdf{logs.join(",")}
                </p>
            </div>
        </div>
    )
}
export default App
