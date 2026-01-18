"use client";

import React from "react";
import { useTeamMembers } from "@/hooks/use-team-member";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import { motion } from "framer-motion";

const TeamSection = () => {
    const { data: teamMembers, isLoading, error } = useTeamMembers();

    if (isLoading) {
        return (
            <section className="py-20 text-center">
                <div className="animate-pulse">Loading Team...</div>
            </section>
        );
    }

    if (error || !teamMembers || teamMembers.length === 0) {
        return null;
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-20">
            <div className="text-center mb-16">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary text-primary mb-4 inline-block">
                    Our People
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-foreground">
                    Meet the <span className="text-primary">Team</span>
                </h2>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                    The passionate individuals behind SastoBazaar working to bring you the best experience.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                    <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative"
                    >
                        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary mb-4">
                            <ImageWithFallback
                                id={`team-member-${member.id}`}
                                src={member.photo}
                                fallbackSrc="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&q=80"
                                alt={member.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <p className="text-white text-sm font-medium line-clamp-2">
                                    {member.about}
                                </p>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                        <p className="text-primary font-medium text-sm uppercase tracking-wider">
                            {member.role}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default TeamSection;
