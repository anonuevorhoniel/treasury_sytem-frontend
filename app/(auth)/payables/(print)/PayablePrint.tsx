import ax from "@/axios";
import { ResponsiveDialog } from "@/components/custom/responsive-dialog";
import { usePayable } from "@/global/usePayable";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import PayablePrintForm from "../(form)/PayablePrintForm";
import useDownloadLink from "@/global/useDownloadLink";

export default function PayablePrint() {
  const { open, setOpen } = usePayable();
  const form = useForm();
  const handleSubmit = (data: any) => {
    print.mutate(data);
  };
  const print = useMutation({
    mutationFn: async (data) =>
      await ax.post("/payables/print", data, 
        { responseType: "blob" }
    ),
    onSuccess: (data) => {
      useDownloadLink({ data: data?.data, name: "download" });
    },
    onError: (error) => console.log(error),
  });
  return (
    <ResponsiveDialog open={open} setOpen={setOpen} title="Print Payables">
      <PayablePrintForm
        form={form}
        handleSubmit={handleSubmit}
        isPending={print.isPending}
      />
    </ResponsiveDialog>
  );
}
