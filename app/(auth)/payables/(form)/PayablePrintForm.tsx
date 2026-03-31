import ButtonLoad from "@/components/custom/button-load";
import FormFieldComponent from "@/components/custom/form-field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formType } from "@/global/formType";
import { ChevronDown, Download } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ax from "@/axios";
import { useEffect, useState } from "react";
import SearchBar from "@/components/custom/searchbar";
import { useDebounce } from "use-debounce";
import { SelectItem } from "@/components/ui/select";

export default function PayablePrintForm({
  form,
  handleSubmit,
  isPending,
}: formType) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchDebounce] = useDebounce(search, 500);
  const officeId = form.watch("office_id");
  const [selectedOffice, setSelectedOffice] = useState<any>();
  const { data, isSuccess, isError, error, isFetching } = useQuery({
    queryKey: ["offices", page, searchDebounce],
    queryFn: async () => await ax.get("/offices", { params: { page, search } }),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const officeShowData = useQuery({
    queryKey: ["officeShow", officeId],
    queryFn: async () => await ax.get(`/offices/${officeId}`),
    enabled: !!officeId,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (officeShowData.isSuccess) {
      setSelectedOffice(officeShowData?.data?.data);
    }
  }, [officeId, officeShowData.isSuccess]);

  const [selectOfficeOpen, setSelectOfficeOpen] = useState(false);
  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-2"
      >
        <FormFieldComponent
          name="type"
          label="Type"
          type="select"
          form={form}
          selectItems={
            <>
              <SelectItem value="Accounts Payable">Accounts Payable</SelectItem>
              <SelectItem value="Non-Accounts Payable">
                Non-Accounts Payable
              </SelectItem>
            </>
          }
        />
        <FormField
          name="office_id"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Office</FormLabel>
                <FormControl>
                  <Popover
                    open={selectOfficeOpen}
                    onOpenChange={setSelectOfficeOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex justify-between"
                      >
                        <Label>{`${selectedOffice?.name ?? "Select Office"}`}</Label>{" "}
                        <ChevronDown />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 overflow-hidden ">
                      <SearchBar
                        search={search}
                        setSearch={setSearch}
                        className="rounded-bl-none rounded-br-none"
                        isFetching={isFetching}
                      />
                      <PopoverHeader className="p-3">
                        <PopoverTitle>Offices</PopoverTitle>
                      </PopoverHeader>
                      <div className="space-y-1 max-h-50 overflow-auto">
                        {data?.data?.data?.map((item: any) => (
                          <Button
                            onClick={() => {
                              setSelectOfficeOpen(false);
                              field.onChange(String(item?.id));
                            }}
                            key={item?.id}
                            className="w-full justify-start"
                            variant={"ghost"}
                          >
                            {item?.name?.slice(0, 40)}{" "}
                            {item?.name?.length > 40 && "..."}
                          </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormFieldComponent
          name="from_date"
          label="From Date"
          form={form}
          type="month"
        />
        <FormFieldComponent
          name="to_date"
          label="To Date"
          form={form}
          type="month"
        />

        <ButtonLoad
          isPending={isPending}
          className="mt-3 w-full"
          label={
            <>
              <Download /> Download
            </>
          }
        />
      </form>
    </Form>
  );
}
