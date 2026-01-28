"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useFAQs } from "@/hooks/use-faq";

export default function FaqView() {
  const { data: faqs, isLoading, error } = useFAQs();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-36 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-carent-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-36 flex items-center justify-center">
        <p className="text-red-500 text-lg">
          Failed to load FAQs. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-32 md:pt-40 lg:pt-48 pb-12 sm:pb-16 md:pb-24">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center text-carent-text mb-12 sm:mb-16 md:mb-20">
          Frequently Asked Questions
        </h1>

        <div className="max-w-4xl mx-auto">
          {faqs?.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-carent-gray rounded-sm overflow-hidden mb-3 sm:mb-4"
              >
                <button
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  className="flex justify-between items-start sm:items-center w-full p-4 sm:p-5 md:p-6 text-left font-medium text-base sm:text-lg md:text-xl text-carent-text hover:bg-black/5 transition-colors gap-3 sm:gap-4"
                >
                  <span className="flex-1">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform duration-300 ease-out ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
