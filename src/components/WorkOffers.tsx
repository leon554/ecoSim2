import { useState } from "react"
import type { WorkOffer } from "../loigc/util/types"
import Header from "./primatives/Header"


interface Props{
    workOffers: WorkOffer[]
}
export default function WorkOffers({workOffers}: Props) {
    const [search, setSearch] = useState("")
    const [show, setShow] = useState(false)

    workOffers = search == "" ? workOffers : workOffers.filter(o => `${o.firmID}`.includes(search))

    return (
       <div className="w-[80%] flex flex-col gap-2">
            <Header title="Work Offers" search={search} setSearch={(setSearch)} show={show} setShow={setShow}/>
            <div className={`flex flex-wrap gap-2 bg-neutral-100 outline-1 rounded-md outline-neutral-200 ${show ? " max-h-50 p-2" : " max-h-0"} overflow-y-scroll transition-all duration-500 ease-in-out`}>
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
        </div>
    )
}
