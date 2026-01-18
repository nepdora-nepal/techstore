"use client";

import React from "react";
import Image from "next/image";
import { useTeamMembers } from "@/hooks/use-team-member";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Facebook, Instagram, Linkedin } from "lucide-react";

const TeamSection = () => {
    const { data: teamMembers, isLoading, error } = useTeamMembers();

    const handleSocialClick = (e: React.MouseEvent, url: string | undefined) => {
        if (!url) return;
        e.stopPropagation();
        window.open(url, "_blank", "noopener,noreferrer");
    };

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
                    >
                        <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-none bg-card">
                            <CardContent className="p-0">
                                <div className="relative aspect-square overflow-hidden">
                                    <Image
                                        src={member.photo}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                    {/* Social links overlay */}
                                    <div className="absolute right-4 bottom-4 left-4 flex justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        {member.email && (
                                            <Button
                                                size="icon"
                                                variant="secondary"
                                                className="h-8 w-8 bg-white/90 hover:bg-white text-primary"
                                                onClick={e => handleSocialClick(e, `mailto:${member.email}`)}
                                            >
                                                <Mail className="h-4 w-4" />
                                            </Button>
                                        )}
                                        {member.facebook && (
                                            <Button
                                                size="icon"
                                                variant="secondary"
                                                className="h-8 w-8 bg-white/90 hover:bg-white text-primary"
                                                onClick={e => handleSocialClick(e, member.facebook)}
                                            >
                                                <Facebook className="h-4 w-4" />
                                            </Button>
                                        )}
                                        {member.instagram && (
                                            <Button
                                                size="icon"
                                                variant="secondary"
                                                className="h-8 w-8 bg-white/90 hover:bg-white text-primary"
                                                onClick={e => handleSocialClick(e, member.instagram)}
                                            >
                                                <Instagram className="h-4 w-4" />
                                            </Button>
                                        )}
                                        {member.linkedin && (
                                            <Button
                                                size="icon"
                                                variant="secondary"
                                                className="h-8 w-8 bg-white/90 hover:bg-white text-primary"
                                                onClick={e => handleSocialClick(e, member.linkedin)}
                                            >
                                                <Linkedin className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6 text-center">
                                    <h3 className="mb-1 text-xl font-bold text-foreground">
                                        {member.name}
                                    </h3>
                                    <p className="mb-2 font-semibold text-primary uppercase text-sm tracking-wider">
                                        {member.role}
                                    </p>
                                    {member.department && (
                                        <p className="mb-3 text-sm text-muted-foreground">
                                            {member.department.name}
                                        </p>
                                    )}
                                    {member.about && (
                                        <p className="line-clamp-3 text-sm text-muted-foreground">{member.about}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default TeamSection;
