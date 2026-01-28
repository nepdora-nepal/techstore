"use client";

import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useSubmitContactForm } from "@/hooks/use-contact";
import { ContactFormData } from "@/types/contact";
import { motion, Variants } from "framer-motion";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useSiteConfig } from "@/hooks/use-site-config";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const ContactForm = () => {
  const { mutate: submitContact, isPending } = useSubmitContactForm();
  const { data: siteConfig } = useSiteConfig();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    const submissionData: ContactFormData = {
      name: `${firstName} ${lastName}`.trim(),
      email: email,
      phone_number: phone,
      message: message,
    };

    submitContact(submissionData, {
      onSuccess: () => {
        toast.success("Message sent successfully");
        form.reset();
      },
      onError: () => {
        toast.error("Failed to send message");
      },
    });
  };

  return (
    <motion.section
      className="bg-background px-4 py-8 md:px-4 md:py-20 space-y-8 md:space-y-12 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
    >
      <div className="hidden md:block from-carent-yellow to-yellow-500 pointer-events-none absolute top-80 -left-20 z-50 h-40 w-40 rounded-full bg-linear-to-tr opacity-90 blur-3xl"></div>
      <div className="hidden md:block from-carent-yellow to-yellow-500 pointer-events-none absolute top-80 -right-20 z-50 h-40 w-40 rounded-full bg-linear-to-tr opacity-90 blur-3xl"></div>
      {/* Gradients - hidden on mobile */}
      <div className="max-w-xl mx-auto text-center px-2 relative z-20">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-carent-dark">
          Contact {siteConfig?.business_name || 'TechStore'} Today
        </h1>
      </div>
      <div className="max-w-lg mx-auto relative z-20">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* NAME FIELDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <Input
                type="text"
                name="firstName"
                required
                placeholder=" "
                label="First Name *"
                className="peer w-full px-3 sm:px-4 pt-5 sm:pt-6 pb-2 text-sm sm:text-base border-2 border-gray-200 rounded-lg bg-background focus:border-carent-yellow outline-none transition"
              />
            </div>

            <div className="relative">
              <Input
                type="text"
                name="lastName"
                required
                placeholder=" "
                label="Last Name *"
                className="peer w-full px-3 sm:px-4 pt-5 sm:pt-6 pb-2 text-sm sm:text-base border-2 border-gray-200 rounded-lg bg-background focus:border-carent-yellow outline-none transition"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="relative">
            <Input
              type="email"
              name="email"
              required
              placeholder=" "
              label="Email Address *"
              className="peer w-full px-3 sm:px-4 pt-5 sm:pt-6 pb-2 text-sm sm:text-base border-2 border-gray-200 rounded-lg bg-background focus:border-carent-yellow outline-none transition"
            />
          </div>

          {/* PHONE */}
          <div className="relative">
            <Input
              type="tel"
              name="phone"
              required
              label="Phone Number *"
              placeholder=" "
              className="peer w-full px-3 sm:px-4 pt-5 sm:pt-6 pb-2 text-sm sm:text-base border-2 border-gray-200 rounded-lg bg-background focus:border-carent-yellow outline-none transition"
            />
          </div>

          {/* MESSAGE */}
          <div className="relative">
            <textarea
              name="message"
              rows={3}
              placeholder="Tell us about your goals"
              className="peer w-full text-sm sm:text-base border-2 px-3 sm:px-4 pt-3 border-gray-200 rounded-lg bg-background resize-none focus:border-carent-yellow outline-none transition"
              required
            />
          </div>

          <Button
            type="submit"
            className="rounded-lg w-full h-11 sm:h-12 text-sm sm:text-base text-center justify-center"
            disabled={isPending}
          >
            {isPending ? (
              "Sending..."
            ) : (
              <>
                Submit Inquiry <Send className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
        </form>
      </div>
    </motion.section>
  );
};
