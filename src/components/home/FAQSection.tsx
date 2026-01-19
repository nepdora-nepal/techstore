"use client";

import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useFAQs } from "@/hooks/use-faq";
import { Skeleton } from "@/components/ui/skeleton";
import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export const FAQSection: React.FC = () => {
    const { data: faqs, isLoading, error } = useFAQs();

    if (isLoading) {
        return (
            <section className="bg-background py-20 px-4">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-16 space-y-4 text-center">
                        <Skeleton className="mx-auto h-12 w-3/4 max-w-md rounded-full" />
                        <Skeleton className="mx-auto h-4 w-64 rounded-full" />
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Skeleton key={i} className="h-16 w-full rounded-2xl" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="bg-background py-20 px-4">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-red-50 text-red-500 mb-4">
                        <HelpCircle size={24} />
                    </div>
                    <p className="text-red-500 font-medium">Failed to load FAQs. Please try again later.</p>
                </div>
            </section>
        );
    }

    if (!faqs || faqs.length === 0) {
        return null;
    }

    return (
        <section className="bg-background py-20 md:py-32 px-4">
            <div className="mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                        <HelpCircle size={14} /> Common Questions
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 tracking-tight">
                        Frequently Asked <span className="text-primary">Questions</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Everything you need to know about Nepdora and our premium products.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={faq.id}
                                value={`item-${index}`}
                                className="group overflow-hidden rounded-3xl border transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 data-[state=open]:border-primary"
                            >
                                <AccordionTrigger className="px-8 py-6 text-left text-lg font-bold hover:no-underline hover:text-primary transition-all [&[data-state=open]]:text-primary">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="px-8 pb-6 text-muted-foreground text-base leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQSection;
