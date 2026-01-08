import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Form } from "./ui/form";
import { formType } from "@/global/formType";
import ButtonLoad from "./custom/button-load";
import FormFieldComponent from "./custom/form-field";

export function LoginForm({ form, handleSubmit, isPending }: formType) {
  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6")}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email below to login to your account
            </p>
          </div>
          <FormFieldComponent name="email" form={form} label="Email" />
          <FormFieldComponent
            name="password"
            form={form}
            type="password"
            label="Password"
          />
          <Field>
            <ButtonLoad isPending={isPending} label="Login" />
          </Field>
        </FieldGroup>
      </form>
    </Form>
  );
}
