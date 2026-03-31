import ax from "@/axios";
import { ResponsiveDialog } from "@/components/custom/responsive-dialog";
import { useOffice } from "@/global/useOffice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import OfficeForm from "../(form)/OfficeForm";
import { toast } from "sonner";
import { useEffect } from "react";

export default function EditOffice() {
  const { openEdit, setOpenEdit, selectedItem } = useOffice();
  const qclient = useQueryClient();
  const form = useForm();
  const handleSubmit = (data: any) => {
    update.mutate(data);
  };
  const update = useMutation({
    mutationFn: async (data) =>
      await ax.post(`/offices/${selectedItem?.id}/update`, data),
    onError: (error) => console.log(error),
    onSuccess: (data) => {
      qclient.invalidateQueries({
        queryKey: ["offices"],
      });
      toast.success("Office Updated");
      setOpenEdit(false);
    },
  });

  useEffect(() => {
    selectedItem && form.reset(selectedItem);
  }, [selectedItem?.id]);
  return (
    <>
      <ResponsiveDialog
        open={openEdit}
        setOpen={setOpenEdit}
        title="Edit Office"
      >
        <OfficeForm
          form={form}
          handleSubmit={handleSubmit}
          isPending={update.isPending}
        />
      </ResponsiveDialog>
    </>
  );
}
