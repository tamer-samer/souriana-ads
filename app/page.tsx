"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { SocialCard } from "@/components/ui/SocialCard";
import { AdvertisementForm } from "@/components/forms/AdvertisementForm";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { LiaTelegram } from "react-icons/lia";

export default function EducationalAdsPage() {
  const scrollToForm = () => {
    const formElement = document.getElementById("advertisement-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex lg:flex-row lg:justify-around lg:items-start gap-12">
          <div className="order-1 lg:order-2 w-full lg:w-auto lg:flex-shrink-0 space-y-8 animate-fade-in-right lg:flex lg:flex-col lg:items-center pt-10">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="animate-float">
                  <img
                    src="/logo.jpg"
                    alt="سوريانا التعليمية"
                    className="w-48 h-48 mx-auto animate-pulse-slow rounded-full border-4 border-teal-400 object-cover"
                  />
                  <Button
                    onClick={scrollToForm}
                    className="lg:hidden absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-semibold px-6 py-2 text-sm transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    تواصل معنا
                  </Button>
                </div>
              </div>
              <div className="mt-8">
                <h2 className="text-lg md:text-xl font-bold text-white mb-4 p-3">
                  أهلاً بكم في الصفحة الرسمية للتعاون الإعلاني مع سوريانا
                  التعليمية
                </h2>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 animate-fade-in-up animation-delay-800">
              <SocialCard
                icon={FiFacebook}
                followers="+1.6M"
                bgColor="bg-blue-600/20"
                borderColor="border-blue-500/30"
                iconColor="text-blue-400"
              />

              <SocialCard
                icon={FiInstagram}
                followers="+375K"
                bgColor="bg-pink-600/20"
                borderColor="border-pink-500/30"
                iconColor="text-pink-400"
              />

              <SocialCard
                icon={LiaTelegram}
                followers="+450K"
                bgColor="bg-cyan-600/20"
                borderColor="border-cyan-500/30"
                iconColor="text-cyan-400"
              />
            </div>
          </div>

          <div className="order-2 lg:order-1 w-full lg:max-w-[500px] space-y-8 animate-fade-in-left">
            <AdvertisementForm />
          </div>
        </div>
      </div>
    </div>
  );
}
