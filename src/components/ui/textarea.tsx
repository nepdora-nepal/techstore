"use client";

import * as React from "react"
import { cn } from "@/lib/utils"

interface TextareaProps extends React.ComponentProps<"textarea"> {
  label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, value, onChange, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(value || "");

    // Update internal state when controlled value changes
    React.useEffect(() => {
      setInputValue(value || "");
    }, [value]);

    // Check if field has value (works for both controlled and uncontrolled)
    const hasValue = inputValue && inputValue.toString().length > 0;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      // Call the original onChange if provided
      if (onChange) {
        onChange(e);
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      if (props.onFocus) {
        props.onFocus(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      if (props.onBlur) {
        props.onBlur(e);
      }
    };

    return (
      <div className="relative">
        <textarea
          className={cn(
            "border-input flex min-h-[120px] w-full rounded-lg border bg-white/80 px-4 py-3 text-base ring-0 transition-all duration-200 outline-none placeholder:text-transparent focus-visible:ring-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            label && "pt-7",
            className
          )}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          value={value !== undefined ? value : inputValue}
          {...props}
        />
        {label && (
          <label
            className={cn(
              "text-muted-foreground pointer-events-none absolute left-4 transition-all duration-200",
              isFocused || hasValue
                ? "text-muted-foreground top-2 text-[10px] font-medium"
                : "top-4 text-xs"
            )}
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
