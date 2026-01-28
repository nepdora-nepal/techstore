"use client";

import React from "react";
import { Users, Award, Globe, TrendingUp } from "lucide-react";
import { useTeamMembers } from "@/hooks/use-team-member";
import ImageWithFallback from "../common/ImageWithFallback";
import Image from "next/image";
const AboutPage: React.FC = () => {
  const { data: teamMembers } = useTeamMembers();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-navy-950 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-widest mb-6">
            Since 2024
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-8">
            TechStore <br />
            <span className="text-brand-500">
              Redefining Tomorrow&apos;s Tech Lifestyle.
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            TechStore is more than a marketplace. We are a curation of peak
            engineering and visionary design.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Global Users", value: "25K+" },
            { icon: Globe, label: "Countries", value: "45+" },
            { icon: Award, label: "Tech Awards", value: "12" },
            { icon: TrendingUp, label: "Annual Growth", value: "150%" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 text-center"
            >
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-brand-600">
                <stat.icon size={24} />
              </div>
              <p className="text-3xl font-black text-navy-950 mb-1">
                {stat.value}
              </p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-navy-950 mb-8 leading-tight">
              Our mission is to empower human potential.
            </h2>
            <div className="space-y-6 text-slate-500 font-medium leading-relaxed">
              <p>
                We believe that technology should be an extension of
                self—intuitive, powerful, and aesthetically flawless.
                That&apos;s why every product in our collection undergoes
                rigorous vetting for quality and performance.
              </p>
              <p>
                From the latest silicon breakthroughs to sustainable
                manufacturing, we stay at the forefront of the digital
                revolution so you don&apos;t have to.
              </p>
            </div>
            <div className="pt-10">
              <button className="px-10 py-5 bg-navy-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-600 transition-all shadow-xl">
                Join the Movement
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-brand-100 rounded-[3rem] p-12 overflow-hidden">
              <ImageWithFallback
                id="about-mission-image"
                src="https://plus.unsplash.com/premium_photo-1661963794740-40335baba754?q=80&w=1171&auto=format&fit=crop"
                fallbackSrc="/images/fallback/about-mission.jpg"
                alt="Innovation"
                height={500}
                width={500}
                className="w-full h-full object-contain filter drop-shadow-2xl hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white p-6 rounded-[2rem] shadow-2xl border border-gray-100 flex flex-col items-center justify-center text-center">
              <p className="text-2xl font-black text-brand-600">No. 1</p>
              <p className="text-[8px] font-black text-navy-950 uppercase tracking-widest">
                Tech Retailer 2024
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      {teamMembers && teamMembers.length > 0 && (
        <div className="bg-gray-50 py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-navy-950 mb-4">
                Our Visionaries
              </h2>
              <p className="text-gray-500 font-medium">
                The brilliant minds behind the world&apos;s most advanced tech
                curator.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="group">
                  <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-6">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                      height={500}
                      width={500}
                    />
                    <div className="absolute inset-0 bg-brand-600/0 group-hover:bg-brand-600/20 transition-all duration-700" />
                  </div>
                  <h3 className="text-xl font-black text-navy-950 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;
