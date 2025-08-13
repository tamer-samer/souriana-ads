"use client";

import type React from "react";
import { Label } from "@/components/ui/label";

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  options: CheckboxOption[];
  error?: string;
  required?: boolean;
  className?: string;
  gridCols?: number;
}

export function CheckboxGroup({
  label,
  values,
  onChange,
  options,
  error,
  required = false,
  className,
  gridCols = 2,
}: CheckboxGroupProps) {
  const handleChange = (optionValue: string) => {
    const newValues = values.includes(optionValue)
      ? values.filter((item) => item !== optionValue)
      : [...values, optionValue];
    onChange(newValues);
  };

  const gridClassName = gridCols === 2 ? "grid-cols-2" : "flex flex-wrap";

  return (
    <div className={`space-y-3 ${className || ""}`}>
      <Label className="text-teal-100 font-medium">
        {label} {required && "*"}
      </Label>
      <div className={`grid ${gridClassName} gap-3`}>
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={values.includes(option.value)}
              onChange={() => handleChange(option.value)}
              className="w-4 h-4 text-teal-500 bg-slate-700 border-teal-600 rounded focus:ring-teal-500"
            />
            <span className="text-white text-sm">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}
