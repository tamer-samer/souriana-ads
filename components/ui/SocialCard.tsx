"use client";

import type React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface SocialCardProps {
  icon: React.ElementType;
  followers: string;
  bgColor: string;
  borderColor: string;
  iconColor: string;
}

export function SocialCard({
  icon: Icon,
  followers,
  bgColor,
  borderColor,
  iconColor,
}: SocialCardProps) {
  return (
    <Card
      className={`${bgColor} ${borderColor} backdrop-blur-sm hover:scale-105 transition-transform duration-300 max-w-[300px] lg:min-w-[190px] lg:max-w-[200px] w-full flex-1 min-w-[180px]`}
    >
      <CardContent className="p-4 text-center">
        <Icon className={`w-8 h-8 ${iconColor} mx-auto mb-2`} />
        <p
          className="text-white font-semibold text-2xl"
          style={{ direction: "ltr" }}
        >
          {followers}
        </p>
      </CardContent>
    </Card>
  );
}
