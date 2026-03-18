"use client";

import ax from "@/axios";
import DataTable from "@/components/custom/datatable";
import SearchBar from "@/components/custom/searchbar";
import { Button } from "@/components/ui/button";
import { useDebounce } from "use-debounce";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  Edit,
  Ellipsis,
  Filter,
  Plus,
  Printer,
  Search,
  SearchIcon,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PayablePrint from "./(print)/PayablePrint";
import { usePayable } from "@/global/usePayable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ShowPayable from "./(show)/ShowPayable";
import { Card } from "@/components/ui/card";
import { useTitle } from "@/global/useTitle";
import { ButtonGroup } from "@/components/ui/button-group";

export default function Page() {
  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle({
      name: "Payables",
      link: "/payables ",
    });
  }, []);
  const { setOpen, setShowOpen, setPayable } = usePayable();
  const [month, setMonth] = useState<any>("");
  const [type, setType] = useState("Accounts Payable");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchValue] = useDebounce(search, 500);
  const { data, isSuccess, isError, error, isFetching } = useQuery({
    queryKey: ["payables", page, searchValue, type, month],
    queryFn: async () =>
      await ax.get("/payables", { params: { page, search, type, month } }),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
  if (isSuccess) console.log(data.data);
  if (isError) console.log(error);
  const columns = [
    {
      accessKey: "type",
      header: "Type",
    },
    {
      header: "Fund Type",
      cell: (item: any) => item.fund_type.toUpperCase(),
    },
    {
      accessKey: "date",
      header: "Date",
    },
    {
      accessKey: "dv_number",
      header: "DV Number",
    },
    {
      accessKey: "check_number",
      header: "Check Number",
    },
    {
      accessKey: "obr_number",
      header: "OBR Number",
    },
    {
      header: "Action",
      cell: (item: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                setShowOpen(true);
                setPayable(item);
              }}
            >
              View
              <DropdownMenuShortcut>
                <Search />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <Link href={`/payables/${item.id}/edit`}>
              <DropdownMenuItem>
                Edit
                <DropdownMenuShortcut>
                  <Edit />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
  return (
    <>
      <title>TS | Payables</title>
      <div className="space-y-4">
        <div className="sm:flex justify-between">
          <div className="flex gap-3">
            <Link href={"/payables/create"}>
              <Button>
                <Plus /> Add Payable
              </Button>
            </Link>
            <Button variant={"outline"} onClick={() => setOpen(true)}>
              <Printer /> Print
            </Button>
          </div>
          <div className="flex gap-2">
            <div className="sm:flex">
              <div className="sm:flex gap-5 space-y-2 sm:space-y-0">
                <div className="space-y-2">
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Accounts Payable">
                        Accounts Payable
                      </SelectItem>
                      <SelectItem value="Non-Accounts Payable">
                        Non-Accounts Payable
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* <div className="space-y-2">
                  <Label>Select Month</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      type="month"
                      value={month ?? ""}
                      onInput={(e: any) => setMonth(e.target.value)}
                    />
                    <Button onClick={() => setMonth("")}>Clear</Button>
                  </div>
                </div> */}
                <ButtonGroup className="min-w-50">
                  <Input
                    type="month"
                    value={month ?? ""}
                    onInput={(e: any) => setMonth(e.target.value)}
                  />
                  <Button onClick={() => setMonth("")}>Clear</Button>
                </ButtonGroup>
              </div>
            </div>
            <SearchBar
              search={search}
              setSearch={setSearch}
              isFetching={isFetching}
            />
          </div>
        </div>

        <div className="space-y-2">
          <DataTable
            columns={columns}
            data={data?.data?.data}
            page={page}
            setPage={setPage}
            pagination={data?.data?.pagination}
            isFetching={isFetching}
          />
        </div>
      </div>
      <PayablePrint />
      <ShowPayable />
    </>
  );
}
