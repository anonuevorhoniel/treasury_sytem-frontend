import ButtonLoad from "@/components/custom/button-load";
import FormFieldComponent from "@/components/custom/form-field";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function UserForm({
  handleSubmit,
  isPending,
}: {
  handleSubmit: (data: any) => void;
  isPending: boolean;
}) {
  const form = useForm();
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormFieldComponent form={form} name="name" label="Name" />
          <FormFieldComponent form={form} name="email" label="Email" />
          <FormFieldComponent
            form={form}
            name="password"
            type="password"
            label="Password"
          />
          <FormFieldComponent
            type="password"
            form={form}
            name="password_confirmation"
            label="Re-type Password"
          />
          <ButtonLoad className="w-full mt-5" isPending={isPending} />
        </form>
      </Form>
    </>
  );
}
