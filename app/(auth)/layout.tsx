"use client";

import ax from "@/axios";
import { AppSidebar } from "@/components/app-sidebar";
import LoadingScreen from "@/components/custom/login-loader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useTitle } from "@/global/useTitle";
import { useUser } from "@/global/useUser";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { Toaster } from "sonner";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { title } = useTitle();
  useEffect(() => {
    document.title = `TS | ${title.name}`;
  }, [title.name]);
  const { user, setUser } = useUser();
  const {
    data: userData,
    isSuccess,
    isFetching,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await ax.get("/user"),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    if (isSuccess) setUser(userData.data);
  }, [isSuccess]);
  if (isFetching) return <LoadingScreen />;
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12  ">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="">
                  <Link href={title.link}>{title.name ?? "..."}</Link>
                </BreadcrumbItem>
                {title?.pages &&
                  title?.pages?.map((title) => (
                    <Fragment key={title}>
                      <BreadcrumbSeparator className="" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>{title}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </Fragment>
                  ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="max-w-[1300px] mx-auto w-full">
          {/* max-w-[1300px] */}
          <div className="flex flex-1 flex-col   gap-4 p-4 pt-0 sm:px-10">
            {children} <Toaster position="top-right" />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
