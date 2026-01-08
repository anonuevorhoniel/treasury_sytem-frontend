import { UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { ReactNode } from "react";

export default function CustomFormField({
    form,
    name,
    element,
    label,
}: {
    form: UseFormReturn;
    name: string;
    element: ReactNode;
    label: string | ReactNode;
}) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={() => (
                <FormItem className="space-y-1">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>{element}</FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
