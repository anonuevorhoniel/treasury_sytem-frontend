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
  ps: z.coerce
    .number({ error: "Personal Services is required" })
    .min(1, { error: "Personal Services must not be below 0 or 0" })
    .optional(),
  ps_deduction: z.coerce
    .number({ error: "Personal Services Deduction is required" })
    .min(0, {
      error: "Personal Services Deduction cannot have negative values",
    })
    .optional(),
  mooe: z.coerce
    .number({ error: "MOOE is required" })
    .min(1, { error: "MOOE must not be below 0 or 0" })
    .optional(),
  mooe_deduction: z.coerce
    .number({ error: "MOOE Deduction is required" })
    .min(0, {
      error: "MOOE Deduction cannot have negative values",
    })
    .optional(),
  co: z.coerce
    .number({ error: "Capital Outlay is required" })
    .min(1, { error: "Capital Outlay must not be below 0 or 0" })
    .optional(),
  co_deduction: z.coerce
    .number({ error: "Capital Outlay Deduction is required" })
    .min(0, {
      error: "Capital Outlay Deduction cannot have negative values",
    })
    .optional(),
  office_id: z.coerce
    .string({ error: "Office is required" })
    .min(1, { error: "Office is required" })
    .refine((val) => val != "undefined"),
});
