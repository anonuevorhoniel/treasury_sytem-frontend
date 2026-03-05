"use client";

import { LoginForm } from "@/components/login-form";
import logo from "../../../public/logo.png";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import ax from "@/axios";
import { useRouter } from "next/navigation";
import { useUser } from "@/global/useUser";

export default function LoginPage() {
  const form = useForm();
  const router = useRouter();
  const { setUser } = useUser();
  const handleSubmit = (data: any) => {
    authenticate.mutate(data);
  };
  const authenticate = useMutation({
    mutationFn: async (data: any) => await ax.post("/authenticate", data),
    onError: (error: any) => console.log(error?.response),
    onSuccess: (data) => {
      router.push("/dashboard");
      console.log(data.data);
      setUser(data.data?.user);
    },
  });
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Treasurer's Office
          </a>
        </div> */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm
              form={form}
              handleSubmit={handleSubmit}
              isPending={authenticate.isPending}
            />
          </div>
        </div>
      </div>
      <div className="bg-muted hidden lg:flex justify-center items-center">
        <div className="flex flex-col items-center gap-2">
          <Image
            src={logo}
            alt="Image"
            width={200}
            height={200}
            className="rounded-full"
          />
          <h1 className="font-bold text-3xl text-center">
            Santa Cruz Laguna <br /> Treasury System
          </h1>
        </div>
      </div>
    </div>
  );
}
