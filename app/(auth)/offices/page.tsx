"use client";

import { Button } from "@/components/ui/button";
import { Edit, Ellipsis, Plus } from "lucide-react";
import CreateOffice from "./(create)/CreateOffice";
import { useOffice } from "@/global/useOffice";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ax from "@/axios";
import DataTable from "@/components/custom/datatable";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditOffice from "./(edit)/EditOffice";
import { useTitle } from "@/global/useTitle";

export default function Page() {
  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle({
      name: "Offices",
      link: "/offices ",
    });
  }, []);
  const [page, setPage] = useState(1);
  const { setOpen, setOpenEdit, setSelectedItem } = useOffice();
  const { data, isSuccess, isFetching } = useQuery({
    queryKey: ["offices", page],
    queryFn: async () => await ax.get("/offices", { params: { page } }),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
  if (isSuccess) console.log(data.data?.data);
  const columns = [
    {
      accessKey: "name",
      header: "Name",
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
                setOpenEdit(true);
                setSelectedItem(item);
              }}
            >
              Edit
              <DropdownMenuShortcut>
                <Edit />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
  return (
    <>
      <div className="space-y-2">
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          <Plus /> Add Office
        </Button>
        <DataTable
          data={data?.data?.data}
          setPage={setPage}
          columns={columns}
          page={page}
          pagination={data?.data?.pagination}
          isFetching={isFetching}
        />
      </div>
      <CreateOffice />
      <EditOffice />
    </>
  );
}
