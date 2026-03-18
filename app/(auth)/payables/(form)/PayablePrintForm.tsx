import ButtonLoad from "@/components/custom/button-load";
import FormFieldComponent from "@/components/custom/form-field";
import {
  Form,
} from "@/components/ui/form";
import { formType } from "@/global/formType";
import { Download } from "lucide-react";

export default function PayablePrintForm({
  form,
  handleSubmit,
  isPending,
}: formType) {
  return (
    <Form {...form}>
      <form action="" onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
        <FormFieldComponent
          name="from_date"
          label="From Date"
          form={form}
          type="month"
        />
        <FormFieldComponent
          name="to_date"
          label="To Date"
          form={form}
          type="month"
        />

        <ButtonLoad
          isPending={isPending}
          className="mt-3 w-full"
          label={
            <>
              <Download /> Download
            </>
          }
        />
      </form>
    </Form>
  );
}
