import { check, z } from "zod";

export const payableSchema = z.object({
  type: z
    .string({ error: "Type is required" })
    .min(1, { error: "Type is required" }),
  dv_number: z
    .string({ error: "DV Number is required" })
    .min(1, { error: "DV Number is required" }),
  check_number: z.string().optional(),
  obr_number: z.string().optional(),
  date: z
    .string({ error: "Date is required" })
    .min(1, { error: "Date is required" }),
  particulars: z
    .string({ error: "Paticulars is required" })
    .min(1, { error: "Paticulars is required" }),
  fund_type: z.string("Fund Type is required").min(1, "Fund type is required"),
  value: z.coerce
    .string({ error: "Value is required" })
    .min(1, { error: "Value must not be below 0 or 0" })
    .refine((val) => val != "undefined")
    .refine((val) => Number(val) > 0),
  deduction: z.coerce
    .string({ error: "Deduction Deduction is required" })
    .min(0, {
      error: "Deduction Deduction cannot have negative values",
    })
    .refine((val) => val != "undefined")
    .refine((val) => Number(val) > 0),
  office_id: z.coerce
    .string({ error: "Office is required" })
    .min(1, { error: "Office is required" })
    .refine((val) => val != "undefined"),
});
