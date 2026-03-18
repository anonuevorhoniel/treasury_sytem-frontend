"use client";

import ax from "@/axios";
import DataTable from "@/components/custom/datatable";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTitle } from "@/global/useTitle";
import { useUser } from "@/global/useUser";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Ellipsis, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import CreateUser from "./(create)/CreateUser";

export default function Page() {
  const { user, open, setOpen } = useUser();
  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle({
      name: "Users",
      link: "/users",
    });
  }, []);

  const [page, setPage] = useState(1);
  const { data, isSuccess, isError, error, isFetching } = useQuery({
    queryKey: ["users", page],
    queryFn: async () => await ax.get("/users", { params: { page } }),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const columns = [
    {
      header: "Name",
      cell: (item: any) => {
        return (
          <div className="flex gap-2">
            <Label>{item?.name} </Label>
            {item?.id == user?.id && (
              <div className="p-1 px-2 border rounded-full text-xs border-green-500 text-green-800 bg-green-100">
                Current User
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessKey: "email",
      header: "Email",
    },
    {
      accessKey: "classification",
      header: "Classification",
    },
    {
      header: "Action",
      cell: () => {
        return (
          <Button variant={"ghost"}>
            <Ellipsis />
          </Button>
        );
      },
    },
  ];

  if (isSuccess) console.log(data.data);
  if (isError) console.log((error as any)?.response);
  return (
    <>
      <div className="space-y-3">
        <Button onClick={() => setOpen(true)}>
          <Plus /> Add User
        </Button>
        <DataTable
          isFetching={isFetching}
          pagination={data?.data?.pagination}
          page={page}
          setPage={setPage}
          columns={columns}
          data={data?.data?.data}
        />
      </div>
      <CreateUser />
    </>
  );
}
