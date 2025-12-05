import { FirmComponents as FC, GeneralComponents as GC } from "../loigc/ecs/components"
import { shortenNum } from "../loigc/util/util"


interface Props{
    firms: [number, FC.Finance, FC.Labour, GC.Inventory][]
}
export default function Firms({firms}: Props) {
    return (
        <div className="flex flex-col w-[80%] gap-1">
                <p>Firms</p>
                <div className="bg-neutral-100 rounded-md p-2 outline-1 outline-neutral-300
                    flex flex-col gap-3 overflow-y-scroll max-h-60">
                    {firms.map(f => {
                        const [id, finance, labour, inv] = f
                        
                        return (
                            <div className="outline-1 p-2 rounded-md outline-neutral-200 bg-neutral-200">
                                <p>ID: {id}</p>
                                <div className="flex flex-wrap w-full gap-3 mt-1">
                                    <div className="bg-neutral-300 rounded-md p-3 whitespace-nowrap flex-1">
                                        <p className="text-sm font-medium">Finance</p>
                                        <div className="text-xs mt-1">
                                            <p>Capital: ${shortenNum(finance.money)}</p>
                                            <p>Profit Margin: {finance.targetProfitMargin*100}%</p>
                                            <p>Labour Cost: {finance.labourCostLastTick ?? "0"}</p>
                                        </div>
                                    </div>
                                   <div className="bg-neutral-300 rounded-md p-3 whitespace-nowrap flex-1">
                                        <p className="text-sm font-medium">Labour</p>
                                        <div className="text-xs mt-1">
                                            <p>Employee Hire Amt: {labour.employeHireAmt}</p>
                                            <p>Employee IDs: {labour.employeeIDs.join(",")}</p>
                                        </div>
                                    </div>
                                     <div className="bg-neutral-300 rounded-md p-3 whitespace-nowrap grow">
                                        <p className="text-sm font-medium">Wage Offers</p>
                                        <div className="text-xs mt-1 flex gap-2 flex-wrap ">
                                            {Object.entries(labour.wageOffers).map(e => {
                                                const [resourceTier, amount] = e
                                                return(
                                                    <p>T{resourceTier}: ${amount}</p>
                                                )
                                            })}
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
