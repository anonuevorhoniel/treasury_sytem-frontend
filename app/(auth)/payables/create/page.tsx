"use client";

import ax from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import PayableForm from "../(form)/PayableForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { payableSchema } from "@/schema/payableSchema";
import { toast } from "sonner";
import { useTitle } from "@/global/useTitle";
import { useEffect } from "react";

export default function Page() {
  const qclient = useQueryClient();
  const form = useForm<any>({
    resolver: zodResolver(payableSchema),
  });
  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle({
      name: "Payables",
      link: "/payables ",
      pages: ["Create"],
    });
  }, []);
  const router = useRouter();
  const handleSubmit = (data: any) => {
    console.log(data);
    store.mutate(data);
  };
  const store = useMutation({
    mutationFn: async (data: any) => await ax.post("/payables/store", data),
    onSuccess: () => {
      toast.success("Payable Added");
      form.reset();
      qclient.invalidateQueries({
        queryKey: ["payables"],
      });
      qclient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
    onError: (error: any) => console.log(error?.response),
  });

  return (
    <>
      <title>TS | Payables</title>
      <div>
        <Button variant={"ghost"} onClick={() => router.back()}>
          <ChevronLeft /> Back
        </Button>
      </div>
      <Card className="px-6">
        <PayableForm
          form={form}
          isPending={store.isPending}
          handleSubmit={handleSubmit}
        />
      </Card>
    </>
  );
}
