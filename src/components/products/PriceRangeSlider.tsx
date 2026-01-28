"use client";
import React, { useEffect, useState } from "react";
import Range from "rc-slider";
import "rc-slider/assets/index.css";

interface PriceRange {
  min: number;
  max: number;
}

interface PriceRangeSliderProps {
  value: PriceRange;
  onChange: (value: PriceRange) => void;
  min: number;
  max: number;
  step?: number;
  primaryColor?: string;
}

const priceSteps = [
  0, 5000, 10000, 15000, 20000, 30000, 50000, 75000, 100000, 150000, 200000,
  250000, 300000,
];

export default function PriceRangeSlider({
  value,
  onChange,
  min,
  max,
  step = 1000,
  primaryColor = "hsl(var(--primary))",
}: PriceRangeSliderProps) {
  // Local state to avoid calling onChange on every tiny slider movement.
  const [localValues, setLocalValues] = useState<[number, number]>([
    value.min,
    value.max,
  ]);

  // Keep local values in sync when parent value changes (for clears, external updates)
  useEffect(() => {
    setLocalValues([value.min, value.max]);
  }, [value.min, value.max]);

  const handleSliderChange = (newValues: number | number[]) => {
    if (Array.isArray(newValues) && newValues.length === 2) {
      // update local values during drag
      setLocalValues([newValues[0], newValues[1]]);
    }
  };

  // Only call the parent's onChange after the user finishes the drag/interaction
  const handleSliderAfterChange = (newValues: number | number[]) => {
    if (Array.isArray(newValues) && newValues.length === 2) {
      onChange({ min: newValues[0], max: newValues[1] });
    }
  };

  const generateOptions = (isMin: boolean) => {
    // Use localValues so the dropdown reflects temporary slider state while dragging
    const [localMin, localMax] = localValues;
    const options = priceSteps.filter((step) =>
      isMin ? step < localMax : step > localMin,
    );
    const currentValue = isMin ? localMin : localMax;

    if (!priceSteps.includes(currentValue)) options.push(currentValue);
    if (!isMin && !priceSteps.includes(max) && max > localMin)
      options.push(max);

    return options.sort((a, b) => a - b);
  };

  const commonHandleStyle = {
    backgroundColor: "hsl(var(--card))",
    borderColor: primaryColor,
    borderWidth: 3,
    height: 20,
    width: 20,
    marginTop: -8,
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    cursor: "pointer",
    zIndex: 2,
  };

  return (
    <div className="w-full">
      <div className="px-1 mb-6 relative">
        <Range
          min={min}
          max={max}
          step={step}
          value={localValues}
          onChange={handleSliderChange}
          onAfterChange={handleSliderAfterChange}
          allowCross={false}
          range
          className="custom-range-slider"
          trackStyle={[
            { backgroundColor: primaryColor, height: 4, borderRadius: 2 },
          ]}
          handleStyle={[commonHandleStyle, commonHandleStyle]}
          railStyle={{
            backgroundColor: "hsl(var(--secondary))",
            height: 4,
            borderRadius: 2,
          }}
          dotStyle={{ display: "none" }}
        />

        <div className="flex justify-between mt-2 text-xs text-muted-foreground font-bold">
          <span>RS.{localValues[0].toLocaleString("en-IN")}</span>
          <span>RS.{localValues[1].toLocaleString("en-IN")}</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        {["min", "max"].map((type, idx) => (
          <React.Fragment key={type}>
            {idx === 1 && (
              <span className="text-muted-foreground text-sm whitespace-nowrap font-medium">
                to
              </span>
            )}
            <select
              value={type === "min" ? localValues[0] : localValues[1]}
              onChange={(e) => {
                const newValue = Number(e.target.value);
                // update local values immediately
                const next =
                  type === "min"
                    ? [newValue, localValues[1]]
                    : [localValues[0], newValue];
                // Ensure valid range
                if (next[0] < next[1]) {
                  setLocalValues([next[0], next[1]] as [number, number]);
                  // Propagate immediately for select changes
                  onChange({ min: next[0], max: next[1] });
                }
              }}
              className="price-select w-full p-2.5 text-xs font-bold border border-border rounded-xl focus:ring-2 focus:ring-primary/20 bg-card text-foreground cursor-pointer outline-none transition-all"
            >
              {generateOptions(type === "min").map((step) => (
                <option key={`${type}-${step}`} value={step}>
                  RS.{step.toLocaleString("en-IN")}
                  {step === max ? "+" : ""}
                </option>
              ))}
            </select>
          </React.Fragment>
        ))}
      </div>

      <style jsx>{`
        .custom-range-slider {
          touch-action: none;
        }

        .custom-range-slider .rc-slider-handle {
          cursor: grab !important;
          touch-action: none;
        }

        .custom-range-slider .rc-slider-handle:active {
          cursor: grabbing !important;
        }

        .custom-range-slider .rc-slider-handle:hover {
          border-color: ${primaryColor} !important;
          box-shadow: 0 4px 12px hsl(var(--primary) / 0.3) !important;
        }

        .custom-range-slider .rc-slider-track,
        .custom-range-slider .rc-slider-rail {
          cursor: pointer;
        }

        .price-select:hover {
          border-color: hsl(var(--primary) / 0.5) !important;
        }
      `}</style>
    </div>
  );
}
