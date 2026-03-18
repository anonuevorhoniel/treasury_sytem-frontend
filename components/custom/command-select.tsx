"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

export default function CommandSelect({
  values,
  form,
  name,
  className,
}: {
  values: { label: string; value: string }[];
  name: string;
  form: UseFormReturn;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("Select");

  const currentValue = form.watch(name);

  useEffect(() => {
    if (currentValue) {
      const selectedItem = values?.find((item) => item.value === currentValue);
      if (selectedItem) {
        setSelectedLabel(selectedItem.label);
      }
    } else {
      setSelectedLabel("Select");
    }
  }, [currentValue, values]);

  const handleSelect = (itemValue: { value: string; label: string }) => {
    console.log(itemValue);
    const selectedItem = values.find((item) => item.value === itemValue.value);
    if (selectedItem) {
      form.setValue(name, itemValue.value, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setSelectedLabel(selectedItem.label);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-between ${className}`}
          type="button"
        >
          <span
            className={
              selectedLabel !== "Select"
                ? "text-foreground"
                : "text-muted-foreground"
            }
          >
            {selectedLabel}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {values?.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.label}
                  onSelect={() => handleSelect(item)}
                >
                  <span>{item.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
