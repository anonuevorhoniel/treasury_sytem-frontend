"use client";

import ax from "@/axios";
import DataTable from "@/components/custom/datatable";
import { useTitle } from "@/global/useTitle";
import { useUser } from "@/global/useUser";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Page() {
  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle({
      name: "Audit Logs",
      link: "/audit-logs",
    });
  }, []);
  const [page, setPage] = useState(1);
  const { data, isSuccess, isError, isFetching, error } = useQuery({
    queryKey: ["auditLogs", page],
    queryFn: async () => await ax.get("/activity-logs", { params: { page } }),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    refetchOnMount: "always",
  });
  if (isSuccess) console.log(data.data);
  const columns = [
    {
      header: "Action",
      cell: (item: any) => item?.description?.toUpperCase(),
    },
    {
      header: "User",
      cell: (item: any) => item?.user?.name,
    },
    {
      header: "Action Taken",
      cell: (item: any) => (
        <div>
          <p>{item?.created_at_formatted}</p>
          <p>{item?.created_at_humans}</p>
        </div>
      ),
    },
  ];
  return (
    <>
      <DataTable
        page={page}
        setPage={setPage}
        columns={columns}
        isFetching={isFetching}
        pagination={data?.data?.pagination}
        data={data?.data?.data}
      />
    </>
  );
}
