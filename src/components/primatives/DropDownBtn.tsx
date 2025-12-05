import { IoIosArrowUp } from "react-icons/io";


interface Props{
    show: boolean,
    setShow: (show: boolean) => void
}
export default function DropDownBtn({show, setShow}: Props) {
    return (
        <button className="bg-neutral-300 px-2 rounded-md hover:cursor-pointer"
            onClick={() => setShow(!show)}>
            <IoIosArrowUp className={`text-neutral-500 ${!show ? "rotate-180" : ""} transition-all duration-200 ease-in-out`}/>
        </button>
    )
}
