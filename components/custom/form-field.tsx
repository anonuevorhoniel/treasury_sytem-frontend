import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";
import { Textarea } from "../ui/textarea";

import { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const input = [
  "",
  undefined,
  "text",
  "number",
  "password",
  "date",
  "month",
  "file",
];

export default function FormFieldComponent({
  form,
  type,
  name,
  label,
  selectItems,
}: {
  form: UseFormReturn;
  type?:
    | ""
    | undefined
    | "text"
    | "number"
    | "password"
    | "date"
    | "month"
    | "file"
    | "select"
    | "textarea";
  name: string;
  label: string | ReactNode;
  selectItems?: any;
}) {
  const content = ({ field }: { field: any }) => {
    const value = field.value == undefined ? "" : field.value;
    if (input.includes(type)) {
      return (
        <Input
          type={type}
          {...field}
          value={value}
          placeholder={typeof label == "string" ? label : "Enter"}
        />
      );
    }

    if (type == "textarea") {
      return (
        <Textarea
          type={type}
          {...field}
          value={value}
          placeholder={typeof label == "string" ? label : "Enter"}
          // style={{ resize: "none" }}
        />
      );
    }

    if (type == "select") {
      const { error } = useFormField();
      return (
        <Select value={String(value)} onValueChange={field.onChange} key={name}>
          <SelectTrigger className={`w-full ${error && "border-red-500"}`}>
            <SelectValue
              placeholder={`Select ${typeof label == "string" ? label : ""}`}
            />
          </SelectTrigger>
          <SelectContent>{selectItems}</SelectContent>
        </Select>
      );
    }
  };

  const formfield = (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm/6">{label}</FormLabel>
          <FormControl>{content({ field })}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return formfield;
}
