"use client";

import type React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "tel" | "number" | "textarea";
  min?: string;
  max?: string;
  maxLength?: number;
  className?: string;
}

export function FormField({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  type = "text",
  min,
  max,
  maxLength,
  className,
}: FormFieldProps) {
  const baseClassName = `py-5 bg-slate-700/50 border-teal-600/50 text-white placeholder:text-slate-400 focus:border-teal-400 ${
    error ? "border-red-500" : ""
  } ${className || ""}`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2 flex-1">
      <Label htmlFor={id} className="text-teal-100 font-medium text-base">
        {label} {required && "*"}
      </Label>
      {type === "textarea" ? (
        <div className="space-y-2">
          <Textarea
            id={id}
            value={value}
            onChange={handleChange}
            className={`${baseClassName} min-h-[100px] resize-none`}
            placeholder={placeholder}
            maxLength={maxLength}
          />
          {maxLength && (
            <div className="flex justify-between items-center">
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <p className="text-slate-400 text-xs ml-auto">
                {value.length}/{maxLength}
              </p>
            </div>
          )}
        </div>
      ) : (
        <>
          <Input
            id={id}
            type={type}
            value={value}
            onChange={handleChange}
            className={baseClassName}
            placeholder={placeholder}
            min={min}
            max={max}
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </>
      )}
    </div>
  );
}
