import { ResponsiveDialog } from "@/components/custom/responsive-dialog";
import { Separator } from "@/components/ui/separator";
import { openType } from "@/global/openType";
import { usePayable } from "@/global/usePayable";
import { Calendar, CalendarDays } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ShowPayable() {
  const { showOpen, setShowOpen, payable } = usePayable();
  return (
    <ResponsiveDialog
      open={showOpen}
      setOpen={setShowOpen}
      title="View Payable"
    >
      <div>
        <h1 className="font-bold text-lg">{payable?.type}</h1>
        <div className="flex gap-2 opacity-70">
          <CalendarDays strokeWidth={1} /> <h1>{payable?.date}</h1>
        </div>

        <div className="mt-5 space-y-1">
          <div className="flex justify-between">
            <p className="opacity-70">DV Number: </p>
            <h1>{payable?.dv_number}</h1>
          </div>
          <Separator className="bg-primary" />
          <div className="flex justify-between">
            <p className="opacity-70">Check Number: </p>
            <h1>{payable?.check_number}</h1>
          </div>
          <Separator className="bg-primary" />
          <div className="flex justify-between">
            <p className="opacity-70">OBR Number: </p>
            <h1>{payable?.obr_number}</h1>
          </div>
          <Separator className="bg-primary" />
          <div>
            <p className="opacity-70">Particulars: </p>
            <h1 className="">{payable?.particulars}</h1>
          </div>
          <Accordion type="single" collapsible>
            
            <AccordionItem value="item-1">
              <AccordionTrigger>Personnel Services</AccordionTrigger>
              <AccordionContent className="space-y-2">
                <div className="flex justify-between">
                  <p className="opacity-70">Personnel Services: </p>
                  <h1>{payable?.ps}</h1>
                </div>
                <Separator className="bg-primary" />
                <div className="flex justify-between">
                  <p className="opacity-70">Personnel Services Deduction: </p>
                  <h1>{payable?.ps_deduction}</h1>
                </div>
                <Separator className="bg-primary" />
                <div className="flex justify-between">
                  <p className="opacity-70">Personnel Services Total: </p>
                  <h1>{payable?.ps && payable?.ps - payable?.ps_deduction}</h1>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>MOOE</AccordionTrigger>
              <AccordionContent className="space-y-2">
                <div className="flex justify-between">
                  <p className="opacity-70">MOOE: </p>
                  <h1>{payable?.mooe}</h1>
                </div>
                <Separator className="bg-primary" />
                <div className="flex justify-between">
                  <p className="opacity-70">MOOE Deduction: </p>
                  <h1>{payable?.mooe_deduction}</h1>
                </div>
                <Separator className="bg-primary" />
                <div className="flex justify-between">
                  <p className="opacity-70">MOOE Total: </p>
                  <h1>
                    {payable?.mooe && payable?.mooe - payable?.mooe_deduction}
                  </h1>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Capital Outlay</AccordionTrigger>
              <AccordionContent className="space-y-2">
                <div className="flex justify-between">
                  <p className="opacity-70">Capital Outlay: </p>
                  <h1>{payable?.co}</h1>
                </div>
                <Separator className="bg-primary" />
                <div className="flex justify-between">
                  <p className="opacity-70">Capital Outlay Deduction: </p>
                  <h1>{payable?.co_deduction}</h1>
                </div>
                <Separator className="bg-primary" />
                <div className="flex justify-between">
                  <p className="opacity-70">Capital Outlay Total: </p>
                  <h1>{payable?.co && payable?.co - payable?.co_deduction}</h1>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </ResponsiveDialog>
  );
}
