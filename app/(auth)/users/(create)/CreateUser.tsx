import { ResponsiveDialog } from "@/components/custom/responsive-dialog";
import { useUser } from "@/global/useUser";
import UserForm from "../user-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ax from "@/axios";
import { toast } from "sonner";
import { error } from "console";

export default function CreateUser() {
  const { open, setOpen } = useUser();
  const qclient = useQueryClient();
  const handleSubmit = (data: any) => {
    store.mutate(data);
  };
  const store = useMutation({
    mutationFn: async (data) => await ax.post("/users/store", data),
    onSuccess: () => {
      toast.success("User Added");
      qclient.invalidateQueries({ queryKey: ["users"] });
      setOpen(false);
    },
    onError: (error: any) => console.log(error?.response),
  });
  return (
    <ResponsiveDialog open={open} setOpen={setOpen} title="Create User">
      <UserForm handleSubmit={handleSubmit} isPending={store.isPending} />
    </ResponsiveDialog>
  );
}
