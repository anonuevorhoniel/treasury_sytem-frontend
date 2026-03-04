import CustomFormField from "@/components/custom/custom-form-field";
import FormFieldComponent from "@/components/custom/form-field";
import { Form, useFormField } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { formType } from "@/global/formType";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { PhilippinePeso, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import ButtonLoad from "@/components/custom/button-load";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ax from "@/axios";
import OfficeSelect from "@/components/custom/office-select";

export default function PayableForm({
  form,
  handleSubmit,
  isPending,
}: formType) {
  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["offices"],
    queryFn: async () => await ax.get("/offices"),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
  const { watch, control } = form;
  const ps = watch("ps") ?? 0;
  const psDeduction = watch("ps_deduction") ?? 0;
  const mooe = watch("mooe") ?? 0;
  const mooeDeduction = watch("mooe_deduction") ?? 0;
  const co = watch("co") ?? 0;
  const coDeduction = watch("co_deduction") ?? 0;

  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-2"
      >
        <div>
          <Label className="text-xl font-bold ">Payable Information</Label>
          <Separator className="bg-primary " />
        </div>
        <div className="grid grid-cols-3 gap-5">
          <FormFieldComponent
            form={form}
            label="Type"
            name="type"
            type="select"
            selectItems={
              <>
                <SelectItem value="Accounts Payable">
                  Accounts Payable
                </SelectItem>
                <SelectItem value="Non-Accounts Payable">
                  Non-Accounts Payable
                </SelectItem>
              </>
            }
          />
        </div>
        <div className="grid grid-cols-3 gap-5">
          <FormFieldComponent form={form} label="DV Number" name="dv_number" />
          <FormFieldComponent
            form={form}
            label="Check Number"
            name="check_number"
            type="number"
          />
          <FormFieldComponent
            form={form}
            label="OBR Number"
            name="obr_number"
            type="number"
          />
          <FormFieldComponent
            form={form}
            label="Date"
            name="date"
            type="date"
          />
          <div className="space-y-2 mt-2">
            <Label>Office</Label>
            <OfficeSelect form={form} name="office_id" />
          </div>
        </div>
        <FormFieldComponent
          form={form}
          label="Particulars"
          name="particulars"
          type="textarea"
        />

        <div className="space-y-5 mt-5">
          <div>
            <Label className="text-xl font-bold ">Personnel Services</Label>
            <Separator className="bg-primary " />
          </div>
          <div className="grid grid-cols-3 gap-5">
            <CustomFormField
              form={form}
              label="Value"
              name="ps"
              element={
                <Controller
                  control={control}
                  name="ps"
                  render={({ field }) => {
                    const { error } = useFormField();
                    return (
                      <InputGroup className={error && "border-red-500"}>
                        <InputGroupInput
                          value={field.value ?? ""}
                          placeholder="PS"
                          type="number"
                          onInput={field.onChange}
                          step={"any"}
                        />
                        <InputGroupAddon>
                          <PhilippinePeso />
                        </InputGroupAddon>
                        <InputGroupAddon align="inline-end"></InputGroupAddon>
                      </InputGroup>
                    );
                  }}
                />
              }
            />
            <CustomFormField
              form={form}
              label="Deduction"
              name="ps_deduction"
              element={
                <Controller
                  control={control}
                  name="ps_deduction"
                  render={({ field }) => (
                    <InputGroup>
                      <InputGroupInput
                        value={field.value ?? ""}
                        placeholder="Deduction"
                        step={"any"}
                        type="number"
                        onInput={field.onChange}
                      />
                      <InputGroupAddon>
                        <PhilippinePeso />
                      </InputGroupAddon>
                      <InputGroupAddon align="inline-end"></InputGroupAddon>
                    </InputGroup>
                  )}
                />
              }
            />
            <div className="space-y-3">
              <Label>Total</Label>
              <InputGroup>
                <InputGroupInput
                  placeholder="Total"
                  type="number"
                  readOnly
                  value={ps - psDeduction}
                />
                <InputGroupAddon>
                  <PhilippinePeso />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end"></InputGroupAddon>
              </InputGroup>
            </div>
          </div>
          <div>
            <Label className="text-xl font-bold ">MOOE</Label>
            <Separator className="bg-primary " />
          </div>
          <div className="grid grid-cols-3 gap-5">
            <CustomFormField
              form={form}
              label="Value"
              name="mooe"
              element={
                <Controller
                  control={control}
                  name="mooe"
                  render={({ field }) => (
                    <InputGroup>
                      <InputGroupInput
                        value={field.value ?? ""}
                        placeholder="MOOE"
                        type="number"
                        onInput={field.onChange}
                        step={"any"}
                      />
                      <InputGroupAddon>
                        <PhilippinePeso />
                      </InputGroupAddon>
                      <InputGroupAddon align="inline-end"></InputGroupAddon>
                    </InputGroup>
                  )}
                />
              }
            />
            <CustomFormField
              form={form}
              label="Deduction"
              name="mooe_deduction"
              element={
                <Controller
                  control={control}
                  name="mooe_deduction"
                  render={({ field }) => (
                    <InputGroup>
                      <InputGroupInput
                        value={field.value ?? ""}
                        placeholder="Deduction"
                        step={"any"}
                        type="number"
                        onInput={field.onChange}
                      />
                      <InputGroupAddon>
                        <PhilippinePeso />
                      </InputGroupAddon>
                      <InputGroupAddon align="inline-end"></InputGroupAddon>
                    </InputGroup>
                  )}
                />
              }
            />
            <div className="space-y-3">
              <Label>Total</Label>
              <InputGroup>
                <InputGroupInput
                  placeholder="Total"
                  type="number"
                  readOnly
                  value={mooe - mooeDeduction}
                />
                <InputGroupAddon>
                  <PhilippinePeso />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end"></InputGroupAddon>
              </InputGroup>
            </div>
          </div>
          <div>
            <Label className="text-xl font-bold ">Capital Outlays</Label>
            <Separator className="bg-primary " />
          </div>
          <div className="grid grid-cols-3 gap-5">
            <CustomFormField
              form={form}
              label="Value"
              name="co"
              element={
                <Controller
                  control={control}
                  name="co"
                  render={({ field }) => (
                    <InputGroup>
                      <InputGroupInput
                        value={field.value ?? ""}
                        placeholder="CO"
                        step={"any"}
                        type="number"
                        onInput={field.onChange}
                      />
                      <InputGroupAddon>
                        <PhilippinePeso />
                      </InputGroupAddon>
                      <InputGroupAddon align="inline-end"></InputGroupAddon>
                    </InputGroup>
                  )}
                />
              }
            />
            <CustomFormField
              form={form}
              label="Deduction"
              name="co_deduction"
              element={
                <Controller
                  control={control}
                  name="co_deduction"
                  render={({ field }) => (
                    <InputGroup>
                      <InputGroupInput
                        value={field.value ?? ""}
                        placeholder="Deduction"
                        step={"any"}
                        type="number"
                        onInput={field.onChange}
                      />
                      <InputGroupAddon>
                        <PhilippinePeso />
                      </InputGroupAddon>
                      <InputGroupAddon align="inline-end"></InputGroupAddon>
                    </InputGroup>
                  )}
                />
              }
            />
            <div className="space-y-3">
              <Label>Total</Label>
              <InputGroup>
                <InputGroupInput
                  placeholder="Total"
                  type="number"
                  readOnly
                  value={co - coDeduction}
                />
                <InputGroupAddon>
                  <PhilippinePeso />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end"></InputGroupAddon>
              </InputGroup>
            </div>
          </div>
          <div className="flex justify-end">
            <ButtonLoad isPending={isPending} />
          </div>
        </div>
      </form>
    </Form>
  );
}
