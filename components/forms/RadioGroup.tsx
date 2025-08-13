"use client";

import type React from "react";
import { Label } from "@/components/ui/label";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  error?: string;
  required?: boolean;
  className?: string;
}

export function RadioGroup({
  name,
  label,
  value,
  onChange,
  options,
  error,
  required = false,
  className,
}: RadioGroupProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`space-y-3 ${className || ""}`}>
      <Label className="text-teal-100 font-medium">
        {label} {required && "*"}
      </Label>
      <div className="flex gap-6">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={handleChange}
              className="w-4 h-4 text-teal-500 bg-slate-700 border-teal-600 focus:ring-teal-500"
            />
            <span className="text-white">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}
