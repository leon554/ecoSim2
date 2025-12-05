import SearchBar from "./SearchBar"
import DropDownBtn from "./DropDownBtn"


interface Props{
    title: string
    search: string
    setSearch: (search: string) => void
    show: boolean,
    setShow: (show: boolean) => void
}
export default function Header({title, search, setSearch, show, setShow}: Props) {
    return (
        <div className="flex justify-between whitespace-nowrap gap-3">
            <p>{title}</p>

            <SearchBar search={search} setSearch={setSearch}/>

            <DropDownBtn show={show} setShow={setShow}/>

        </div>
    )
}
