import ax from "@/axios";
import { ResponsiveDialog } from "@/components/custom/responsive-dialog";
import { useOffice } from "@/global/useOffice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import OfficeForm from "../(form)/OfficeForm";
import { toast } from "sonner";

export default function CreateOffice() {
  const { open, setOpen } = useOffice();
  const qclient = useQueryClient();
  const form = useForm();
  const handleSubmit = (data: any) => {
    store.mutate(data);
  };
  const store = useMutation({
    mutationFn: async (data) => await ax.post("/offices/store", data),
    onError: (error) => console.log(error),
    onSuccess: (data) => {
      qclient.invalidateQueries({
        queryKey: ["offices"],
      });
      toast.success("Office Created");
      setOpen(false);
    },
  });
  return (
    <>
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
