"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePopupSubmit } from "@/hooks/use-popup";
import { PopupFormData } from "@/types/popup";

interface PopupFormProps {
    popupId: number;
    enabledFields: string[];
    onSuccess?: () => void;
}

const PopupForm: React.FC<PopupFormProps> = ({
    popupId,
    enabledFields,
    onSuccess,
}) => {
    const { mutate: submitForm, isPending } = usePopupSubmit();

    // Create a dynamic schema based on enabled fields
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schemaConfig: any = {};
    if (enabledFields.includes("name")) {
        schemaConfig.name = z.string().min(2, "Name is required");
    }
    if (enabledFields.includes("phone_number")) {
        schemaConfig.phone_number = z.string().min(10, "Valid phone number is required");
    }
    if (enabledFields.includes("email")) {
        schemaConfig.email = z.string().email("Invalid email address");
    }
    if (enabledFields.includes("address")) {
        schemaConfig.address = z.string().min(5, "Address is required");
    }

    const formSchema = z.object(schemaConfig);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<PopupFormData>({
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(formSchema) as any,
    });

    const onSubmit = (data: PopupFormData) => {
        submitForm(
            { popupId, formData: data },
            {
                onSuccess: (res) => {
                    toast.success(res.message || "Thank you for your submission!");
                    reset();
                    if (onSuccess) onSuccess();
                },
                //eslint-disable-next-line @typescript-eslint/no-explicit-any
                onError: (err: any) => {
                    toast.error(err.message || "Failed to submit form. Please try again.");
                },
            }
        );
    };

    if (enabledFields.length === 0) return null;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {enabledFields.includes("name") && (
                <div className="space-y-1">
                    <Input
                        label="Full Name *"
                        className="bg-white/50 backdrop-blur-sm"
                        {...register("name")}
                    />
                    {errors.name && (
                        <p className="text-destructive text-[10px] font-medium px-1">{errors.name.message as string}</p>
                    )}
                </div>
            )}

            {enabledFields.includes("phone_number") && (
                <div className="space-y-1">
                    <Input
                        label="Phone Number *"
                        type="tel"
                        className="bg-white/50 backdrop-blur-sm"
                        {...register("phone_number")}
                    />
                    {errors.phone_number && (
                        <p className="text-destructive text-[10px] font-medium px-1">{errors.phone_number.message as string}</p>
                    )}
                </div>
            )}

            {enabledFields.includes("email") && (
                <div className="space-y-1">
                    <Input
                        label="Email Address *"
                        type="email"
                        className="bg-white/50 backdrop-blur-sm"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-destructive text-[10px] font-medium px-1">{errors.email.message as string}</p>
                    )}
                </div>
            )}

            {enabledFields.includes("address") && (
                <div className="space-y-1">
                    <Input
                        label="Address *"
                        className="bg-white/50 backdrop-blur-sm"
                        {...register("address")}
                    />
                    {errors.address && (
                        <p className="text-destructive text-[10px] font-medium px-1">{errors.address.message as string}</p>
                    )}
                </div>
            )}

            <Button type="submit" className="w-full h-11" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit"}
            </Button>
        </form>
    );
};

export default PopupForm;
