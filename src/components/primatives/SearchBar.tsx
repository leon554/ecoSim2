
interface Props{
    search: string
    setSearch: (search: string) => void
}
export default function SearchBar({search, setSearch}: Props) {
    return (
        <input 
            type="text" 
            className="outline-1 rounded-md w-full outline-neutral-300 text-xs px-2"
            placeholder="Search ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
        />
    )
}
