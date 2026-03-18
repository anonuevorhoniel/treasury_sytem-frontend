import { UseFormReturn } from "react-hook-form";
import CommandSelect from "./command-select";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ax from "@/axios";

export default function OfficeSelect({
  form,
  name,
}: {
  form: UseFormReturn;
  name: string;
}) {
  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["offices"],
    queryFn: async () => await ax.get("/offices"),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
  const values = data?.data?.map((item: any) => ({
    label: item.name,
    value: item.id,
  }));
  return <CommandSelect values={values} name={name} form={form} />;
}
