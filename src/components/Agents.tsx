import { AgentComponents as AC, GeneralComponents as GC } from "../loigc/ecs/components"
import { useState } from "react"
import Header from "./primatives/Header"

interface Props{
    agents: [number, AC.Age, AC.Skill, AC.QOL, AC.Wallet, AC.Employment, GC.Inventory][]
}
export default function Agents({agents}: Props) {
    
    const [search, setSearch] = useState("")
    const [show, setShow] = useState(false)

    agents = search == "" ? agents : agents.filter(a => `${a[0]}`.includes(search))

    return (
        <div className="flex flex-col w-[80%] gap-2">
            <Header title="Agents" search={search} setSearch={setSearch} show={show} setShow={setShow}/>
            <div className={`bg-neutral-100 rounded-md outline-1 outline-neutral-200
                flex flex-col gap-3 overflow-y-scroll ${show ? " max-h-60 p-2" : " max-h-0"}
                overflow-y-scroll transition-all duration-500 ease-in-out`}>
                {agents.map(a => {
                    const [id, age, skill, qol, wallet, employment, inv] = a
                    
                    return (
                        <div className="outline-1 p-2 rounded-md outline-neutral-200 bg-neutral-200">
                            <p>ID: {id}</p>
                            <div className="flex flex-wrap w-full gap-3 mt-1">
                                <div className="bg-neutral-300 rounded-md p-3 whitespace-nowrap flex-1">
                                    <p className="text-sm font-medium">Age</p>
                                    <div className="text-xs mt-1">
                                        <p>Age: {Math.floor(age.ageMonths/12)}Y, {age.ageMonths % 12}m</p>
                                        <p>Stage: {age.lifeStage}</p>
                                    </div>
                                </div>
                                <div className="bg-neutral-300 rounded-md p-3 whitespace-nowrap flex-1">
                                    <p className="text-sm font-medium">Skill</p>
                                    <div className="text-xs mt-1">
                                        <p>Xp: {skill.xp}</p>
                                        <p>Labour Tier: {skill.labourTier}</p>
                                    </div>
                                </div>  
                                <div className="bg-neutral-300 rounded-md p-3 whitespace-nowrap flex-1">
                                    <p className="text-sm font-medium">QOL</p>
                                    <div className="text-xs mt-1">
                                        <p>QOL: {qol.QOL}</p>
                                    </div>
                                </div>  
                                <div className="bg-neutral-300 rounded-md p-3 whitespace-nowrap flex-1">
                                    <p className="text-sm font-medium">Wallet</p>
                                    <div className="text-xs mt-1">
                                        <p>Spending: ${wallet.spending}</p>
                                        <p>Savings: ${wallet.savings}</p>
                                    </div>
                                </div>  
                                <div className="bg-neutral-300 rounded-md p-3 whitespace-nowrap flex-1">
                                    <p className="text-sm font-medium">Employment</p>
                                    <div className="text-xs mt-1">
                                        <p>Firm ID: {employment.firmID ?? "N/A"}</p>
                                        <p>Employed: {employment.isEmployed ? "Yes" : "No"}</p>
                                        <p>Min Wage: ${employment.minWage}</p>
                                    </div>
                                </div>  
                                <div className="bg-neutral-300 rounded-md p-3 whitespace-nowrap grow">
                                    <p className="text-sm font-medium">Inventory</p>
                                    <div className="text-xs mt-1 flex gap-2 flex-wrap ">
                                        {Object.entries(inv.invetory).map(e => {
                                            const [resourceTier, amount] = e
                                            return(
                                                <p>T{resourceTier}: {amount}</p>
                                            )
                                        })}
                                    </div>
                                </div>  
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
