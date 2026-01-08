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
import { Edit, Ellipsis, Filter, Plus, Printer, Search, X } from "lucide-react";
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
      <div>
        <div className="sm:flex justify-between">
          <Link href={"/payables/create"}>
            <Button>
              <Plus /> Add Payable
            </Button>
          </Link>
          <div className="mt-2 sm:mt-0">
            <SearchBar
              search={search}
              setSearch={setSearch}
              isFetching={isFetching}
            />
          </div>
        </div>
        <Card className="px-6 py-0 my-3">
          <div className="sm:flex justify-between items-center p-3 rounded-md space-y-2 sm:space-y-0 ">
            <div className="sm:flex gap-5 space-y-2 sm:space-y-0">
              <div className="hidden sm:flex gap-2 items-center opacity-70">
                <h1>Filters</h1> <Filter strokeWidth={1} size={18} />{" "}
                <Separator orientation="vertical" className="bg-primary" />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
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
              <div className="space-y-2">
                <Label>Select Month</Label>
                <div className="flex gap-1">
                  <Input
                    type="month"
                    value={month ?? ""}
                    onInput={(e: any) => setMonth(e.target.value)}
                  />
                  <Button onClick={() => setMonth("")}>
                    <X />
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <Button variant={"outline"} onClick={() => setOpen(true)}>
                <Printer />
              </Button>
            </div>
          </div>
        </Card>
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
