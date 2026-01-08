"use client";

import ax from "@/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import PayableForm from "../../(form)/PayableForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Page() {
  useEffect(() => {
    qclient.removeQueries({ queryKey: ["payableEdit"] });
  }, []);

  const form = useForm();
  const qclient = useQueryClient();
  const router = useRouter();
  const id = useParams().id;
  const handleSubmit = (data: any) => {
    update.mutate(data);
  };
  const update = useMutation({
    mutationFn: async (data) => await ax.post(`/payables/${id}/update`, data),
    onSuccess: () => {
      toast.success("Payable has been updated");
      qclient.invalidateQueries({
        queryKey: ["payables"],
      });
    },
  });
  const { data, isSuccess, isFetching } = useQuery({
    queryKey: ["payableEdit", id],
    queryFn: async () => await ax.get(`/payables/${id}/edit`),
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) {
        form.reset(data.data);
        console.log(data.data);
      }
    }, 100);
  }, [isSuccess, id]);
  if (isFetching) return <>Loading...</>;
  return (
    <>
      <div>
        <Button variant={"ghost"} onClick={() => router.back()}>
          <ChevronLeft /> Back
        </Button>
      </div>
      <Card className="px-6">
        <PayableForm
          form={form}
          handleSubmit={handleSubmit}
          isPending={update.isPending}
        />
      </Card>
    </>
  );
}
