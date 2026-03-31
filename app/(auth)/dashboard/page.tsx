"use client";

import ax from "@/axios";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTitle } from "@/global/useTitle";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { CheckIcon, CreditCardIcon, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function Page() {
  const date = new Date();
  const yearValue = date.getFullYear();
  const [year, setYear] = useState(yearValue);
  const { data, isSuccess, isError, error, isFetching } = useQuery({
    queryKey: ["dashboard", year],
    queryFn: async () => await ax.get("/dashboard", { params: { year } }),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle({
      name: "Dashboard",
      link: "/dashboard ",
    });
  }, []);
  const newData =
    data?.data &&
    Object.entries(data?.data?.data)?.map(([index, value]) => ({
      month: index,
      count: value,
    }));
  if (isSuccess) console.log(newData);
  const chartConfig = {
    month: {
      label: "month",
      color: "var(--color-primary)",
    },
    count: {
      label: "Count",
    },
  } satisfies ChartConfig;

  return (
    <>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-3 gap-5">
        <Card className="px-6">
          <div className="space-y-2">
            <h1 className="opacity-70">Overall Payables </h1>
            <h1 className="text-xl font-bold">
              {isFetching ? <Spinner size={28} /> : data?.data?.overall}
            </h1>
          </div>
        </Card>
        <Card className="px-6">
          <div className="space-y-2">
            <h1 className="opacity-70">Accounts Payable </h1>
            <h1 className="text-xl font-bold">
              {isFetching ? (
                <Spinner size={28} />
              ) : (
                data?.data?.accountPayableCount
              )}
            </h1>
          </div>
        </Card>
        <Card className="px-6">
          <div className="space-y-2">
            <h1 className="opacity-70">Non-Accounts Payable </h1>
            <h1 className="text-xl font-bold">
              {isFetching ? (
                <Spinner size={28} />
              ) : (
                data?.data?.nonAccountPayableCount
              )}
            </h1>
          </div>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div>
          <div className="flex justify-between px-6 py-2 border-b items-center">
            <div>
              <h1 className="font-bold">Breakdown of Payables</h1>
              <p className="opacity-70 text-sm">
                Showing the breakdown of Payables per month in the year {year}
              </p>
            </div>
            <div>
              <InputGroup>
                <InputGroupInput
                  readOnly
                  placeholder="Enter Year"
                  value={year ?? yearValue}
                  onChange={() => {}}
                />
                <InputGroupAddon align="inline-end">
                  <Button
                    variant={"ghost"}
                    onClick={() => setYear((prev: number) => prev - 1)}
                  >
                    <Minus />
                  </Button>
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <Button
                    variant={"ghost"}
                    onClick={() => setYear((prev: number) => prev + 1)}
                  >
                    <Plus />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
          <ChartContainer
            config={chartConfig}
            className="w-full max-h-100 pr-12 mt-5"
          >
            <BarChart data={newData}>
              <XAxis dataKey={"month"} />
              <YAxis />
              <Bar dataKey={"count"} fill="var(--color-month)" radius={4} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            </BarChart>
          </ChartContainer>
        </div>
      </Card>
    </>
  );
}
