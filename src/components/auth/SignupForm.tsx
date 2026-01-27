"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupSchema, SignupFormValues } from "@/schemas/customer/signup.form";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export const SignupForm = () => {
    const { signup, isLoading } = useAuth();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: SignupFormValues) => {
        try {
            await signup(data);
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.status === 400 && error.data?.error?.params?.field_errors) {
                const fieldErrors = error.data.error.params.field_errors;
                Object.keys(fieldErrors).forEach((field) => {
                    setError(field as keyof SignupFormValues, {
                        type: "server",
                        message: fieldErrors[field][0],
                    });
                });
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4 py-12">
            <div className="max-w-md w-full space-y-8 bg-card p-10 rounded-3xl shadow-xl shadow-primary/5 border border-border/50">

                {/* Header */}
                <div className="text-center">


                    <h2 className="text-3xl font-extrabold text-foreground">
                        Create Account
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Join TechStore and start your premium shopping journey
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Input
                                    id="first_name"
                                    label="First Name"
                                    {...register("first_name")}
                                    className={`bg-white/50 backdrop-blur-sm ${errors.first_name ? "border-destructive" : ""}`}
                                />
                                {errors.first_name && (
                                    <p className="text-xs text-destructive">
                                        {errors.first_name.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Input
                                    id="last_name"
                                    label="Last Name"
                                    {...register("last_name")}
                                    className={`bg-white/50 backdrop-blur-sm ${errors.last_name ? "border-destructive" : ""}`}
                                />
                                {errors.last_name && (
                                    <p className="text-xs text-destructive">
                                        {errors.last_name.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Input
                                id="email"
                                type="email"
                                label="Email address"
                                {...register("email")}
                                className={`bg-white/50 backdrop-blur-sm ${errors.email ? "border-destructive" : ""}`}
                            />
                            {errors.email && (
                                <p className="text-xs text-destructive">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Input
                                id="phone"
                                type="tel"
                                label="Phone Number"
                                {...register("phone")}
                                className={`bg-white/50 backdrop-blur-sm ${errors.phone ? "border-destructive" : ""}`}
                            />
                            {errors.phone && (
                                <p className="text-xs text-destructive">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Input
                                id="password"
                                type="password"
                                label="Password"
                                {...register("password")}
                                className={`bg-white/50 backdrop-blur-sm ${errors.password ? "border-destructive" : ""}`}
                            />
                            {errors.password && (
                                <p className="text-xs text-destructive">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Input
                                id="confirmPassword"
                                type="password"
                                label="Confirm Password"
                                {...register("confirmPassword")}
                                className={`bg-white/50 backdrop-blur-sm ${errors.confirmPassword ? "border-destructive" : ""}`}
                            />
                            {errors.confirmPassword && (
                                <p className="text-xs text-destructive">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-6 rounded-xl font-bold text-lg"
                    >
                        {isLoading ? "Creating account..." : "Create Account"}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-bold text-primary hover:text-primary/80"
                        >
                            Sign in instead
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};
