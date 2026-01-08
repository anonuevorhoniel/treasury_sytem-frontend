import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { Spinner } from "../ui/shadcn-io/spinner";

export default function SearchBar({
    setSearch,
    search,
    isFetching,
    className,
}: {
    setSearch: any;
    search: string;
    isFetching: boolean;
    className?: string;
}) {
    return (
        <InputGroup
            onInput={(e: any) => setSearch(e.target.value)}
            className={`focus-visible:ring-0 focus-visible:ring-offset-0 ${className}`}
        >
            <InputGroupInput
                placeholder="Search..."
                value={search ?? ""}
                onChange={() => {}} //onchange parang lang di mag lint err
            />
            <InputGroupAddon>
                <SearchIcon />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
                {search !== "" && isFetching && <Spinner />}
            </InputGroupAddon>
        </InputGroup>
    );
}
