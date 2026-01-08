import ax from "@/axios";
import { ResponsiveDialog } from "@/components/custom/responsive-dialog";
import { useOffice } from "@/global/useOffice";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import OfficeForm from "../(form)/OfficeForm";

export default function CreateOffice() {
  const { open, setOpen } = useOffice();
  const form = useForm();
  const handleSubmit = (data: any) => {
    store.mutate(data);
  };
  const store = useMutation({
    mutationFn: async (data) => await ax.post("/offices/store", data),
    onError: (error) => console.log(error),
    onSuccess: (data) => console.log(data), 
  });
  return (
    <>
    <title>PS | Office</title>
      <ResponsiveDialog open={open} setOpen={setOpen} title="Create Office">
        <OfficeForm
          form={form}
          handleSubmit={handleSubmit}
          isPending={store.isPending}
        />
      </ResponsiveDialog>
    </>
  );
}
