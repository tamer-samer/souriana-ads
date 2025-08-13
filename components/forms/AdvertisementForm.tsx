"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormField } from "./FormField";
import { RadioGroup } from "./RadioGroup";
import { CheckboxGroup } from "./CheckboxGroup";
import { toast } from "sonner";

export interface FormData {
  fullName: string;
  institutionName: string;
  residence: string;
  platforms: string[];
  adTypes: string[];
  estimatedAds: string;
  whatsappNumber: string;
  notes: string;
}

interface AdvertisementFormProps {
  onSubmitSuccess?: () => void;
}

const initialFormData: FormData = {
  fullName: "",
  institutionName: "",
  residence: "",
  platforms: [],
  adTypes: [],
  estimatedAds: "",
  whatsappNumber: "",
  notes: "",
};

const residenceOptions = [
  { value: "syria", label: "سوريا" },
  { value: "outside-syria", label: "خارج سوريا" },
];

const platformOptions = [
  { value: "Facebook Page", label: "صفحة فيسبوك" },
  { value: "Facebook Group", label: "مجموعة فيسبوك" },
  { value: "Telegram", label: "تليجرام" },
  { value: "Instagram", label: "انستجرام" },
];

const adTypeOptions = [
  { value: "Post", label: "منشور" },
  { value: "Video", label: "فيديو" },
  { value: "Instagram Story", label: "ستوري انستجرام" },
];

export function AdvertisementForm({ onSubmitSuccess }: AdvertisementFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "الاسم الكامل مطلوب";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "الاسم الكامل يجب أن يكون أكثر من حرفين";
    }

    if (!formData.institutionName.trim()) {
      newErrors.institutionName = "اسم المؤسسة التعليمية مطلوب";
    } else if (formData.institutionName.trim().length < 2) {
      newErrors.institutionName = "اسم المؤسسة يجب أن يكون أكثر من حرفين";
    }

    if (!formData.residence) {
      newErrors.residence = "يرجى اختيار مكان الإقامة";
    }

    if (formData.platforms.length === 0) {
      newErrors.platforms = "يرجى اختيار منصة واحدة على الأقل";
    }

    if (formData.adTypes.length === 0) {
      newErrors.adTypes = "يرجى اختيار نوع إعلان واحد على الأقل";
    }

    if (!formData.estimatedAds) {
      newErrors.estimatedAds = "العدد التقريبي للإعلانات مطلوب";
    } else if (Number.parseInt(formData.estimatedAds) < 1) {
      newErrors.estimatedAds = "العدد يجب أن يكون أكثر من 1";
    } else if (Number.parseInt(formData.estimatedAds) > 1000) {
      newErrors.estimatedAds = "العدد لا يمكن أن يتجاوز 1000";
    }

    if (!formData.whatsappNumber.trim()) {
      newErrors.whatsappNumber = "رقم الواتساب مطلوب";
    } else {
      const phoneRegex = /^[+]?[0-9][\d]{0,15}$/;
      if (!phoneRegex.test(formData.whatsappNumber.replace(/\s/g, ""))) {
        newErrors.whatsappNumber = "يرجى إدخال رقم هاتف صحيح";
      }
    }

    if (formData.notes && formData.notes.length > 500) {
      newErrors.notes = "الملاحظات لا يمكن أن تتجاوز 500 حرف";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const emailData = {
        to: process.env.NEXT_PUBLIC_EMAIL_TO,
        subject: `طلب إعلان جديد من ${formData.fullName}`,
        html: `
          <!DOCTYPE html>
          <html dir="rtl" lang="ar">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>طلب إعلان جديد</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 20px; direction: rtl;">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #0d9488, #14b8a6); color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0;">
                  <h1 style="margin: 0; font-size: 24px; font-weight: 700;">🎯 طلب إعلان جديد</h1>
                  <p style="margin: 10px 0 0; opacity: 0.9;">تم استلام طلب إعلان جديد من العميل</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 30px;">
                  <!-- Personal Info Section -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8fafc; border-right: 4px solid #14b8a6; border-radius: 5px; margin-bottom: 20px;">
                    <tr>
                      <td style="padding: 20px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td width="140" style="font-weight: 600; color: #0f172a; padding-bottom: 15px;">👤 الاسم:</td>
                            <td style="color: #475569; padding-bottom: 15px;">${
                              formData.fullName
                            }</td>
                          </tr>
                          <tr>
                            <td width="140" style="font-weight: 600; color: #0f172a; padding-bottom: 15px;">🏫 المؤسسة:</td>
                            <td style="color: #475569; padding-bottom: 15px;">${
                              formData.institutionName
                            }</td>
                          </tr>
                          <tr>
                            <td width="140" style="font-weight: 600; color: #0f172a; padding-bottom: 15px;">📍 الإقامة:</td>
                            <td style="color: #475569; padding-bottom: 15px;">${
                              formData.residence === "syria"
                                ? "سوريا"
                                : "خارج سوريا"
                            }</td>
                          </tr>
                          <tr>
                            <td width="140" style="font-weight: 600; color: #0f172a; padding-bottom: 15px;">📱 الرقم:</td>
                            <td style="color: #475569; padding-bottom: 15px;">
                              <a href="https://wa.me/${formData.whatsappNumber.replace(
                                /\D/g,
                                ""
                              )}" style="color: #14b8a6; text-decoration: none;">${
          formData.whatsappNumber
        }</a>
                            </td>
                          </tr>
                          <tr>
                            <td width="140" style="font-weight: 600; color: #0f172a;">📊 العدد التقريبي:</td>
                            <td style="color: #475569;">${
                              formData.estimatedAds
                            } إعلان</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Platforms Section -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8fafc; border-right: 4px solid #14b8a6; border-radius: 5px; margin-bottom: 20px;">
                    <tr>
                      <td style="padding: 20px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <!-- Title row for platforms -->
                          <tr>
                            <td colspan="2" style="font-weight: 700; color: #0f172a; padding: 0 0 10px;">
                              🌐 المنصات المطلوبة
                            </td>
                          </tr>
                          <!-- Tags row for platforms (under the title) -->
                          <tr>
                            <td colspan="2" style="color: #475569; padding: 0 0 16px;">
                              ${formData.platforms
                                .map((platform) => {
                                  const arabicPlatforms: Record<
                                    string,
                                    string
                                  > = {
                                    "Facebook Page": "صفحة فيسبوك",
                                    "Facebook Group": "مجموعة فيسبوك",
                                    Telegram: "تليجرام",
                                    Instagram: "انستجرام",
                                  };
                                  return `<span style="background: #14b8a6; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; display: inline-block; margin: 2px;">${
                                    arabicPlatforms[platform] || platform
                                  }</span>`;
                                })
                                .join("")}
                            </td>
                          </tr>

                          <!-- Title row for ad types -->
                          <tr>
                            <td colspan="2" style="font-weight: 700; color: #0f172a; padding: 8px 0 10px;">
                              🎨 أنواع الإعلانات
                            </td>
                          </tr>
                          <!-- Tags row for ad types (under the title) -->
                          <tr>
                            <td colspan="2" style="color: #475569; padding: 0 0 4px;">
                              ${formData.adTypes
                                .map((type) => {
                                  const arabicTypes: Record<string, string> = {
                                    Post: "منشور",
                                    Video: "فيديو",
                                    "Instagram Story": "ستوري انستجرام",
                                  };
                                  return `<span style=\"background: #14b8a6; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; display: inline-block; margin: 2px;\">${
                                    arabicTypes[type] || type
                                  }</span>`;
                                })
                                .join("")}
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  ${
                    formData.notes
                      ? `
                  <!-- Notes Section -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; margin-top: 20px;">
                    <tr>
                      <td style="padding: 20px;">
                        <h3 style="color: #92400e; margin-top: 0; margin-bottom: 10px;">📝 ملاحظات إضافية:</h3>
                        <p style="margin: 0;">${formData.notes}</p>
                      </td>
                    </tr>
                  </table>
                  `
                      : ""
                  }
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background: #1e293b; color: white; text-align: center; padding: 20px; border-radius: 0 0 10px 10px;">
                  <p style="margin: 0 0 10px 0; font-size: 14px;">📧 تم إرسال هذا الطلب من موقع <a href="#" style="color: #14b8a6; text-decoration: none;">سوريانا للإعلانات التعليمية</a></p>
                  <p style="margin: 0; font-size: 14px;">📅 تاريخ الطلب: ${new Date().toLocaleDateString(
                    "ar-SA",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}</p>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      };

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      toast.success("تم بنجاح!", {
        description: "تم إرسال طلب الإعلان بنجاح. سنتواصل معك قريباً!",
      });

      setFormData(initialFormData);
      setErrors({});
      onSubmitSuccess?.();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("خطأ", {
        description:
          "فشل في إرسال طلبك. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card
      id="advertisement-form"
      className="bg-slate-800/50 border-teal-600/30 backdrop-blur-sm animate-fade-in-up animation-delay-400"
    >
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            id="fullName"
            label="الاسم الكامل"
            value={formData.fullName}
            onChange={(value) => handleInputChange("fullName", value)}
            error={errors.fullName}
            placeholder="أدخل اسمك الكامل"
            required
          />

          <FormField
            id="institutionName"
            label="اسم المؤسسة التعليمية"
            value={formData.institutionName}
            onChange={(value) => handleInputChange("institutionName", value)}
            error={errors.institutionName}
            placeholder="أدخل اسم المؤسسة"
            required
          />

          <RadioGroup
            name="residence"
            label="مكان الإقامة"
            value={formData.residence}
            onChange={(value) => handleInputChange("residence", value)}
            options={residenceOptions}
            error={errors.residence}
            required
          />

          <CheckboxGroup
            label="منصات الإعلان"
            values={formData.platforms}
            onChange={(values) => handleInputChange("platforms", values)}
            options={platformOptions}
            error={errors.platforms}
            required
          />

          <CheckboxGroup
            label="نوع الإعلان"
            values={formData.adTypes}
            onChange={(values) => handleInputChange("adTypes", values)}
            options={adTypeOptions}
            error={errors.adTypes}
            required
            gridCols={0}
          />

          <FormField
            id="estimatedAds"
            label="العدد التقريبي للإعلانات"
            type="number"
            value={formData.estimatedAds}
            onChange={(value) => handleInputChange("estimatedAds", value)}
            error={errors.estimatedAds}
            placeholder="أدخل العدد التقريبي"
            min="1"
            max="1000"
            required
          />

          <FormField
            id="whatsappNumber"
            label="رقم Whatsapp (مع رمز الدولة)"
            type="tel"
            value={formData.whatsappNumber}
            onChange={(value) => handleInputChange("whatsappNumber", value)}
            error={errors.whatsappNumber}
            placeholder="e.g. +963933333333"
            required
          />

          <FormField
            id="notes"
            label="ملاحظات (اختياري)"
            type="textarea"
            value={formData.notes}
            onChange={(value) => handleInputChange("notes", value)}
            error={errors.notes}
            placeholder="أي ملاحظات أو متطلبات إضافية..."
            maxLength={500}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? "جاري الإرسال..." : "إرسال"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
