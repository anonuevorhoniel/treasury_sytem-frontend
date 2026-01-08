import ButtonLoad from "@/components/custom/button-load";
import FormFieldComponent from "@/components/custom/form-field";
import { Form } from "@/components/ui/form";
import { formType } from "@/global/formType";

export default function OfficeForm({
  form,
  handleSubmit,
  isPending,
}: formType) {
  return (
    <Form {...form}>
      <form action="" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormFieldComponent name="name" label="Name" form={form} />
        <ButtonLoad isPending={isPending} className="w-full mt-4" />
      </form> 
    </Form>
  );
}
