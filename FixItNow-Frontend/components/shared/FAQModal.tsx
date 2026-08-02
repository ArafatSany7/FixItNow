"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReactNode } from "react";

const faqs = [
  {
    question: "How do I book a service?",
    answer:
      "You can book a service directly from our 'Services' page. Simply select the service you need, choose a professional, and pick an available time slot that works for you.",
  },
  {
    question: "Are your professionals verified?",
    answer:
      "Yes, absolutely. All our service professionals undergo strict background checks and rigorous skill verification before they are allowed to join our platform.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "You can easily cancel your booking up to 2 hours before the scheduled service time without any penalty. Late cancellations may incur a small fee to compensate the professional.",
  },
  {
    question: "How do I pay for the service?",
    answer:
      "You can pay securely online using a credit/debit card, mobile banking, or choose the convenient cash-on-delivery option when the technician arrives.",
  },
  {
    question: "What if I am not satisfied with the service?",
    answer:
      "Customer satisfaction is our top priority. If you're not happy with the service provided, please contact our support team within 24 hours, and we will make it right, either by re-doing the service or providing a refund.",
  }
];

export function FAQModal({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-background border border-secondary/20 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-text mb-2">
            Frequently Asked Questions
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-secondary/20">
                <AccordionTrigger className="text-left font-semibold text-text hover:text-primary transition-colors text-[15px]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-text/70 text-sm leading-relaxed pb-4 pt-1">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
}
